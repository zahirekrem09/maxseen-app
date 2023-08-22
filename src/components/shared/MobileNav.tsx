'use client'
import * as React from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Icons } from './Icons'
import { useLockBody } from '@/hooks/useLockBody'
import { siteConfig } from '@/config/site'
import { MainNavItem } from '@/types'
import { cn } from '@/lib/utils'
import { UserAccountNav } from './UserAccountNav'
import { dashboardConfig } from '@/config/dashboard'

interface MobileNavProps {
  items: MainNavItem[]
  children?: React.ReactNode
  user?: {
    email: string
    name: string
    image: string
  }
}

export function MobileNav({ items, user, children }: MobileNavProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid max-w-sm grid-flow-row auto-rows-max overflow-auto border border-red-700 p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden',
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        {/* <UserAccountNav
          items={dashboardConfig.sidebarNav}
          user={{
            name: user?.name,
            image: user?.image,
            email: user?.email,
          }}
        /> */}
        <nav className=" grid grid-flow-row text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:text-primary hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
