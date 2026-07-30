import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './index'
import { SortableTableHead } from '@/components/shared/SortableTable'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] p-6 rounded-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Table>

// Standard Table
export const DefaultVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The standard table with responsive behavior. On screens below the md breakpoint (768px), the table will transform into a card-like layout with each cell showing a label based on the header. On md screens and up, it displays as a regular table.',
      },
    },
  },
  render: () => (
    <Table>
      <TableCaption>User Information</TableCaption>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Robert Johnson</TableCell>
          <TableCell>robert.johnson@example.com</TableCell>
          <TableCell>Inactive</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// Card variant
export const CardVariant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Card variant of the table with responsive behavior. This variant has different styling but the same responsive layout on screens below md breakpoint (768px). Regular table layout appears on md screens and above.',
      },
    },
  },
  render: () => (
    <Table variant="card">
      <TableCaption>User Information</TableCaption>
      <TableHeader variant="card">
        <TableRow variant="card" isHeader>
          <TableHead variant="card">Name</TableHead>
          <TableHead variant="card">Email</TableHead>
          <TableHead variant="card">Status</TableHead>
          <TableHead variant="card">Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow variant="card">
          <TableCell variant="card">John Doe</TableCell>
          <TableCell variant="card">john.doe@example.com</TableCell>
          <TableCell variant="card">Active</TableCell>
          <TableCell variant="card">Admin</TableCell>
        </TableRow>
        <TableRow variant="card">
          <TableCell variant="card">Jane Smith</TableCell>
          <TableCell variant="card">jane.smith@example.com</TableCell>
          <TableCell variant="card">Active</TableCell>
          <TableCell variant="card">User</TableCell>
        </TableRow>
        <TableRow variant="card">
          <TableCell variant="card">Robert Johnson</TableCell>
          <TableCell variant="card">robert.johnson@example.com</TableCell>
          <TableCell variant="card">Inactive</TableCell>
          <TableCell variant="card">User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// With Status Tags
export const WithStatusTags: Story = {
  render: () => (
    <Table>
      <TableCaption>User Status Information</TableCaption>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>
            <span className="px-2 py-1 bg-[var(--surface-accent)] rounded-full text-white text-xs">Active</span>
          </TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>
            <span className="px-2 py-1 bg-[var(--surface-accent)] rounded-full text-white text-xs">Active</span>
          </TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Robert Johnson</TableCell>
          <TableCell>robert.johnson@example.com</TableCell>
          <TableCell>
            <span className="px-2 py-1 bg-[var(--feedback-error-surface)] rounded-full text-white text-xs">Inactive</span>
          </TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// With Actions
export const WithActions: Story = {
  render: () => (
    <Table>
      <TableCaption>Table caption goes here</TableCaption>
      <TableHeader>
        <TableRow isHeader>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john.doe@example.com</TableCell>
          <TableCell>
            <span className="px-2 py-1 bg-[var(--surface-accent)] rounded-full text-white text-xs">Active</span>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-[var(--feedback-neutral-surface)] rounded text-white text-xs">Edit</button>
              <button className="px-2 py-1 bg-[var(--feedback-error-surface)] rounded text-white text-xs">Delete</button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane.smith@example.com</TableCell>
          <TableCell>
            <span className="px-2 py-1 bg-[var(--surface-accent)] rounded-full text-white text-xs">Active</span>
          </TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <button className="px-2 py-1 bg-[var(--feedback-neutral-surface)] rounded text-white text-xs">Edit</button>
              <button className="px-2 py-1 bg-[var(--feedback-error-surface)] rounded text-white text-xs">Delete</button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// Sortable columns
const sortableSampleData = [
  { id: 1, name: 'SALT N PEPPA LTD', status: 'Incorporated', number: '87654321', date: '2024-01-15' },
  { id: 2, name: 'Zerofy Ltd', status: 'In Progress', number: '12345678', date: '2024-03-20' },
  { id: 3, name: 'Eastgate Ltd', status: 'Incorporated', number: '11223344', date: '2023-11-01' },
  { id: 4, name: 'Veloxis Ltd', status: 'Dissolved', number: '55667788', date: '2022-06-10' },
  { id: 5, name: 'Hawthorne Group Ltd', status: 'Incorporated', number: '99887766', date: '2024-02-28' },
]

function SortableExample() {
  const [sortKey, setSortKey] = useState<string>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const toggleSort = (key: string | number) => {
    const field = key as string
    if (sortKey === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(field)
      setSortOrder('asc')
    }
  }

  const sorted = [...sortableSampleData].sort((a, b) => {
    const dir = sortOrder === 'asc' ? 1 : -1
    const aVal = a[sortKey as keyof typeof a] ?? ''
    const bVal = b[sortKey as keyof typeof b] ?? ''
    return dir * String(aVal).localeCompare(String(bVal))
  })

  return (
    <Table>
      <TableHeader>
        <TableRow isHeader>
          <SortableTableHead sortKey="name" activeSortKey={sortKey} sortOrder={sortOrder} onSort={toggleSort}>
            Company
          </SortableTableHead>
          <SortableTableHead sortKey="status" activeSortKey={sortKey} sortOrder={sortOrder} onSort={toggleSort}>
            Status
          </SortableTableHead>
          <SortableTableHead sortKey="number" activeSortKey={sortKey} sortOrder={sortOrder} onSort={toggleSort}>
            Company number
          </SortableTableHead>
          <SortableTableHead sortKey="date" activeSortKey={sortKey} sortOrder={sortOrder} onSort={toggleSort}>
            Incorporated
          </SortableTableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.number}</TableCell>
            <TableCell>{row.date}</TableCell>
            <TableCell>
              <button className="px-3 py-1 border rounded text-xs">View</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const Sortable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Table with sortable column headers. Uses SortableTableHead from shared/SortableTable which adds click-to-sort behavior with ascending/descending indicators. Can be mixed with regular TableHead for non-sortable columns.',
      },
    },
  },
  render: () => <SortableExample />,
}
