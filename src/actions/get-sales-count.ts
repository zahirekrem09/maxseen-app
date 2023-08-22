import { db } from '@/lib/db'

export const getSalesCount = async () => {
  const salesCount = await db.order.count({
    where: {
      isPaid: true,
    },
  })
  // const cc = await db.user.findMany({
  //   select: {
  //     _count: {
  //       select: {
  //         orders: true,
  //       },
  //     },
  //   },
  // })

  return salesCount
}
