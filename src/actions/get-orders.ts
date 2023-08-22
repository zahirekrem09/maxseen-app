import { db } from '@/lib/db'
import { Order } from '@/types'

export const getOrders = async (userId: string) => {
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      userId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  })

  const formattedOrders: Order[] = orders.map(item => ({
    id: item.id,
    isPaid: item.isPaid,
    email: item.email,
    name: item.name,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    discount: item.discount.toNumber(),
    totalPrice: item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price.toNumber())
    }, 0),
  }))
  return formattedOrders
}
