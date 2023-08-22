import * as React from 'react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { ModeToggle } from './ModeToggle'
import { Icons } from './Icons'
import Image from 'next/image'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo /> */}
          <Image
            src={'https://maxseen.com/wp-content/uploads/2023/06/logo.webp'}
            width={144}
            height={44}
            alt="logo"
          />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Hypnotes team
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
