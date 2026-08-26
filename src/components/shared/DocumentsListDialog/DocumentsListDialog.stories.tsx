import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { DocumentsListDialog } from './index'
import type { DocumentSection } from '@/utilities/shortcodes'

const inlineTrigger =
  'inline cursor-pointer border-none bg-transparent p-0 font-[inherit] [font-size:inherit] [line-height:inherit] text-[var(--text-brand-cyan)]'

const group = (title: string, documents: string[]) => ({ title, documents })

const full: DocumentSection[] = [
  {
    title: 'Finance and Accounting',
    groups: [
      group('Purchasing', [
        'Document - Payment Terms',
        'Form - Purchase Order',
        'Form - Receipt of Goods',
        'Invoice - Deposit Taken - Including VAT',
        'Invoice Generator',
      ]),
      group('Credit and Returns', [
        'Email - Credit Control - First Reminder',
        'Letter - Credit Note - Issuance',
      ]),
    ],
  },
  {
    title: 'Employment and Consultants',
    groups: [
      group('Offer Letters', [
        'Letter - Offer of Employment - Full-Time',
        'Letter - Offer of Employment - Part-Time',
      ]),
      group('Resignation and Termination', [
        'Letter - Investigation - Notice to Employee of Suspension During Investigation',
        'Letter - Settlement Discussion Invitation - Not Following Disciplinary',
        'Notice - Termination of Employment - Payment in Lieu',
      ]),
    ],
  },
  {
    title: 'Non-Disclosure Agreements',
    groups: [group('Mutual NDAs', ['Agreement - Non-Disclosure - Mutual'])],
  },
]

const meta: Meta<typeof DocumentsListDialog> = {
  component: DocumentsListDialog,
  title: 'Base Components/DocumentsListDialog',
  parameters: { layout: 'centered' },
  args: { label: 'here', sections: full, className: inlineTrigger },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed max-w-[570px] bg-[var(--surface-canvas)] p-6">
        <p className="text-xl leading-[30px] text-[var(--text-on-light-muted)]">
          Click <Story /> to see the full list of documents available.
        </p>
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DocumentsListDialog>

export const Default: Story = {}

export const OneDocument: Story = {
  args: {
    sections: [{ title: 'Mobile Applications', groups: [group('App Terms', ['Terms - Use'])] }],
  },
}

export const LongNames: Story = {
  args: {
    sections: [
      {
        title: 'Company Records, Governance, Statutory Filings and Shareholder Correspondence',
        groups: [
          group(
            'Written Director Resolutions, Members’ Resolutions and Share Certificate Templates',
            [
              'Resolution - Board Approval - Disapplication of Pre-emption Rights on the Allotment of New Ordinary Shares',
              'Certificate - Shares - Partly Paid - One Director and Witness',
            ],
          ),
        ],
      },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    label: 'documents@rapidformations.co.uk',
    sections: [
      {
        title: 'https://www.rapidformations.co.uk/business-templates/document-library',
        groups: [
          group('Rechtsschutzversicherungsgesellschaftenvertragsvorlagen', [
            'Betriebsvereinbarungsentwurfsdokumentationsvorlage',
            'documents-and-templates@rapidformations.co.uk',
          ]),
        ],
      },
    ],
  },
}

export const Narrow: Story = {
  args: { sections: full },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  globals: { viewport: { value: 'mobile1' } },
}

export const Empty: Story = {
  args: { sections: [] },
}
