import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo',
    },
    {
      name: 'companyAddress',
      type: 'textarea',
      required: true,
      label: 'Company Address',
    },
    {
      name: 'registrationDetails',
      type: 'textarea',
      required: true,
      label: 'Registration Details',
    },
    {
      name: 'policyLinksHeading',
      type: 'text',
      required: true,
      defaultValue: 'Company',
      label: 'Policy Links Heading (Desktop)',
    },
    {
      name: 'policyLinks',
      type: 'array',
      label: 'Policy Links',
      labels: { singular: 'Policy Link', plural: 'Policy Links' },
      admin: { initCollapsed: true },
      fields: [link({ appearances: false })],
    },
    {
      name: 'navigationLinksHeading',
      type: 'text',
      required: true,
      defaultValue: 'Useful Links',
      label: 'Navigation Links Heading (Desktop)',
    },
    {
      name: 'navigationColumns',
      type: 'array',
      label: 'Navigation Link Columns',
      labels: { singular: 'Column', plural: 'Columns' },
      maxRows: 3,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Column Heading (Mobile)',
        },
        {
          name: 'links',
          type: 'array',
          labels: { singular: 'Link', plural: 'Links' },
          admin: { initCollapsed: true },
          fields: [link({ appearances: false })],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      labels: { singular: 'Social Link', plural: 'Social Links' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
          label: 'Platform Name',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      label: 'Copyright Text',
    },
    {
      name: 'copyrightSubtext',
      type: 'text',
      label: 'Copyright Subtext',
    },
    {
      name: 'paymentIcons',
      type: 'array',
      label: 'Payment Icons',
      labels: { singular: 'Payment Icon', plural: 'Payment Icons' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
        },
      ],
    },
    {
      name: 'certificationLogos',
      type: 'array',
      label: 'Certification Logos',
      labels: { singular: 'Logo', plural: 'Logos' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Name',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
