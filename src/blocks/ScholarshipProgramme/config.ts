import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ScholarshipProgramme: Block = {
  slug: 'scholarshipProgramme',
  interfaceName: 'ScholarshipProgrammeBlock',
  labels: { singular: 'Scholarship Programme', plural: 'Scholarship Programmes' },
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Page heading, rendered as the h1. Wraps on its own — line breaks typed here are not preserved.',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      editor: defaultLexical,
      admin: { description: 'Body copy above the winners card. Headings, lists and links.' },
    },
    link({
      appearances: false,
      overrides: {
        name: 'applyCta',
        label: 'Apply button',
        admin: { description: 'Sits between the copy and the winners card, e.g. a mailto: link.' },
      },
    }),
    {
      name: 'winnersHeading',
      type: 'text',
      label: 'Winners heading',
      defaultValue: 'Scholarship Winners',
    },
    {
      name: 'winners',
      type: 'array',
      label: 'Scholarship winners',
      labels: { singular: 'Winner', plural: 'Winners' },
      admin: {
        initCollapsed: true,
        description:
          'Grouped by year automatically, newest first. Adding a new year needs no code change.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'year', type: 'text', required: true, admin: { width: '25%' } },
            { name: 'name', type: 'text', required: true, admin: { width: '75%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'courseName', type: 'text', label: 'Course', admin: { width: '50%' } },
            { name: 'university', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },
    {
      name: 'sidebarPartners',
      type: 'group',
      label: 'Sidebar partner universities',
      admin: {
        description:
          'The narrow right-hand rail. A two-column grid below 768px, then a single stacked column.',
      },
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'UK Partner Universities' },
        {
          name: 'universities',
          type: 'array',
          label: 'Universities',
          labels: { singular: 'University', plural: 'Universities' },
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Used to build the logo alt text, e.g. "University of Leeds logo".',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { description: 'Rendered at its natural size, capped at 160px wide.' },
            },
          ],
        },
      ],
    },
    {
      name: 'inlinePartners',
      type: 'group',
      label: 'Inline partner universities',
      admin: {
        description:
          'Sits under the winners card in the main column. Two columns, three from 470px, five from 1023px.',
      },
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'US Partner Universities' },
        {
          name: 'universities',
          type: 'array',
          label: 'Universities',
          labels: { singular: 'University', plural: 'Universities' },
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Used to build the logo alt text, e.g. "University of Leeds logo".',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { description: 'Rendered at its natural size, capped at 160px wide.' },
            },
          ],
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
