'use client'
import React from 'react'
import { Product } from '@/types'
import useSelectedProduts from '@/hooks/use-selected-products'
import Image from 'next/image'

import Summary from '../create-url/components/summary'
import { Card } from '@/components/ui/card'

interface ProductCheckoutProps {
  items?: Product[]
}

const ProductCheckout: React.FC<ProductCheckoutProps> = ({ items }) => {
  const cart = useSelectedProduts(s => s)

  return (
    <div className="gap-x-4 lg:grid lg:grid-cols-12 lg:items-start">
      <Card className="shadow-sm lg:col-span-7">
        <div className="flex h-full flex-1 flex-col overflow-y-scroll shadow-xl">
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.items.map(product => (
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
                          <div className="flex justify-between text-base font-medium ">
                            <h3>{product.title}</h3>
                            <p className="ml-4">${product.price}</p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => cart.addItem(product)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Summary />
    </div>
  )
}

export default ProductCheckout
