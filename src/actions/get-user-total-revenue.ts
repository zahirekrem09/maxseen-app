import { db } from '@/lib/db'
import { format } from 'date-fns'
export const getUsersTotalRevenue = async () => {
  const users = await db.user.findMany({
    where: {
      role: 'SALES',
    },
    include: {
      orders: {
        where: { isPaid: true },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })

  const usersByTotalRevenue = users.map(u => {
    const totalRevenue = u.orders.reduce((total, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {
        return orderSum + item.product.price.toNumber()
      }, -order.discount.toNumber())
      return total + orderTotal
    }, 0)

    const salesCount = u.orders.length

    return {
      email: u.email,
      name: u.name,
      id: u.id,
      role: u.role,
      createdAt: format(u.createdAt, 'MMMM do, yyyy'),
      totalRevenue,
      salesCount,
    }
  })

  return usersByTotalRevenue.sort((a, b) => b.totalRevenue - a.totalRevenue)
}
