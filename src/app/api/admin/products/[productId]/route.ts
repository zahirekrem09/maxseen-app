import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { productFormSchema } from '@/lib/validators/product'
import { z } from 'zod'

const routeContextSchema = z.object({
  params: z.object({
    productId: z.string(),
  }),
})

export async function GET(req: Request, { params }: { params: { productId: string } }) {
  try {
    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 })
    }

    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {},
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } },
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 })
    }

    const product = await db.product.delete({
      where: {
        id: params.productId,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response('Unauthorized', { status: 403 })
    }

    if (!params.productId) {
      return new NextResponse('Product id is required', { status: 400 })
    }

    const body = await req.json()

    const { title, price, description, isArchived, image } = productFormSchema.parse(body)

    const product = await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        title,
        price,
        description,
        image,
        isArchived,
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
