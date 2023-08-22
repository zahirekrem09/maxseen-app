import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { resetPassFormSchema } from '@/lib/validators/login'

const secret = process.env.NEXTAUTH_SECRET ?? 'secretresetpass'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const validateData = resetPassFormSchema.parse(body)

    const decoded = (await jwt.verify(validateData.token, secret)) as jwt.JwtPayload

    const hashedPassword = await bcrypt.hash(validateData.password, 12)
    const user = await db.user.update({
      where: { id: decoded.id },
      data: {
        hashedPassword,
      },
    })

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.log(error)
  }
}
