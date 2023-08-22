import { getServerSession } from 'next-auth/next'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context)

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return new Response('Unauthorized', { status: 403 })
    }

    // Delete the user.
    const user = await db.user.delete({
      where: {
        id: params.userId,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        return new Response(JSON.stringify(error.message), { status: 422 })
      }
    }
    console.log('[User_DELETE]', error)
    return new Response('Internal error', { status: 500 })
  }
}
