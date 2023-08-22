import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ProductForm } from './product-form'
import { Dispatch, SetStateAction } from 'react'

interface ProductDrawerProps {
  setShowNewProductialog: Dispatch<SetStateAction<boolean>>
  showNewProductDialog: boolean
}

export const ProductDrawer: React.FC<ProductDrawerProps> = ({
  setShowNewProductialog,
  showNewProductDialog,
}) => {
  return (
    <Sheet open={showNewProductDialog} onOpenChange={setShowNewProductialog}>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <ProductForm initialData={null} setShowNewProductialog={setShowNewProductialog} />
        </div>
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button variant={'destructive'} type="submit">
              Cancel
            </Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
