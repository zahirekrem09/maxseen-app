import { getOrders } from '@/actions/get-orders'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'

import { DataTable } from '@/components/data-table/components/data-table'

import { Icons } from '@/components/shared/Icons'
import { buttonVariants } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { cn, formatter } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { OrderColumn, columns } from './components/columns'
import { format } from 'date-fns'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard | Orders',
}
export default async function DashboardPage() {
  const user = await getCurrentUser()
  const isAdmin = user?.role === 'ADMIN'
  const isSales = user?.role === 'SALES'
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  if (user && !isSales) {
    isAdmin ? redirect('/admin') : redirect('/')
  }

  const orders = await getOrders(user.id)

  const formattedOrders: OrderColumn[] = orders.map(item => ({
    ...item,

    discount: formatter.format(item.discount),
    totalPrice: formatter.format(item?.totalPrice),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    amount: formatter.format(item?.totalPrice - item.discount),
  }))

  return (
    <DashboardShell className="p-1">
      <DashboardHeader heading="Orders" text="Create url  and manage orders.">
        <Link
          href={'/dashboard/products'}
          className={cn(buttonVariants({ variant: 'primary' }), 'w-full lg:w-40')}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Create new Url
        </Link>
      </DashboardHeader>

      <DataTable data={formattedOrders} columns={columns} />
    </DashboardShell>
  )
}
