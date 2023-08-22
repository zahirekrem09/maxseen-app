'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import { DataTableColumnHeader } from '@/components/data-table/components/data-table-column-header'
import { cn } from '@/lib/utils'

export type ProductColumn = {
  id: string
  title: string
  price: string
  createdAt: string
  isArchived: boolean
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'isArchived',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Archived" />,
    cell: ({ row }) => {
      return (
        <span
          className={cn(
            'whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm ',
            row.getValue('isArchived') === true
              ? 'bg-red-100  text-red-700'
              : 'bg-indigo-200  text-indigo-700',
          )}
        >
          {row.getValue('isArchived') === true ? 'Yes' : 'No'}
        </span>
      )
    },
  },

  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => (
      <span
        className={cn(
          'whitespace-nowrap rounded-full bg-amber-200 px-2.5 py-0.5 text-sm  text-amber-700 ',
        )}
      >
        {row.getValue('price')}
      </span>
    ),
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
    // header: 'Date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedAt" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
