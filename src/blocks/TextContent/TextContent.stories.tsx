import type { Meta, StoryObj } from '@storybook/react'
import { TextContentBlock } from './Component'
import type { TextContentBlock as TextContentBlockProps } from '@/payload-types'

type LexicalNode = Record<string, unknown>

const text = (value: string): LexicalNode => ({
  type: 'text',
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
  detail: 0,
})

const heading = (tag: 'h2' | 'h3' | 'h4', value: string): LexicalNode => ({
  type: 'heading',
  tag,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [text(value)],
})

const paragraph = (value: string): LexicalNode => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  textStyle: '',
  children: [text(value)],
})

const list = (items: string[]): LexicalNode => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: items.map((item, index) => ({
    type: 'listitem',
    value: index + 1,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [text(item)],
  })),
})

const body = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      heading('h3', '1. Introduction'),
      paragraph(
        'At Rapid Formations, we recognise that our business activities affect the environment, and we are committed to protecting and preserving the natural environment for future generations.',
      ),
      heading('h3', '2. Scope'),
      paragraph(
        'This policy applies to all Rapid Formations staff, contractors, operations, and business services.',
      ),
      heading('h3', '3. Our Environmental Commitments'),
      heading('h4', '3.1 Compliance with Environmental Legislation'),
      paragraph(
        'We are committed to complying with all applicable environmental legislation, standards, and codes of practice.',
      ),
      heading('h4', '3.2 Energy Efficiency and Carbon Reduction'),
      paragraph(
        'We strive to improve energy efficiency and reduce greenhouse gas emissions across our operations by:',
      ),
      list([
        'Implementing energy-efficient office lighting, heating, appliances, and IT systems',
        'Choosing electricity suppliers that prioritise clean and renewable energy',
        'Supporting remote working and low-carbon commuting to reduce transport-related emissions',
      ]),
    ],
  },
}

const defaultArgs: TextContentBlockProps = {
  id: 'story-text-content',
  blockType: 'textContent',
  blockName: 'Text Content',
  body: body as TextContentBlockProps['body'],
  variant: 'policy',
  sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'l' },
}

const meta: Meta<typeof TextContentBlock> = {
  component: TextContentBlock,
  title: 'Blocks/TextContent',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TextContentBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const Standard: Story = {
  args: {
    ...defaultArgs,
    variant: 'standard',
  },
}

export const NumberedClauses: Story = {
  args: {
    ...defaultArgs,
    variant: 'numbered',
  },
}

const numberedWithTitleBody = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      heading('h2', 'External Grievance/Complaints Mechanism Policy'),
      paragraph(
        'This policy sets out the mechanism by which external parties can raise a grievance or complaint.',
      ),
      heading('h3', '1. Purpose'),
      paragraph(
        'The purpose of this policy is to provide a clear and accessible route for external complaints.',
      ),
      heading('h3', '2. Scope'),
      paragraph('This policy applies to all external grievances and complaints.'),
    ],
  },
}

export const NumberedWithPolicyTitle: Story = {
  args: {
    ...defaultArgs,
    variant: 'numbered',
    body: numberedWithTitleBody as TextContentBlockProps['body'],
  },
}
