'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import { DataTableColumnHeader } from '@/components/data-table/components/data-table-column-header'
import { Role } from '@prisma/client'
import { Badge } from '@/components/ui/badge'
import { cn, formatter } from '@/lib/utils'

export type UserColumn = {
  id: string
  name: string | null
  email: string | null
  createdAt: string | null | Date
  role: Role
  totalRevenue?: number
  salesCount?: number
}

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },

  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            'whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ',
            row.getValue('role') === 'ADMIN'
              ? 'bg-purple-100  text-purple-700'
              : 'bg-indigo-200  text-indigo-700',
          )}
        >
          {row.getValue('role')}
        </span>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    // header: 'Date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedAt" />,
  },

  {
    accessorKey: 'salesCount',
    header: 'Sale Count',
    cell: ({ row }) => (
      <span
        className={cn(
          'whitespace-nowrap rounded-full bg-teal-200 px-2.5 py-0.5 text-sm  text-teal-700 ',
        )}
      >
        {row.getValue('salesCount')}
      </span>
    ),
  },
  {
    accessorKey: 'totalRevenue',
    header: 'Total Revenue',
    cell: ({ row }) => (
      <span
        className={cn(
          'whitespace-nowrap rounded-full bg-amber-200 px-2.5 py-0.5 text-sm  text-amber-700 ',
        )}
      >
        {formatter.format(row.getValue('totalRevenue'))}
      </span>
    ),
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
