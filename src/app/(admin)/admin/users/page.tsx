import { redirect } from 'next/navigation'

import { authOptions, getCurrentUser } from '@/lib'
import { getUsersTotalRevenue } from '@/actions/get-user-total-revenue'

import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'
import { DataTable } from '@/components/data-table/components/data-table'
import { CreateNewUserButton, UserColumn, columns } from './components'

export const metadata = {
  title: 'Dashboard | Users',
}

export default async function UsersPage() {
  const users: UserColumn[] = await getUsersTotalRevenue()

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
      <DashboardHeader heading="Users" text="Create and manage Users.">
        <CreateNewUserButton />
      </DashboardHeader>
      <DataTable data={users} columns={columns} searchKey="email" />
    </DashboardShell>
  )
}
