'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import { DataTableColumnHeader } from '@/components/data-table/components/data-table-column-header'
import { PresetShare } from './preset-share'
import { cn } from '@/lib/utils'

export type OrderColumn = {
  id: string
  name: string | null
  email: string | null
  discount: string
  totalPrice?: string
  amount?: string
  createdAt: string
  isPaid: boolean
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'isPaid',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Paid Status" />,
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            'whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm uppercase ',
            row.getValue('isPaid') === true
              ? 'bg-green-100  text-green-700'
              : 'bg-indigo-200  text-indigo-700',
          )}
        >
          {row.getValue('isPaid') === true ? 'success' : 'in progress'}
        </span>
      )
    },
  },

  {
    accessorKey: 'discount',
    header: 'Discount',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },

  //   {
  //     accessorKey: 'color',
  //     header: 'Color',
  //     cell: ({ row }) => (
  //       <div className="flex items-center gap-x-2">
  //         {row.original.color}
  //         <div
  //           className="h-6 w-6 rounded-full border"
  //           style={{ backgroundColor: row.original.color }}
  //         />
  //       </div>
  //     ),
  //   },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedAt" />,
  },
  {
    header: 'Payment Url',

    cell: ({ row }) => <PresetShare data={row.original} />,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
]
