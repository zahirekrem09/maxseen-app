import Link from 'next/link'
import PaymentAlert from '../[orderId]/components/payment-alert'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib'

interface PageProps {
  params: {
    status: 'success' | 'cancel'
  }
  searchParams: {
    success?: string
    canceled?: string
  }
}

export const metadata = {
  title: 'Maxseen | Payment',
}

const StatusPage = async ({ params, searchParams }: PageProps) => {
  const { status } = params

  return (
    <div className="flex items-start justify-center">
      {status === 'success' ? (
        <PaymentAlert transId={searchParams.success as string} />
      ) : (
        <div className="grid h-screen place-content-center bg-white px-4">
          <div className="text-center">
            <h1 className="text-9xl font-black text-gray-200">404</h1>

            <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

            <p className="mx-4 text-gray-500">
              This link may be incorrect or expired. Please contact your seller
            </p>

            <Link
              target="_blank"
              href={'https://maxseen.com/'}
              className={cn(buttonVariants({ variant: 'primary' }), 'mt-2')}
            >
              Go Back Home
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatusPage
