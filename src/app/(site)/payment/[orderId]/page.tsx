import { db } from '@/lib/db'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Summary from './components/summary'
import PaymentAlert from './components/payment-alert'
import { Card } from '@/components/ui/card'
import { Order, OrderItem } from '@/types'

interface PageProps {
  params: {
    orderId: string
  }
  searchParams: {
    success?: string
    canceled?: string
  }
}

export const metadata = {
  title: 'Maxseen | Payment',
}

const PaymentPage = async ({ params, searchParams }: PageProps) => {
  const { orderId } = params

  const order = await db.order.findFirst({
    where: { id: orderId, isPaid: false },
    include: {
      orderItems: {
        include: {
          product: {},
        },
      },
    },
  })

  if (!order) return notFound()

  const formattedOrder: Order & { orderItems: OrderItem[] } = {
    id: order.id,
    isPaid: order.isPaid,
    email: order.email,
    name: order.name,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    discount: order.discount.toNumber(),
    totalPrice: order.orderItems.reduce((total, item) => {
      return total + Number(item.product.price.toNumber())
    }, 0),
    orderItems: order.orderItems.map(oItem => {
      return {
        ...oItem,
        product: {
          ...oItem.product,
          price: oItem.product.price.toNumber(),
        },
      }
    }),
  }

  return (
    <div className="flex items-start justify-center">
      {searchParams.success ? (
        <PaymentAlert transId={searchParams.success} />
      ) : (
        <div className="gap-x-4 lg:grid lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <Card className="flex h-full flex-1 flex-col overflow-y-scroll  shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {formattedOrder.orderItems.map(({ product }) => (
                        <li key={product.id} className="flex py-6">
                          <div className=" relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Image
                              fill
                              src={product?.image as string}
                              alt={product.title}
                              className="absolute h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium">
                                <h3>{product.title}</h3>
                                <p className="ml-4">${product.price}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p>{product.description}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <Summary order={order} />
        </div>
      )}
    </div>
  )
}

export default PaymentPage
