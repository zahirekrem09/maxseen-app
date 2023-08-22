import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { productFormSchema } from '@/lib/validators/product'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, price, description, isArchived, image } = productFormSchema.parse(body)

    const product = await db.product.create({
      data: {
        title,
        price,
        description,
        isArchived,
        image,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    //TODO : error handling (Zod, prisma and other error)
    console.log('[PRODUCTS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }
    const products = await db.product.findMany({})

    return NextResponse.json(products)
  } catch (error) {
    console.log('[PRODUCTS_GET]', error)
    return new Response('Internal error', { status: 500 })
  }
}
