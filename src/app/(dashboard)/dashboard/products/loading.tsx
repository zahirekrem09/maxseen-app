import { Card } from '@/components/ui/card'

import { DashboardHeader } from '@/components/shared/DashboardHeader'
import { DashboardShell } from '@/components/shared/DashboardShell'
import { CardSkeleton } from '@/components/shared/CardSkeleton'

export default function DashboardSettingsLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Create Url" text="Manage product and discont." />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
