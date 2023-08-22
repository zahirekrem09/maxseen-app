import { redirect } from 'next/navigation'

import { authOptions, db, getCurrentUser } from '@/lib'

import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'
import { UserNameForm } from '@/components/auth/user-name-form'

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
        <UserNameForm
          user={{ id: user.id, name: dbUser?.name || '', phone: dbUser.phone, bio: dbUser.bio }}
        />
      </div>
    </DashboardShell>
  )
}
