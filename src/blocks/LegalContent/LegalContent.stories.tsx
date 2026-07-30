import type { Meta, StoryObj } from '@storybook/react'
import { LegalContentBody } from './LegalContentBody'
import { LegalSidenavClient } from '@/blocks/LegalSidenav/LegalSidenavClient'
import { legalContentStyles as s } from './LegalContent.styles'
import type { LegalContentBlock as LegalContentBlockProps } from '@/payload-types'

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

const mockLinks = [
  { slug: 'id-requirements', label: 'ID Requirements' },
  { slug: 'complaints', label: 'Complaints' },
  { slug: 'terms-and-conditions', label: 'Terms & Conditions' },
  { slug: 'refund-cancellation-policy', label: 'Refund & Cancellation' },
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'cookies-policy', label: 'Cookies Policy' },
  { slug: 'environmental-policy', label: 'Environmental Policy' },
  { slug: 'whistleblowing-and-grievance', label: 'Whistleblowing & Grievance Mechanism Policies' },
]

const defaultSections: LegalContentBlockProps['sections'] = [
  {
    id: 's1',
    heading: '1. Introduction',
    intro: para(
      'At Quality Company Formations, we recognise that our business activities affect the environment, and we are committed to protecting and preserving the natural environment for future generations.',
    ),
  },
  {
    id: 's2',
    heading: '2. Scope',
    intro: para(
      'This policy applies to all Quality Company Formations staff, contractors, operations, and business services.',
    ),
  },
  {
    id: 's3',
    heading: '3. Our Environmental Commitments',
    subsections: [
      {
        id: 'sub-3-1',
        heading: '3.1 Compliance with Environmental Legislation',
        body: para(
          'We are committed to complying with all applicable environmental legislation, standards, and codes of practice.',
        ),
      },
      {
        id: 'sub-3-2',
        heading: '3.2 Energy Efficiency and Carbon Reduction',
        body: para(
          'We strive to improve energy efficiency and reduce greenhouse gas emissions across our operations.',
        ),
      },
    ],
  },
  {
    id: 's4',
    heading: '4. Governance',
    intro: para(
      'The Directors of Quality Company Formations take full responsibility for ensuring this policy is implemented and maintained.',
    ),
  },
  {
    id: 's5',
    heading: '5. Review',
    intro: para(
      'This policy will be reviewed annually to ensure continued relevance and effectiveness.',
    ),
  },
]

type StoryArgs = {
  pageTitle: string
  sections: LegalContentBlockProps['sections']
}

const StoryComponent = ({ pageTitle, sections }: StoryArgs) => (
  <section className={s.section}>
    <div className={s.inner}>
      <div className={s.layout}>
        <LegalSidenavClient links={mockLinks} />
        <LegalContentBody pageTitle={pageTitle} sections={sections} />
      </div>
    </div>
  </section>
)

const meta: Meta<typeof StoryComponent> = {
  component: StoryComponent,
  title: 'Blocks/LegalContent',
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
type Story = StoryObj<typeof StoryComponent>

export const Default: Story = {
  args: { pageTitle: 'Environmental Policy', sections: defaultSections },
  parameters: {
    nextjs: { navigation: { pathname: '/legal-environmental-policy' } },
  },
}

export const NoSubsections: Story = {
  args: {
    pageTitle: 'Cookies Policy',
    sections: [
      {
        id: 's1',
        heading: '1. About this policy',
        intro: para(
          'This Cookies Policy explains how Quality Company Formations uses cookies on its websites.',
        ),
      },
      {
        id: 's2',
        heading: '2. What are cookies?',
        intro: para(
          'Cookies are small text files placed on your device when you visit a website.',
        ),
      },
    ],
  },
  parameters: {
    nextjs: { navigation: { pathname: '/legal-cookies-policy' } },
  },
}
