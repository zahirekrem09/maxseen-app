'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './ThemeProvider'
import ConfettiProvider from './Confetti'

interface LayoutProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ConfettiProvider>{children}</ConfettiProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers
