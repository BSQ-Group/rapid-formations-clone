import type { Meta, StoryObj } from '@storybook/react'

import type { WiseBusinessAccountBlock as WiseBusinessAccountBlockProps } from '@/payload-types'

import { WiseBusinessAccountBlock } from './Component'

const para = (text: string): any => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [{ type: 'text', format: 0, mode: 'normal', style: '', text, version: 1 }],
        textFormat: 0,
        textStyle: '',
      },
    ],
  },
})

const multiPara = (texts: string[]): any => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: texts.map((text) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [{ type: 'text', format: 0, mode: 'normal', style: '', text, version: 1 }],
      textFormat: 0,
      textStyle: '',
    })),
  },
})

const defaultArgs: WiseBusinessAccountBlockProps = {
  blockType: 'wiseBusinessAccount',
  title: 'Wise Business Account Referral',
  body: multiPara([
    'We have partnered with Wise to provide our non-UK resident customers with a straightforward way to manage international business payments.',
    'You can open a multi-currency account at no monthly cost, hold and manage funds in 40+ currencies, and receive payments using local bank details in major currencies like GBP, EUR, and USD.',
    'You can also send money in 40+ currencies to 140+ countries, and pay suppliers, contractors, and employees globally from one account.',
    'Move money instantly between currencies using real exchange rates and low, transparent fees, and streamline your finances by integrating with accounting tools like Xero. Account openings are subject to approval.',
  ]),
  sectionLayout: { background: 'light', paddingTop: 'm', paddingBottom: 'm' },
}

const meta: Meta<typeof WiseBusinessAccountBlock> = {
  component: WiseBusinessAccountBlock,
  title: 'Blocks/WiseBusinessAccount',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof WiseBusinessAccountBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const SingleParagraph: Story = {
  args: {
    ...defaultArgs,
    title: 'Wise Business Account Referral',
    body: para(
      'We have partnered with Wise to provide our non-UK resident customers with a straightforward way to manage international business payments.',
    ),
  },
}
