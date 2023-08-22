'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotFoundPage = () => {
  const router = useRouter()
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>

        <p className="mt-4 text-gray-500">We can not find that page.</p>

        <Button onClick={() => router.back()} variant="primary">
          Go Back Home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
