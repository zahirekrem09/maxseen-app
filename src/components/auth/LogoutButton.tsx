'use client'
import React from 'react'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

type Props = {}

const LogoutButton = (props: Props) => {
  const router = useRouter()
  return (
    <Button
      variant="destructive"
      onClick={async event => {
        event.preventDefault()
        await signOut({ redirect: false, callbackUrl: '/login' })
        router.push('/login')
      }}
    >
      Logout
    </Button>
  )
}

export default LogoutButton
