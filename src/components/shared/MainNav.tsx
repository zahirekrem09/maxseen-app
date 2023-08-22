'use client'

import * as React from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { ScrollArea } from '../ui/scroll-area'
import { Icons } from './Icons'
import { MainNavItem } from '@/types'
import Image from 'next/image'
import { DashboardNav } from './DashboardNav'
import { dashboardConfig } from '@/config/dashboard'
import { UserAccountNav } from './UserAccountNav'

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  user?: { name: string; image: string; email: string }
}

export function MainNav({ items, children, user }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  return (
    <div className=" flex w-full gap-6  md:gap-10">
      <Link
        href="https://maxseen.com/"
        target="_blank"
        className="hidden items-center space-x-2 md:flex"
      >
        <Image
          src={'https://maxseen.com/wp-content/uploads/2023/06/logo.webp'}
          width={144}
          height={44}
          alt="logo"
        />
      </Link>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <button
            className="flex items-center space-x-2 md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <Icons.close /> : <Icons.logo />}
            <span className="font-bold">Menu</span>
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[540px]">
          <ScrollArea className="my-4 h-[calc(100vh-9rem)] pb-10">
            <UserAccountNav
              items={dashboardConfig.sidebarNav}
              user={{
                name: user?.name,
                image: user?.image,
                email: user?.email,
              }}
            />
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
