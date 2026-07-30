import React from 'react'
import './ActionsMenu.css'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface ActionsMenuAction {
  label: string
  action: () => void
  type?: 'default' | 'destructive'
  className?: string
}

interface ActionsMenuProps {
  actions: ActionsMenuAction[]
  className?: string
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ actions, className = '' }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            'actions-menu__actions-btn',
            open && ' actions-menu__actions-btn--active',
            className,
          )}
          aria-label="Open actions"
        >
          <EllipsisVertical className="w-5 h-5 text-[var(--icon-default)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="actions-menu__dropdown-menu">
        {actions.map((item, idx) => (
          <DropdownMenuItem
            key={item.label + idx}
            className={
              item.type === 'destructive'
                ? 'actions-menu__dropdown-item actions-menu__dropdown-item--destructive'
                : 'actions-menu__dropdown-item'
            }
            onClick={item.action}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionsMenu
