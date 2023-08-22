import { notFound } from 'next/navigation'

import { db } from '@/lib/db'

import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'

import { ProductDeleteButton, ProductForm } from '../components'

const ProductPage = async ({ params }: { params: { productId: string; storeId: string } }) => {
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <DashboardShell className="p-1">
      <DashboardHeader heading={product?.title} text={product?.description as string}>
        <ProductDeleteButton productId={product.id} />
      </DashboardHeader>

      <div className="mx-auto w-[600px] md:w-[400px]">
        <ProductForm initialData={product} />
      </div>
    </DashboardShell>
  )
}

export default ProductPage
