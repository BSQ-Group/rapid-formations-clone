import type { Meta, StoryObj } from '@storybook/react'

import type { ContactUsSection } from './ContactUsView'
import { ContactUsView } from './ContactUsView'

const text = (value: string, bold = false) => ({
  type: 'text',
  detail: 0,
  format: bold ? 1 : 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

const body = (...parts: (string | [string])[]) =>
  ({
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
          children: parts.map((part) => (Array.isArray(part) ? text(part[0], true) : text(part))),
        },
      ],
    },
  }) as ContactUsSection['body']

const helpCentre: ContactUsSection = {
  id: '1',
  heading: 'Need Help?',
  body: body(
    'For quick answers, useful resources, and support, our Help Centre is the best place.',
  ),
  buttons: [
    { id: 'a', label: 'Help Centre', href: 'https://help.rapidformations.co.uk', newTab: true },
  ],
}

const getInTouch: ContactUsSection = {
  id: '2',
  heading: 'Not found what you are looking for?',
  body: body(
    'If you can’t find what you’re looking for in our Help Centre, get in touch by ',
    ['live chat'],
    ', ',
    ['phone'],
    ', or ',
    ['email'],
    ' and we’ll be happy to help.',
  ),
  buttons: [
    { id: 'b', label: 'Live Chat', liveChat: true },
    { id: 'c', label: '020 7871 9990', href: 'tel:+442078719990', phoneIcon: true },
    {
      id: 'd',
      label: 'Email Us',
      href: 'https://forms.rapidformations.co.uk/contact/',
      newTab: true,
    },
  ],
}

const narrow = {
  parameters: {
    viewport: {
      options: {
        mobile360: {
          name: 'Mobile 360',
          styles: { width: '360px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile360' } },
}

const meta: Meta<typeof ContactUsView> = {
  title: 'Blocks/ContactUs',
  component: ContactUsView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas font-legacy-condensed p-5">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ContactUsView>

export const Default: Story = { args: { sections: [helpCentre, getInTouch] } }

export const SingleSection: Story = { args: { sections: [helpCentre] } }

export const ShortCopy: Story = {
  args: {
    sections: [
      {
        id: '1',
        heading: 'Need help?',
        body: body('Ask us.'),
        buttons: [{ id: 'a', label: 'Chat', liveChat: true }],
      },
    ],
  },
}

export const LongCopy: Story = {
  args: {
    sections: [
      {
        id: '1',
        heading:
          'Cannot find what you are looking for in our Help Centre, knowledge base or company formation guides?',
        body: body(
          'If you cannot find what you are looking for in our Help Centre, our team of company formation specialists are available between 8:30am and 5:30pm, Monday to Friday, and will be happy to talk through registered office services, confirmation statements, and anything else on your mind.',
        ),
        buttons: [
          {
            id: 'a',
            label: 'Open the Rapid Formations Help Centre and browse every article',
            href: '#',
          },
          {
            id: 'b',
            label: 'Speak to a company formation specialist now',
            href: '#',
            phoneIcon: true,
          },
        ],
      },
    ],
  },
}

export const ManyButtons: Story = {
  args: {
    sections: [
      {
        ...getInTouch,
        buttons: [
          ...getInTouch.buttons,
          { id: 'e', label: 'WhatsApp', href: '#' },
          { id: 'f', label: 'Request a callback', href: '#' },
          { id: 'g', label: 'Book a demo', href: '#' },
        ],
      },
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    sections: [
      {
        id: '1',
        heading: 'corporate-services.enquiries@rapidformations-incorporation.co.uk',
        body: body('Write to https://forms.rapidformations.co.uk/contact/enquiries/new/company'),
        buttons: [
          {
            id: 'a',
            label: 'corporate-services.enquiries@rapidformations-incorporation.co.uk',
            href: '#',
          },
        ],
      },
    ],
  },
}

export const NoButtons: Story = {
  args: { sections: [{ ...helpCentre, buttons: [] }] },
}

export const DefaultNarrow: Story = { ...Default, ...narrow }
export const LongCopyNarrow: Story = { ...LongCopy, ...narrow }
export const UnbrokenTokenNarrow: Story = { ...UnbrokenToken, ...narrow }
