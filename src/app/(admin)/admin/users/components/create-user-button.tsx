'use client'

import { Button } from '@/components/ui/button'

import { useState } from 'react'

import { Icons } from '@/components/shared/Icons'
import { UserDrawer } from './user-drawer'

export function CreateNewUserButton() {
  const [showNewUserDialog, setShowNewUserDialog] = useState<boolean>(false)

  return (
    <div className="flex max-w-[420px] ">
      <Button
        onClick={() => setShowNewUserDialog(true)}
        variant="primary"
        size="sm"
        className="relative"
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add User
      </Button>
      <UserDrawer
        setShowNewUserDialog={setShowNewUserDialog}
        showNewUserDialog={showNewUserDialog}
      />
    </div>
  )
}
