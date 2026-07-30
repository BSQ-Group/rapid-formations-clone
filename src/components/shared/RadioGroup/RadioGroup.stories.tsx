import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './index'
import React from 'react'

const meta: Meta<typeof RadioGroup> = {
  title: 'Shared/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'onChange' },
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

const options = [
  {
    value: 'option1',
    label: 'Option One',
    description: 'This is the first option',
  },
  {
    value: 'option2',
    label: 'Option Two',
    description: 'This is the second option',
  },
  {
    value: 'option3',
    label: 'Option Three',
    description: 'This is the third option',
    disabled: true,
  },
]

export const Default: Story = {
  args: {
    name: 'example-radio-group',
    label: 'Choose an option',
    options,
    value: 'option1',
    onChange: () => {},
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.value)
    return <RadioGroup {...args} value={selected} onChange={setSelected} />
  },
}

export const WithDescription: Story = {
  args: {
    name: 'example-radio-group-desc',
    label: 'Choose an option',
    description: 'Select one of the available options below.',
    options,
    value: 'option2',
    onChange: () => {},
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.value)
    return <RadioGroup {...args} value={selected} onChange={setSelected} />
  },
}

export const WithError: Story = {
  args: {
    name: 'example-radio-group-error',
    label: 'Choose an option',
    error: 'You must select an option',
    options,
    value: 'option1',
    onChange: () => {},
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.value)
    return <RadioGroup {...args} value={selected} onChange={setSelected} />
  },
}

export const Disabled: Story = {
  args: {
    name: 'example-radio-group-disabled',
    label: 'Choose an option',
    options,
    value: 'option1',
    disabled: true,
    onChange: () => {},
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.value)
    return <RadioGroup {...args} value={selected} onChange={setSelected} />
  },
}

export const TitleOnly: Story = {
  args: {
    name: 'example-radio-group-title-only',
    label: 'Choose an option',
    options: [
      { value: 'option1', label: 'Option One' },
      { value: 'option2', label: 'Option Two' },
      { value: 'option3', label: 'Option Three', disabled: true },
    ],
    value: 'option1',
    onChange: () => {},
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.value)
    return <RadioGroup {...args} value={selected} onChange={setSelected} />
  },
}
