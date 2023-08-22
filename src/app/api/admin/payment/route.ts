import { NextResponse } from 'next/server'
import { z } from 'zod'
import { orderFormSchema } from '@/lib/validators/order'
import { chargeAmount } from '@/lib/authorizeNetClient'
import { db } from '@/lib/db'
// import { transporter } from '@/lib/nodemailer'
// import { render } from '@react-email/render'
import MaxseenReceiptEmail from '../../../../../emails/maxseen-receipt'
import { resend } from '@/lib/resend'
import axios from 'axios'

const apiUrl = process.env.HYP_API_URL ?? 'https://test.hypnotes.net'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validateData = orderFormSchema.parse(body)
    const expiry = `${validateData.expire.month}${validateData.expire.year}`
    const order = await db.order.findUnique({
      where: { id: validateData.orderId },
      include: {
        orderItems: {
          include: {
            product: {},
          },
        },
      },
    })

    if (!order) {
      return new Response('Order not found', { status: 404 })
    }

    const totalPrice = order?.orderItems?.reduce(
      (total: number, item: { product: { price: any } }) => {
        return total + Number(item.product.price)
      },
      0,
    )
    const subTotal = totalPrice - order?.discount.toNumber()

    const formData = new FormData()

    formData.append('amount', String(subTotal))
    formData.append('paymentType', 'authorize_net')
    formData.append('pan', validateData.creditCard)
    formData.append('expireDate', expiry)
    formData.append('cvv', validateData.cvc)
    formData.append('zipCode', validateData.zipCode)
    formData.append('fullName', validateData.name)
    formData.append('description', 'description')

    const response = await axios.post(
      apiUrl + '/api/maxseen/payment/startMaxseenCheckout',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    if (!response.data.success) {
      return new Response(JSON.stringify(response.data), { status: 400 })
    }

    // const res = (await chargeAmount({
    //   cardDetails: {
    //     cardNumber: validateData.creditCard,
    //     cvc: validateData.cvc,
    //     expiry: expiry,
    //   },
    //   price: String(subTotal),
    // })) as {
    //   data: any | null
    //   statusCode: number
    //   error: string | null
    //   status: boolean
    // }

    // if (!res.status) {
    //   return new Response(JSON.stringify(res), { status: 400 })
    // }

    const accountNumber = response.data.response.token
    const transId = String(response.data.checkOut.id)
    // const accountType = res.data.transactionResponse.accountType
    const authCode = response.data.response.authCode

    const updateOrder = await db.order.update({
      where: {
        id: validateData.orderId,
      },
      data: {
        isPaid: true,
        email: validateData.email,
        name: validateData.name,
        address: validateData.address,
        phone: validateData.phone,
        city: validateData.city,
        state: validateData.state,
        zipCode: validateData.zipCode,
        accountNumber,
        transId,
        // accountType,
        authCode,
      },
      include: {
        orderItems: {
          include: {
            product: {},
          },
        },
      },
    })

    //!! nodemailer
    // const email = process.env.EMAIL_USER
    // const emailHtml = render(MaxseenReceiptEmail({ order: order }))
    // transporter
    //   .sendMail({
    //     from: email,
    //     to: email,
    //     subject: 'hello world',
    //     html: emailHtml,
    //   })
    //   .then(info => console.log('Message sent: %s', info.messageId))
    //   .catch(err => console.log('Error: %s', err))
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'zhrekrmsrtk@gmail.com',
      subject: 'Maxseen Payment Information',
      react: MaxseenReceiptEmail({
        order: order,
      }),
    })

    return NextResponse.json(updateOrder)
  } catch (error) {
    //TODO : error handling (Zod, prisma and other error)
    console.log('[ORDERS_POST]', error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new NextResponse('Internal error', { status: 500 })
  }
}
