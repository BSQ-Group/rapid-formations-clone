import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import type { ServiceContentBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { ServiceContentSection } from './ServiceContentSection'
import { serviceContentStyles as s } from './ServiceContent.styles'

type Section = NonNullable<ServiceContentBlock['sections']>[number]

const doc = (blocks: Array<{ h3?: string; p?: string; ul?: string[] }>) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: blocks.flatMap((b) => {
        const out: unknown[] = []
        const text = (t: string) => [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text: t, version: 1 },
        ]
        if (b.h3)
          out.push({
            type: 'heading',
            tag: 'h3',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: text(b.h3),
          })
        if (b.p)
          out.push({
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            textFormat: 0,
            children: text(b.p),
          })
        if (b.ul)
          out.push({
            type: 'list',
            listType: 'bullet',
            tag: 'ul',
            start: 1,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: b.ul.map((item, i) => ({
              type: 'listitem',
              value: i + 1,
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: text(item),
            })),
          })
        return out
      }),
    },
  }) as never

const section = (over: Partial<Section> = {}): Section =>
  ({
    position: 'left',
    icon: 'none',
    iconColour: 'inherit',
    content: doc([{ h3: 'Heading', p: 'Body copy.' }]),
    ...over,
  }) as Section

const Layout: React.FC<{ sections: Section[]; split?: boolean }> = ({ sections, split = true }) => {
  const left = split ? sections.filter((x) => x.position !== 'right') : sections
  const right = split ? sections.filter((x) => x.position === 'right') : []
  return (
    <div className={cn(s.root, split && s.split)}>
      <div className={s.column}>
        {left.map((x, i) => (
          <ServiceContentSection key={i} section={x} />
        ))}
      </div>
      {split && right.length > 0 && (
        <div className={s.column}>
          {right.map((x, i) => (
            <ServiceContentSection key={i} section={x} />
          ))}
        </div>
      )}
    </div>
  )
}

const meta: Meta<typeof Layout> = {
  title: 'Blocks/ServiceContent',
  component: Layout,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed mx-auto w-full max-w-[1230px] bg-[var(--surface-canvas)] px-5 py-10 min-[1023px]:px-[30px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Layout>

export const TwoColumns: Story = {
  args: {
    sections: [
      section({
        content: doc([
          {
            h3: 'What is company dissolution?',
            p: 'Company dissolution is a quick and easy way of closing a company down. It involves the director(s) making a voluntary application to Companies House.',
          },
        ]),
      }),
      section({
        icon: 'chevron',
        content: doc([
          {
            h3: 'Why should I close my company?',
            p: 'There are several reasons to voluntarily strike off your company:',
            ul: [
              'The company is no longer required, or it has served its purpose',
              'To save on administration costs of running a company, e.g. preparing annual accounts',
              'To reduce the liability of directors',
            ],
          },
        ]),
      }),
      section({
        position: 'right',
        icon: 'chevron',
        content: doc([
          {
            h3: 'How does this service work?',
            ul: [
              'Select Buy Now to log in or create an account, then complete your purchase',
              'We will file the dissolution application at Companies House',
            ],
          },
        ]),
      }),
    ],
  },
}

export const OneColumn: Story = {
  args: {
    split: false,
    sections: [
      section({
        icon: 'check',
        iconColour: 'green',
        content: doc([
          {
            h3: 'What is included?',
            ul: ['Free company name check', 'Digital certificate of incorporation'],
          },
        ]),
      }),
    ],
  },
}

export const CheckIconsGreen: Story = {
  args: {
    split: false,
    sections: [
      section({
        icon: 'check',
        iconColour: 'green',
        content: doc([
          {
            h3: 'Green checks',
            ul: ['First included item', 'Second included item', 'Third included item'],
          },
        ]),
      }),
    ],
  },
}

export const ChevronsSubtle: Story = {
  args: {
    split: false,
    sections: [
      section({
        icon: 'chevron',
        iconColour: 'subtle',
        content: doc([
          {
            h3: 'Subtle chevrons',
            ul: ['First step in the process', 'Second step in the process'],
          },
        ]),
      }),
    ],
  },
}

export const PlainBullets: Story = {
  args: {
    split: false,
    sections: [
      section({
        content: doc([
          {
            h3: 'Standard bullets',
            ul: ['An item with no icon set', 'Another item with no icon set'],
          },
        ]),
      }),
    ],
  },
}

export const ShortCopy: Story = {
  args: {
    split: false,
    sections: [section({ content: doc([{ h3: 'VAT', p: 'Done for you.' }]) })],
  },
}

export const LongCopyNarrowColumn: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    sections: [
      section({
        icon: 'chevron',
        content: doc([
          {
            h3: 'Comprehensive Confirmation Statement and Annual Compliance Filing Service',
            p: 'We prepare, check and file your annual confirmation statement with Companies House on your behalf, chase you well before the deadline, and keep a full audit trail of every submission so you never risk a late-filing penalty.',
            ul: [
              'The director(s) will receive an invitation by email from Companies House to electronically sign the dissolution application (known as the DS01) - simply sign and submit',
            ],
          },
        ]),
      }),
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    split: false,
    sections: [
      section({
        icon: 'check',
        iconColour: 'green',
        content: doc([
          {
            h3: 'Geschäftsführerbestellungsservice',
            p: 'compliance.department@rapidformations-support.co.uk',
            ul: ['https://www.rapidformations.co.uk/additional-services/london-registered-office/'],
          },
        ]),
      }),
    ],
  },
}

export const ManySections: Story = {
  args: {
    sections: [
      section({ content: doc([{ h3: 'First left section', p: 'Body copy.' }]) }),
      section({ content: doc([{ h3: 'Second left section', p: 'Body copy.' }]) }),
      section({ content: doc([{ h3: 'Third left section', p: 'Body copy.' }]) }),
      section({
        position: 'right',
        content: doc([{ h3: 'First right section', p: 'Body copy.' }]),
      }),
      section({
        position: 'right',
        content: doc([{ h3: 'Second right section', p: 'Body copy.' }]),
      }),
    ],
  },
}
