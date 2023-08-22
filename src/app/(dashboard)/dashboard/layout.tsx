import { DashboardNav } from '@/components/shared/DashboardNav'
import { MainNav } from '@/components/shared/MainNav'
import { SiteFooter } from '@/components/shared/SiteFooter'
import { UserAccountNav } from '@/components/shared/UserAccountNav'
import { dashboardConfig } from '@/config/dashboard'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { notFound, redirect } from 'next/navigation'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getCurrentUser()
  const isAdmin = user?.role === 'ADMIN'
  const isSales = user?.role === 'SALES'
  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  if (user && !isSales) {
    isAdmin ? redirect('/admin') : redirect('/')
  }

  return (
    <div className="flex h-fit min-h-screen flex-col space-y-6 ">
      <header className="sticky top-0 z-40   border-b bg-background">
        <div className="container flex h-16 items-center justify-between  py-4">
          <div className=" flex justify-center">
            <MainNav
              user={{
                name: user?.name as string,
                image: user?.image as string,
                email: user?.email as string,
              }}
              items={dashboardConfig.mainNav}
            />
          </div>
          <div className="hidden justify-center md:flex">
            <UserAccountNav
              items={dashboardConfig.sidebarNav}
              user={{
                name: user?.name,
                image: user?.image,
                email: user?.email,
              }}
            />
          </div>
        </div>
      </header>
      <div className="grid flex-1 gap-12  md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden ">{children}</main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
