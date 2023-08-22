import Header from '@/components/shared/Header'
import { SiteFooter } from '@/components/shared/SiteFooter'

interface SiteLayoutProps {
  children?: React.ReactNode
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex  flex-col space-y-6">
      <Header />
      <div className="container">
        <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
