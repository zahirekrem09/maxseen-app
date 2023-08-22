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
import { UserForm } from './user-form'
import { Dispatch, SetStateAction } from 'react'

interface UserDrawerProps {
  setShowNewUserDialog: Dispatch<SetStateAction<boolean>>
  showNewUserDialog: boolean
}

export const UserDrawer: React.FC<UserDrawerProps> = ({
  setShowNewUserDialog,
  showNewUserDialog,
}) => {
  return (
    <Sheet open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you are done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <UserForm initialData={null} setShowNewUserDialog={setShowNewUserDialog} />
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
