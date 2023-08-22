import { getToken } from 'next-auth/jwt'
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req })

    const isAuth = !!token
    const isAdmin = token?.role === 'ADMIN'
    const isSales = token?.role === 'SALES'
    const isAuthPage =
      req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')

    if (isAuthPage) {
      if (isAuth && isAdmin) {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
      if (isAuth && isSales) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }
      const url = new URL(`/login?from=${encodeURIComponent(from)}`, req.url)

      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url))
    }
  },
  {
    callbacks: {
      async authorized({ token, req }) {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        if (token) {
          return true
        }
        return false
      },
    },
  },
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/'],
}
