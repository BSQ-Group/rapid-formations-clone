import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import type { OnlineAdminPortalBlock } from '@/payload-types'

import { OnlineAdminPortalPanel } from './OnlineAdminPortalPanel'
import { onlineAdminPortalStyles as s } from './OnlineAdminPortal.styles'

type Panel = NonNullable<OnlineAdminPortalBlock['items']>[number]

const lexical = (...blocks: (string | string[])[]) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: blocks.map((block) =>
        Array.isArray(block)
          ? {
              type: 'list',
              listType: 'bullet',
              tag: 'ul',
              start: 1,
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              children: block.map((item, index) => ({
                type: 'listitem',
                value: index + 1,
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: item,
                    version: 1,
                  },
                ],
              })),
            }
          : {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              textFormat: 0,
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: block,
                  version: 1,
                },
              ],
            },
      ),
    },
  }) as Panel['content']

const panel = (over: Partial<Panel> = {}): Panel =>
  ({
    width: 'half',
    icon: 'lock',
    iconColour: 'cyan',
    title: 'Access for existing customers',
    content: lexical(
      'If you are an existing customer, access to your online admin area can be gained by clicking on the ‘log in’ button at the top of our website pages.',
    ),
    ctaStyle: 'blue',
    cta: { type: 'custom', url: 'https://client.rapidformations.co.uk/login/', label: 'Login' },
    ...over,
  }) as Panel

const Grid: React.FC<{ panels: Panel[] }> = ({ panels }) => (
  <div className={s.grid}>
    {panels.map((p, i) => (
      <OnlineAdminPortalPanel key={i} panel={p} />
    ))}
  </div>
)

const meta: Meta<typeof Grid> = {
  title: 'Blocks/OnlineAdminPortal',
  component: Grid,
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
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  args: {
    panels: [
      panel({
        width: 'full',
        icon: 'none',
        title: 'What you can do in the admin portal:',
        content: lexical([
          'Check on the progress of your company registration as it goes through the approval process.',
          'View the full details of your company or companies at any time online.',
          'Import an existing company to allow you to manage it and make changes free of charge.',
        ]),
        cta: undefined,
      }),
      panel(),
      panel({
        icon: 'userPlus',
        iconColour: 'green',
        title: 'Access for new customers',
        content: lexical(
          'If you are not an existing customer of Rapid Formations, that’s not a problem! You can still access the Client Portal and import your existing companies.',
        ),
        ctaStyle: 'green',
        cta: {
          type: 'custom',
          url: 'https://client.rapidformations.co.uk/register/',
          label: 'Create an account',
        },
      }),
    ],
  },
}

export const NoIconOrButton: Story = {
  name: 'Half panel with no icon and no button',
  args: {
    panels: [panel({ icon: 'none', cta: undefined }), panel({ icon: 'none', cta: undefined })],
  },
}

export const LongCopy: Story = {
  name: 'Long copy, long unbroken token, long button label',
  args: {
    panels: [
      panel({
        title: 'Access for existing customers who registered before the portal migration completed',
        content: lexical(
          'Existing customers whose companies were incorporated through Rapid Formations at any point since our founding can reach the administration area directly, and should do so using the credentials issued at the point of incorporation rather than requesting a new set.',
          'Write to companysecretary.department@rapidformations.co.uk or open https://client.rapidformations.co.uk/login/forgotten-password to recover them.',
        ),
        cta: {
          type: 'custom',
          url: '/contact-us/',
          label: 'Recover my account credentials',
        },
      }),
      panel({
        title: 'Log in',
        content: lexical('Use the button.'),
        cta: { type: 'custom', url: '/', label: 'Go' },
      }),
    ],
  },
}

export const SinglePanel: Story = {
  name: 'One panel only',
  args: { panels: [panel()] },
}
