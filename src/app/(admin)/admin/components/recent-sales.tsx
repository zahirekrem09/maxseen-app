import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatter } from '@/lib/utils'
import Link from 'next/link'
interface RecentSalesProps {
  data: {
    email: string | null
    name: string | null
    id: string | null
    totalRevenue: number
  }[]
}

export function RecentSales({ data }: RecentSalesProps) {
  return (
    <div className="h-80 space-y-8 overflow-auto">
      {data.map(u => (
        <Link href={'/users'} key={u.id} className="flex cursor-pointer items-center ">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{u.name?.toLocaleLowerCase().substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{u.name}</p>
            <p className="text-sm text-muted-foreground">{u.email}</p>
          </div>
          <div className="ml-auto font-medium">{formatter.format(u.totalRevenue)}</div>
        </Link>
      ))}
    </div>
  )
}
