import Login from '@/components/auth/Login'
import { buttonVariants } from '@/components/ui/button'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FC } from 'react'

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = async ({}) => {
  const user = await getCurrentUser()

  const isAdmin = user?.role === 'ADMIN'
  const isSales = user?.role === 'SALES'

  if (user) {
    isAdmin ? redirect('/admin') : isSales ? redirect('/dashboard') : redirect('/')
  }
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        {/* <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), '-mt-20 self-start')}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link> */}

        <Login />
      </div>
    </div>
  )
}

export default LoginPage
