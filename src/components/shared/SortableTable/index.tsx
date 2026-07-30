import * as React from 'react'
import { cn } from '@/utilities/ui'
import './SortableTable.css'

interface SortableColumnProps {
  sortKey?: string | number
  activeSortKey?: string | number
  sortOrder?: 'asc' | 'desc'
  onSort?: (key: string | number) => void
}

const SortableTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & SortableColumnProps
>(({ className, sortKey, activeSortKey, sortOrder, onSort, children, ...props }, ref) => {
  const isSorted = sortKey && activeSortKey === sortKey
  const isSortable = !!sortKey && !!onSort

  return (
    <th
      ref={ref}
      className={cn(
        'sortable-table__head',
        isSortable && 'sortable-table__head--sortable',
        className,
      )}
      onClick={() => isSortable && onSort?.(sortKey)}
      {...props}
    >
      <div className="sortable-table__head-content">
        {children}
        {isSortable && (
          <div className="sortable-table__head-sort-icons">
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              className={cn(
                'rotate-180',
                isSorted && sortOrder === 'asc'
                  ? 'sortable-table__sort-icon--active'
                  : 'sortable-table__sort-icon--inactive',
              )}
            >
              <path d="M4 6L0.535899 0.857144L7.4641 0.857143L4 6Z" />
            </svg>
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              className={cn(
                isSorted && sortOrder === 'desc'
                  ? 'sortable-table__sort-icon--active'
                  : 'sortable-table__sort-icon--inactive',
              )}
            >
              <path d="M4 6L0.535899 0.857144L7.4641 0.857143L4 6Z" />
            </svg>
          </div>
        )}
      </div>
    </th>
  )
})
SortableTableHead.displayName = 'SortableTableHead'

export { SortableTableHead }
