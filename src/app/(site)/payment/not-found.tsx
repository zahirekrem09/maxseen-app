'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFoundPage = () => {
  const router = useRouter()
  return (
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
  )
}

export default NotFoundPage
