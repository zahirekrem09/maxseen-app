'use client'

import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { Expand, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

import useSelectedProduts from '@/hooks/use-selected-products'
import { Product } from '@/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const cart = useSelectedProduts()
  const router = useRouter()

  const existingItem = cart.items.find(item => item.id === data.id)

  const onAddToCart: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = event => {
    event.stopPropagation()
    cart.addItem(data)
  }

  return (
    <div
      onClick={onAddToCart}
      className={cn(
        'group cursor-pointer space-y-4 rounded-xl border',
        existingItem ? 'border-4 border-violet-600' : '',
      )}
    >
      <div className="relative w-full pt-[100%]">
        <Image
          fill
          alt={data.title}
          objectFit="cover"
          src={
            data?.image ??
            'https://images.unsplash.com/photo-1615454782617-e69bbd4f2969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1728&q=80'
          }
          className="left-0 top-0 h-full w-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="p-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">{data.title}</h2>
            {/* <p className="pl-5 text-xs text-gray-600">4 days ago</p> */}
          </div>
          <p className="mt-2 text-xs text-gray-600">{data.description}</p>

          <div className="mb-auto flex w-full flex-col items-center justify-center">
            <h3 className="text-3xl font-semibold text-indigo-700">${data.price}</h3>
          </div>
          <Button
            onClick={onAddToCart}
            className="w-full"
            variant={existingItem ? 'primary' : 'outline'}
          >
            {existingItem ? 'Remove Product' : 'Select Product'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
