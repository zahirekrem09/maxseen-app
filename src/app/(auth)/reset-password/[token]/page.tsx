import { buttonVariants } from '@/components/ui/button'

import { getCurrentUser } from '@/lib/session'
import { cn } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { FC } from 'react'

import ResetPasswordForm from '../../components/reset-password'

interface PageProps {
  params: {
    token: string
  }
}

const ForgotPassPage: FC<PageProps> = async ({ params }) => {
  const user = await getCurrentUser()

  const isAdmin = user?.role === 'ADMIN'
  const isSales = user?.role === 'SALES'

  if (user) {
    isAdmin ? redirect('/admin') : isSales ? redirect('/dashboard') : redirect('/')
  }
  if (!params.token) {
    return notFound()
  }
  return (
    <div className="absolute inset-0">
      <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20">
        <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), '-mt-20 self-start')}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <ResetPasswordForm token={params.token} className="mx-2" />
      </div>
    </div>
  )
}

export default ForgotPassPage
