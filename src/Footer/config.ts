import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'The site-wide footer. Column order, accreditation order and payment-card order are all the array order below.',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Payment cards & social',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'paymentIcons',
          type: 'array',
          label: 'Payment Card Logos',
          labels: { singular: 'Card', plural: 'Cards' },
          admin: {
            initCollapsed: true,
            description: 'Rendered at 55x35 below 768px and 65x45 above it.',
          },
          fields: [
            { name: 'name', type: 'text', required: true, label: 'Name' },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Logo',
              admin: {
                description:
                  "Set the media item's alt text — it is what a screen reader announces for the card.",
              },
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
              type: 'select',
              required: true,
              label: 'Platform',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'YouTube', value: 'youtube' },
              ],
              admin: {
                description:
                  'Picks the glyph. Adding a platform needs a matching icon in src/Footer/icons.tsx.',
              },
            },
            { name: 'url', type: 'text', required: true, label: 'Profile URL' },
            {
              name: 'iconColor',
              type: 'text',
              required: true,
              label: 'Brand Colour',
              admin: {
                description:
                  "The platform's own brand colour, e.g. rgb(225, 48, 108) for Instagram. Held as content because it belongs to the third party, not to this site's theme.",
              },
            },
          ],
        },
      ],
    },
    {
      name: 'linkColumns',
      type: 'array',
      label: 'Link Columns',
      labels: { singular: 'Column', plural: 'Columns' },
      maxRows: 5,
      admin: {
        initCollapsed: true,
        description:
          'Five columns at 1023px and up. Below that each one collapses into an accordion, closed by default.',
      },
      fields: [
        { name: 'heading', type: 'text', required: true, label: 'Column Heading' },
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
      type: 'collapsible',
      label: 'Company details',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'parentCompanyPrefix',
          type: 'text',
          label: 'Parent Company Prefix',
          defaultValue: 'Part of',
        },
        { name: 'parentCompanyLogo', type: 'upload', relationTo: 'media', label: 'Parent Logo' },
        { name: 'parentCompanyUrl', type: 'text', label: 'Parent Company URL' },
        { name: 'logo', type: 'upload', relationTo: 'media', label: 'Brand Logo' },
        { name: 'companyName', type: 'text', label: 'Company Name' },
        {
          name: 'registrationPrefix',
          type: 'text',
          label: 'Registration Prefix',
          defaultValue: 'registered in England & Wales at',
        },
        { name: 'address', type: 'text', label: 'Registered Address' },
        { name: 'addressUrl', type: 'text', label: 'Address Link' },
        { name: 'companyNumber', type: 'text', label: 'Company Number' },
        {
          name: 'icoNumber',
          type: 'text',
          label: 'ICO Registration Number',
          admin: { description: 'Links to the ICO register entry for this number automatically.' },
        },
        { name: 'vatNumber', type: 'text', label: 'VAT Registration Number' },
      ],
    },
    {
      name: 'accreditations',
      type: 'array',
      label: 'Accreditations',
      labels: { singular: 'Accreditation', plural: 'Accreditations' },
      admin: {
        initCollapsed: true,
        description:
          'Eight fit on one row at 1023px and up. Each keeps its own display width, so the row is not evenly divided.',
      },
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Name' },
        { name: 'logo', type: 'upload', relationTo: 'media', required: true, label: 'Logo' },
        {
          name: 'displayWidth',
          type: 'number',
          required: true,
          label: 'Display Width (px)',
          admin: {
            description:
              'Rendered width at 1023px and up. Height follows from the image ratio. The source uses 65-115.',
          },
        },
        { name: 'url', type: 'text', label: 'Link (optional)' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Copyright',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'copyrightBrand',
          type: 'text',
          label: 'Copyright Holder',
          admin: {
            description:
              'Rendered as "Copyright <current year> © <this> ®". The year is always the current one.',
          },
        },
        {
          name: 'certificationPrefix',
          type: 'text',
          label: 'Certification Prefix',
          defaultValue: 'We are proud to be a',
        },
        { name: 'certificationLabel', type: 'text', label: 'Certification Link Label' },
        { name: 'certificationUrl', type: 'text', label: 'Certification URL' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
