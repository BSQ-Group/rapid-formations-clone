import type { Meta, StoryObj } from '@storybook/react'
import { NoteBlock } from './Component'

const lexicalBulletList = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'list',
        listType: 'bullet',
        start: 1,
        tag: 'ul',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'listitem',
            value: 1,
            checked: undefined,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'text',
                format: 0,
                style: '',
                mode: 'normal',
                text: 'Updated Statutory Registers are not included.',
                detail: 0,
                version: 1,
              },
            ],
          },
          {
            type: 'listitem',
            value: 2,
            checked: undefined,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'text',
                format: 0,
                style: '',
                mode: 'normal',
                text: 'If applicable, the stamp duty fee is not included.',
                detail: 0,
                version: 1,
              },
            ],
          },
          {
            type: 'listitem',
            value: 3,
            checked: undefined,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'text',
                format: 0,
                style: '',
                mode: 'normal',
                text: 'Documents will be delivered by email. Printed documents are available for an additional fee.',
                detail: 0,
                version: 1,
              },
            ],
          },
          {
            type: 'listitem',
            value: 4,
            checked: undefined,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'text',
                format: 0,
                style: '',
                mode: 'normal',
                text: 'Changes will not be visible on public record until a confirmation statement is filed at Companies House.',
                detail: 0,
                version: 1,
              },
            ],
          },
        ],
      },
    ],
  },
} as any

const lexicalParagraphs = {
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
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            text: 'All formation documents will be sent to your registered email address within the processing time.',
            detail: 0,
            version: 1,
          },
        ],
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        textStyle: '',
        children: [
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            text: 'Please ensure all details provided are accurate before submitting your order.',
            detail: 0,
            version: 1,
          },
        ],
      },
    ],
  },
} as any

const meta: Meta<typeof NoteBlock> = {
  title: 'Blocks/Note',
  component: NoteBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="theme-qualitycompanyformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NoteBlock>

export const BulletList: Story = {
  args: {
    blockType: 'note',
    heading: 'Please note:',
    headingLevel: 'h2',
    body: lexicalBulletList,
    sectionLayout: {
      background: 'light',
      paddingTop: 's',
      paddingBottom: 's',
    },
  },
}

export const Paragraphs: Story = {
  args: {
    blockType: 'note',
    heading: 'Important information:',
    headingLevel: 'h3',
    body: lexicalParagraphs,
    sectionLayout: {
      background: 'light',
      paddingTop: 's',
      paddingBottom: 's',
    },
  },
}
