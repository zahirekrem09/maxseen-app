import { redirect } from 'next/navigation'
import { format } from 'date-fns'

import { CreateNewProductButton } from '@/components/shared/CreateNewProductButton'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'
import { DataTable } from '@/components/data-table/components/data-table'

import { getProducts } from '@/actions/get-products'
import { authOptions, formatter, getCurrentUser } from '@/lib'

import { ProductColumn, columns } from './components'

export const metadata = {
  title: 'Dashboard | Products',
}

async function getFormattedProducts() {
  const products = await getProducts()
  const formattedProducts: ProductColumn[] = products.map(item => ({
    id: item.id,
    title: item.title,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))
  return formattedProducts
}

export default async function ProductsPage() {
  const products = await getFormattedProducts()

  const user = await getCurrentUser()
  const isAdmin = user?.role === 'ADMIN'
  const isSales = user?.role === 'SALES'
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  if (user && !isAdmin) {
    isSales ? redirect('/dashboard') : redirect('/')
  }

  return (
    <DashboardShell className="p-1">
      <DashboardHeader heading="Products" text="Create and manage Products.">
        <CreateNewProductButton />
      </DashboardHeader>
      <DataTable data={products} columns={columns} searchKey="title" />
    </DashboardShell>
  )
}
