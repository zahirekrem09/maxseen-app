import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { discountSchema, productFormSchema } from '@/lib/validators/product'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const { discount, products } = discountSchema.parse(body)
    const productIds = products.map(p => p.id)

    const order = await db.order.create({
      data: {
        isPaid: false,
        discount,
        userId: session.user.id,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    //TODO : error handling (Zod, prisma and other error)
    console.log('[ORDERS_POST]', error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }
    const orders = await db.order.findMany({})

    return NextResponse.json(orders)
  } catch (error) {
    console.log('[ORDERS_GET]', error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Internal error', { status: 500 })
  }
}
