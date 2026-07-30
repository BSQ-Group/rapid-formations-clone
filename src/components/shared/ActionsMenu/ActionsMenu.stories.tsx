import type { Meta, StoryObj } from '@storybook/react'
import ActionsMenu, { ActionsMenuAction } from './ActionsMenu'

const meta: Meta<typeof ActionsMenu> = {
  component: ActionsMenu,
  title: 'Components/ActionsMenu',
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof ActionsMenu>

const actions: ActionsMenuAction[] = [
  { label: 'Manage', action: () => alert('Manage clicked') },
  { label: 'Delete', action: () => alert('Delete clicked'), type: 'destructive' },
]

export const Default: Story = {
  args: {
    actions,
  },
}
