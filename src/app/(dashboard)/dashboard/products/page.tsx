import React from 'react'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { getProducts } from '@/actions/get-products'
import ProductList from './components/product-list'
export default async function IndexPage() {
  const products = await getProducts()
  return (
    <div className="container mx-auto ">
      <DashboardHeader heading="Products" text="Create new payment url and manage." />
      <ProductList items={products} />
    </div>
  )
}
