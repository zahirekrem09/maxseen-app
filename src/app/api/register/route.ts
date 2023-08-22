import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password, role } = body

    const hashedPassword = await bcrypt.hash(password, 12)

    const existUser = await db.user.findUnique({
      where: {
        email: email,
      },
    })
    if (existUser) {
      return new NextResponse('User alderady exists', { status: 400 })
    }

    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log('[User create ]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
