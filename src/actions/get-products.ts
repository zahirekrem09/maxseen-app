import { db } from '@/lib/db'
import { Product } from '@/types'
import { Product as DProduct } from '@prisma/client'

export const getProducts = async () => {
  const products: DProduct[] = await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  const formattedProducts: Product[] = products.map(item => ({
    ...item,
    price: item.price.toNumber(),
  }))
  return formattedProducts
}
