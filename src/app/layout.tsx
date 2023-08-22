import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import Providers from '@/components/providers/Providers'

import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/shared/TailwindIndicator'
import NextTopLoader from 'nextjs-toploader'
import { siteConfig } from '@/config/site'

interface RootLayoutProps {
  children: React.ReactNode
}

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
  authors: [
    {
      name: 'maxseen',
      url: 'https://maxseen.com',
    },
  ],
  creator: 'maxseen',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@maxseen',
  },
  icons: {
    icon: '/maxseen.ico',
    shortcut: '/maxseen.ico',
    apple: '/maxseen.ico',
  },

  // manifest: `https://maxseen.com/wp-includes/wlwmanifest.xml`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('flex min-h-screen flex-col bg-background', fontSans.variable)}>
        <NextTopLoader showSpinner={false} color="#6923f0" height={5} />
        <Providers>
          <main className="md:py-18 container h-fit grow py-2">{children}</main>
        </Providers>
        <TailwindIndicator />
      </body>
    </html>
  )
}
