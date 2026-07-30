import * as React from 'react'
import { cn } from '@/utilities/ui'
import {
  Table as ShadcnTable,
  TableBody as ShadcnTableBody,
  TableCaption as ShadcnTableCaption,
  TableCell as ShadcnTableCell,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableHeader as ShadcnTableHeader,
  TableRow as ShadcnTableRow,
} from '@/components/ui/table'
import './Table.css'

type TableVariant = 'default' | 'card'

// Create context for table headers
type TableContextType = {
  headers: Map<number, string>
  registerHeader: (index: number, label: string) => void
}

const TableContext = React.createContext<TableContextType>({
  headers: new Map(),
  registerHeader: () => {},
})

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  caption?: string
  variant?: TableVariant
}

export interface ColumnDef<T> {
  header: string
  accessorKey: string
  cell?: (info: T) => React.ReactNode
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', caption, children, ...props }, ref) => {
    const [headers, setHeaders] = React.useState<Map<number, string>>(new Map())

    const registerHeader = React.useCallback((index: number, label: string) => {
      setHeaders((prev) => {
        const newMap = new Map(prev)
        newMap.set(index, label)
        return newMap
      })
    }, [])

    return (
      <TableContext.Provider value={{ headers, registerHeader }}>
        <div className="table__wrapper">
          <ShadcnTable ref={ref} className={cn(`table table--${variant}`, className)} {...props}>
            {caption && <ShadcnTableCaption>{caption}</ShadcnTableCaption>}
            {children}
          </ShadcnTable>
        </div>
      </TableContext.Provider>
    )
  },
)
Table.displayName = 'Table'

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  variant?: TableVariant
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <ShadcnTableHeader
        ref={ref}
        className={cn(`table__header table__header--${variant}`, className)}
        {...props}
      />
    )
  },
)
TableHeader.displayName = 'TableHeader'

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  variant?: TableVariant
  isHeader?: boolean
}

type ReactElementWithProps = React.ReactElement<{ [key: string]: any }>

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant = 'default', isHeader, children, ...props }, ref) => {
    const rowClassName = isHeader
      ? `table__row table__row--header-${variant}`
      : `table__row table__row--${variant}`

    // For header rows, register the header cells
    const [childrenWithIndex] = React.useState(() => {
      if (!isHeader) return children

      return React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as ReactElementWithProps, {
            headerIndex: index,
          })
        }
        return child
      })
    })

    return (
      <ShadcnTableRow ref={ref} className={cn(rowClassName, className)} {...props}>
        {isHeader ? childrenWithIndex : children}
      </ShadcnTableRow>
    )
  },
)
TableRow.displayName = 'TableRow'

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  variant?: TableVariant
  headerIndex?: number
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, variant = 'default', children, headerIndex, ...props }, ref) => {
    const { registerHeader } = React.useContext(TableContext)

    React.useEffect(() => {
      if (headerIndex !== undefined) {
        // Extract only direct string children, not from nested components like Badge
        let textContent = ''
        if (typeof children === 'string') {
          textContent = children
        } else if (Array.isArray(children)) {
          // If children is an array, extract only string elements
          textContent = children.filter((child) => typeof child === 'string').join('')
        }
        if (textContent) {
          registerHeader(headerIndex, textContent)
        }
      }
    }, [headerIndex, children, registerHeader])

    return (
      <ShadcnTableHead
        ref={ref}
        className={cn(`table__head table__head--${variant}`, className)}
        {...props}
      >
        {children}
      </ShadcnTableHead>
    )
  },
)
TableHead.displayName = 'TableHead'

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  variant?: TableVariant
  dataLabel?: string
  columnIndex?: number
  enableAutoDataLabel?: boolean
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      variant = 'default',
      dataLabel,
      columnIndex,
      enableAutoDataLabel = false,
      ...props
    },
    ref,
  ) => {
    const { headers } = React.useContext(TableContext)

    // Get header label from context if not explicitly provided and auto-labeling is enabled
    const cellLabel = enableAutoDataLabel
      ? dataLabel || (columnIndex !== undefined ? headers.get(columnIndex) : undefined)
      : dataLabel

    return (
      <ShadcnTableCell
        ref={ref}
        className={cn(`table__cell table__cell--${variant}`, className)}
        {...(cellLabel && { 'data-label': cellLabel })}
        {...props}
      />
    )
  },
)
TableCell.displayName = 'TableCell'

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  // Add columnIndex to each cell based on its position in the row
  const enhancedChildren = React.Children.map(children, (rowChild) => {
    if (!React.isValidElement(rowChild)) return rowChild

    const rowProps = rowChild.props as { children: React.ReactNode }
    const rowChildren = React.Children.map(rowProps.children, (cellChild, index) => {
      if (!React.isValidElement(cellChild)) return cellChild

      return React.cloneElement(cellChild as ReactElementWithProps, {
        columnIndex: index,
      })
    })

    return React.cloneElement(rowChild as ReactElementWithProps, {
      children: rowChildren,
    })
  })

  return (
    <ShadcnTableBody ref={ref} className={cn('table__body', className)} {...props}>
      {enhancedChildren}
    </ShadcnTableBody>
  )
})
TableBody.displayName = 'TableBody'

export { ShadcnTableCaption as TableCaption, ShadcnTableFooter as TableFooter }
