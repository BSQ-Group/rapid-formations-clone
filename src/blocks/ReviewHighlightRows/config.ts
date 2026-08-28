import type { Block } from 'payload'

import { hexColourField } from '@/fields/hexColour'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ReviewHighlightRows: Block = {
  slug: 'reviewHighlightRows',
  interfaceName: 'ReviewHighlightRowsBlock',
  labels: {
    singular: 'Review Highlight Rows',
    plural: 'Review Highlight Rows',
  },
  fields: [
    {
      name: 'startsTinted',
      type: 'checkbox',
      label: 'Start on the tinted background',
      defaultValue: false,
      admin: {
        description:
          'Tick when another band block sits above this one and ended on white, so the alternation continues rather than restarting.',
      },
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Rows',
      labels: { singular: 'Row', plural: 'Rows' },
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'One full-width band each, alternating white and tinted backgrounds down the page. Below 768px the image stacks above the text whichever side it is set to.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
          admin: {
            description: 'Rendered 400×400, cropped to fill. Alt text comes from the media item.',
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image position',
          required: true,
          defaultValue: 'right',
          options: [
            { label: 'Right of the text', value: 'right' },
            { label: 'Left of the text', value: 'left' },
          ],
          admin: { description: 'From 768px up. The source alternates it row by row.' },
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Title',
          required: true,
          admin: { description: 'Line breaks are preserved.' },
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Body',
          required: true,
          admin: { description: 'Line breaks are preserved.' },
        },
        {
          name: 'quote',
          type: 'group',
          label: 'Customer quote',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Quote',
              required: true,
            },
            {
              name: 'rating',
              type: 'number',
              label: 'Rating',
              required: true,
              defaultValue: 5,
              min: 1,
              max: 5,
              admin: {
                description:
                  'Filled stars, and what a screen reader announces. The source shows five on every band.',
              },
            },
            {
              name: 'authorName',
              type: 'text',
              label: 'Author',
              required: true,
              admin: { description: 'Their initials fill the avatar circle.' },
            },
            {
              type: 'row',
              fields: [
                hexColourField({
                  name: 'accentColour',
                  label: 'Accent colour',
                  defaultValue: '#3575A2',
                  admin: {
                    width: '33%',
                    description:
                      'Avatar circle and author name. Per-row decoration, stored as content rather than a theme token — the source alternates two palettes.',
                  },
                }),
                hexColourField({
                  name: 'backgroundColour',
                  label: 'Panel background',
                  defaultValue: '#D8F6FF',
                  admin: { width: '33%' },
                }),
                hexColourField({
                  name: 'borderColour',
                  label: 'Panel border',
                  defaultValue: '#53B7D3',
                  admin: { width: '34%' },
                }),
              ],
            },
          ],
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
