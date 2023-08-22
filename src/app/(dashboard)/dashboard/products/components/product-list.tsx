'use client'

import { Product } from '@/types'
import ProductCard from './product-card'
import { Button } from '@/components/ui/button'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Navigation } from 'swiper/modules'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useSelectedProduts from '@/hooks/use-selected-products'

interface ProductListProps {
  items: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  const router = useRouter()
  const cart = useSelectedProduts()
  const isDisabled = cart.items.length === 0

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="flex h-full w-full items-center justify-center text-neutral-500">
          No results found.
        </div>
      )}

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        // pagination={{
        //   type: 'progressbar',
        // }}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          540: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        // modules={[Pagination]}
        className="mySwiper"
      >
        {items.map(item => (
          <SwiperSlide className="p-3" key={item.id}>
            <ProductCard data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Button
        variant="primary"
        disabled={isDisabled}
        className="w-full md:w-32"
        onClick={() => router.push('/dashboard/products/create-url')}
      >
        Next
      </Button>
    </div>
  )
}

export default ProductList
