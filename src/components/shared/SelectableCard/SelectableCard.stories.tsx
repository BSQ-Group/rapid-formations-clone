import type { Meta, StoryObj } from '@storybook/react'
import SelectableCard, { SelectableCardProps } from './SelectableCard'
import './SelectableCard.css'
import { action } from 'storybook/actions'

const meta: Meta<SelectableCardProps> = {
  title: 'Components/SelectableCard',
  component: SelectableCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<SelectableCardProps>

export const ServiceUnselected: Story = {
  args: {
    card: {
      type: 'service',
      image: '/images/exclusive-offers/google-workspace.png',
      title: 'Google Workspace',
      description: 'Business email, calendar, and cloud storage',
    },
    status: 'unselected',
    onToggle: action('toggle-service'),
  },
}

export const ServiceSelected: Story = {
  args: {
    ...ServiceUnselected.args,
    status: 'selected',
  },
}

export const TelephoneUnselected: Story = {
  args: {
    card: {
      type: 'telephone',
      number: '+44 20 1234 5678',
      subtitle: 'London, UK',
      badge: 'Recommended',
    },
    status: 'unselected',
    onToggle: action('toggle-telephone'),
  },
}

export const TelephoneSelected: Story = {
  args: {
    ...TelephoneUnselected.args,
    status: 'selected',
  },
}
