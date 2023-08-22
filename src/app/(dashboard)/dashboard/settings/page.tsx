import { redirect } from 'next/navigation'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'
import { UserNameForm } from '@/components/auth/user-name-form'
import { db } from '@/lib/db'

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const dbUser = await db.user.findUnique({
    where: {
      email: user.email as string,
    },
  })
  if (!dbUser) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage account and website settings." />
      <div className="grid gap-10">
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <UserNameForm
          className="w-full "
          user={{ id: user.id, name: dbUser?.name || '', phone: dbUser.phone, bio: dbUser.bio }}
        />
      </div>
    </DashboardShell>
  )
}
