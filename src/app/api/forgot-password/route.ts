import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { forgotPassFormSchema } from '@/lib/validators/login'
import { resend } from '@/lib/resend'
import { ResetPasswordEmail } from '../../../../emails/reset-password'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validateData = forgotPassFormSchema.parse(body)

    const user = await db.user.findUnique({
      where: { email: validateData.email },
    })

    if (!user) {
      return new Response('Email not found', { status: 404 })
    }

    const secret = process.env.NEXTAUTH_SECRET ?? 'secretresetpass'

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '30d',
      //expiresIn: "1h"
    })

    const link = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'zhrekrmsrtk@gmail.com',
      subject: 'Reset Password  ',
      react: ResetPasswordEmail({ userFirstname: user.name as string, resetPasswordLink: link }),
    })

    return NextResponse.json({
      status: true,
    })
  } catch (error) {
    console.log(error)
  }
}
