import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServiceContent: Block = {
  slug: 'serviceContent',
  interfaceName: 'ServiceContentBlock',
  labels: {
    singular: 'Service Content',
    plural: 'Service Content',
  },
  fields: [
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      required: true,
      defaultValue: 'two',
      options: [
        { label: 'Two — split into left and right', value: 'two' },
        { label: 'One — a single stacked column', value: 'one' },
      ],
      admin: {
        description: 'Two columns split at 1023px; below that everything stacks.',
      },
    },
    {
      name: 'cardSpacing',
      type: 'select',
      label: 'Space below the last buy card',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Standard — 56px at every width', value: 'standard' },
        { label: 'Compact — 40px from 1023px, 12px from 1590px', value: 'compact' },
      ],
      admin: {
        description: 'Compact pulls the content under the card closer on wide screens.',
      },
    },
    {
      name: 'rightColumnLeadGap',
      type: 'checkbox',
      label: 'Space above the right column',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.columns !== 'one',
        description:
          'Keeps the 32px the source leaves above the right column heading from 1023px up, for pages whose right column has no buy card.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 1,
      admin: {
        initCollapsed: true,
        description: 'Rendered in this order, down the left column then the right.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'position',
              type: 'select',
              label: 'Column',
              required: true,
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              admin: { width: '34%' },
            },
            {
              name: 'icon',
              type: 'select',
              label: 'List icon',
              defaultValue: 'none',
              options: [
                { label: 'None — standard bullet', value: 'none' },
                { label: 'Chevron', value: 'chevron' },
                { label: 'Check', value: 'check' },
              ],
              admin: {
                width: '33%',
                description: 'Replaces the bullet on every list item in this section.',
              },
            },
            {
              name: 'iconColour',
              type: 'select',
              label: 'Icon colour',
              defaultValue: 'inherit',
              options: [
                { label: 'Inherit body colour', value: 'inherit' },
                { label: 'Green', value: 'green' },
                { label: 'Subtle grey', value: 'subtle' },
              ],
              admin: {
                width: '33%',
                condition: (_, siblingData) => siblingData?.icon !== 'none',
              },
            },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          editor: defaultLexical,
          label: 'Content',
          required: true,
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL',
          admin: {
            description:
              'Optional. Player embed URL (Vimeo/YouTube) or a direct .mp4 file URL, shown under this section’s copy. Needs a still to render — without one, nothing appears.',
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (/^https?:\/\/\S+$/.test(value)) return true
            return 'Enter a full URL starting with https:// — a bare file name or video ID will not play.'
          },
        },
        {
          name: 'videoStill',
          type: 'upload',
          relationTo: 'media',
          label: 'Video still',
          admin: {
            description:
              'Landscape. It is the whole clickable target, so set the alt text on the media item — that is what a screen reader announces.',
          },
        },
        {
          name: 'videoPosition',
          type: 'select',
          label: 'Video position',
          defaultValue: 'below',
          options: [
            { label: 'Below the copy', value: 'below' },
            { label: 'Above the copy', value: 'above' },
          ],
          admin: {
            description:
              'Above puts the still at the top of the column, with this section’s copy under it — the source layout for a column that opens on a video.',
          },
        },
        {
          name: 'videoTitle',
          type: 'text',
          label: 'Video title',
          admin: {
            description:
              'Names the video to screen readers and in the player frame. Falls back to the section’s first heading when blank.',
          },
        },
      ],
    },
    {
      name: 'formPanel',
      type: 'group',
      label: 'Form panel',
      admin: {
        description:
          'A bordered panel holding a form. Two columns puts it at the top of the right column, above everything on mobile; one column puts it after the copy.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Panel heading',
          admin: { description: 'Sits above the form, e.g. "Switch to email delivery".' },
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          label: 'Form',
          admin: { description: 'Leave empty to hide the panel.' },
        },
      ],
    },
    {
      name: 'buyServices',
      type: 'relationship',
      relationTo: 'buyServices',
      hasMany: true,
      label: 'Buy cards',
      admin: {
        description:
          'Priced cards rendered inside the content. Two columns puts them at the top of the right column, above everything on mobile; one column puts them after the copy.',
      },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
