import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { db } from '@/lib/db'
import { resend } from '@/lib/resend'
import { authOptions } from '@/lib/auth'
import { sendLinkFormSchema } from '@/lib/validators/order'

import MaxseenInviteUserEmail from '../../../../../../emails/invite-user'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validateData = sendLinkFormSchema.parse(body)

    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return new Response('Unauthorized', { status: 403 })
    }

    const link = `${process.env.NEXT_PUBLIC_APP_URL}/payment/${validateData.orderId}`

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: validateData.email,
      subject: `Payment Url by ${user.name}`,
      react: MaxseenInviteUserEmail({
        userEmail: validateData.email as string,
        inviteLink: link,
        invitedByEmail: user.email as string,
        invitedByName: user.name as string,
      }),
    })

    return NextResponse.json({
      status: true,
    })
  } catch (error) {
    console.log(error)
  }
}
