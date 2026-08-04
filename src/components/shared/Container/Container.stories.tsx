import type { Meta, StoryObj } from '@storybook/react'

import { Container } from './Container'

const meta: Meta<typeof Container> = {
  component: Container,
  title: 'Base Components/Container',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', paddingBlock: '2rem' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Container>

const Ruler = ({ label }: { label: string }) => (
  <div className="bg-[var(--surface-brand-cyan)] px-4 py-3 text-center text-[var(--text-strong)]">
    {label}
  </div>
)

export const Default: Story = {
  args: { children: <Ruler label="Container — resize the viewport to see the max-width steps" /> },
}

export const AsSection: Story = {
  args: { as: 'section', children: <Ruler label="Rendered as <section>" /> },
}

export const WithClassNameOverride: Story = {
  args: {
    className: 'text-center',
    children: <Ruler label="className merges onto the base width" />,
  },
}

export const Nested: Story = {
  args: {
    children: (
      <div className="bg-[var(--surface-canvas-inverse)] p-4">
        <Container>
          <Ruler label="A nested Container does not add another gutter" />
        </Container>
      </div>
    ),
  },
}
