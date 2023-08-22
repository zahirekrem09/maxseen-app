'use client'

import { Button } from '@/components/ui/button'

import { Icons } from './Icons'

import { useState } from 'react'
import { ProductDrawer } from '@/app/(admin)/admin/products/components/product-drawer'

export function CreateNewProductButton() {
  const [showNewProductDialog, setShowNewProductialog] = useState(false)

  return (
    <div className="flex max-w-[420px] ">
      <Button
        onClick={() => setShowNewProductialog(true)}
        variant="primary"
        size="sm"
        className="relative"
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Product
      </Button>
      <ProductDrawer
        setShowNewProductialog={setShowNewProductialog}
        showNewProductDialog={showNewProductDialog}
      />
    </div>
  )
}
