import type { Meta, StoryObj } from '@storybook/react'

import { SiteMapView } from './SiteMapView'

const list = (items: [string, string][]) =>
  ({
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
          tag: 'ul',
          start: 1,
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: items.map(([label, url], i) => ({
            type: 'listitem',
            value: i + 1,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'link',
                format: '',
                indent: 0,
                version: 3,
                direction: 'ltr',
                fields: { linkType: 'custom', newTab: false, url },
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: label,
                    version: 1,
                  },
                ],
              },
            ],
          })),
        },
      ],
    },
  }) as never

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

const meta: Meta<typeof SiteMapView> = {
  title: 'Blocks/SiteMap',
  component: SiteMapView,
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
type Story = StoryObj<typeof SiteMapView>

export const Default: Story = {
  args: {
    sections: [
      { id: '1', heading: 'Home', links: list([['Home', '/']]) },
      {
        id: '2',
        heading: 'Packages',
        links: list([
          ['Compare Packages', '/compare-packages/'],
          ['Basic Package', '/package/basic-package/'],
          ['Privacy Package', '/package/privacy-package/'],
          ['All Inclusive Package', '/package/all-inclusive-package/'],
        ]),
      },
    ],
  },
}

export const SingleLink: Story = {
  args: { sections: [{ id: '1', heading: 'Home', links: list([['Home', '/']]) }] },
}

export const LongHeadingAndLabels: Story = {
  args: {
    sections: [
      {
        id: '1',
        heading: 'Corporate Services, Compliance Filings and Company Secretarial Support',
        links: list([
          [
            'People with Significant Control Filing and Annual Confirmation Statement Service',
            '/psc/',
          ],
          ['Business Document Template Library for Limited Companies and Partnerships', '/bdtl/'],
        ]),
      },
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    sections: [
      {
        id: '1',
        heading: 'Account',
        links: list([
          [
            'corporate-services.enquiries@rapidformations-incorporation.co.uk',
            'mailto:x@example.com',
          ],
          [
            'https://client.rapidformations.co.uk/register/',
            'https://client.rapidformations.co.uk/register/',
          ],
        ]),
      },
    ],
  },
}

export const DefaultNarrow: Story = { ...Default, ...narrow }
export const LongHeadingNarrow: Story = { ...LongHeadingAndLabels, ...narrow }
