import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map(issue => {
      return issue.message
    })
    return toast.error(errors.join('\n'))
  } else if (err instanceof Error) {
    return toast.error(err.message)
  } else {
    return toast.error('Something went wrong, please try again later.')
  }
}

export const isActiveRoute = (currentRouteHref: string, providedRouteHref: string) =>
  currentRouteHref.startsWith(providedRouteHref)
export function camelCaseToCapitalized(str: string) {
  // Check if the string has any white spaces
  if (/\s/.test(str)) {
    return str
  }

  // Insert space before each capital letter using a regular expression
  const capitalizedStr = str.replace(/([A-Z])/g, ' $1')
  return capitalizedStr.charAt(0).toUpperCase() + capitalizedStr.slice(1)
}
