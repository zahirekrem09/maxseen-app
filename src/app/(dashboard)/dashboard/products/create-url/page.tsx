'use client'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'
import ProductCheckout from '../components/checkouts'
import { useEffect, useState } from 'react'

export default function CreateUrlPage() {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Url" text="Manage product and discont." />
      <ProductCheckout />
    </DashboardShell>
  )
}
