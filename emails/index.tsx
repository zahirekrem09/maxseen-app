import { Button } from '@react-email/button'
import { Tailwind } from '@react-email/tailwind'
import { Html } from '@react-email/html'
import * as React from 'react'

export default function Email() {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: '#6923F0',
            },
          },
        },
      }}
    >
      <Button
        href="https://example.com"
        className="bg-brand px-3 py-2 font-medium leading-4 text-white"
      >
        Click me
      </Button>
    </Tailwind>
  )
}
