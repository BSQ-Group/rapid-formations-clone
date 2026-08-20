import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import type { GlossaryBlock as GlossaryBlockProps, ServiceAd } from '@/payload-types'

import { GlossaryBlock } from './Component'

type Group = NonNullable<GlossaryBlockProps['groups']>[number]
type Term = NonNullable<Group['terms']>[number]
type Definition = Term['definition']

const t = (text: string) => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const link = (text: string, url: string) => ({
  type: 'link',
  children: [t(text)],
  direction: 'ltr',
  fields: { linkType: 'custom', newTab: /^https?:/.test(url), url },
  format: '',
  indent: 0,
  version: 3,
})

const p = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const listItem = (children: unknown[]) => ({
  type: 'listitem',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  value: 1,
  version: 1,
})

const list = (items: unknown[][]) => ({
  type: 'list',
  children: items.map(listItem),
  direction: 'ltr',
  format: '',
  indent: 0,
  listType: 'bullet',
  start: 1,
  tag: 'ul',
  version: 1,
})

const richText = (blocks: unknown[]) =>
  ({
    root: {
      type: 'root',
      children: blocks,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as Definition

const term = (letter: string, name: string, ...blocks: unknown[]): Term => ({
  letter,
  term: name,
  definition: richText(blocks.length ? blocks : [p([t(name)])]),
})

const group = (label: string, terms: Term[]): Group => ({ label, terms })

const LONG_URL =
  'https://www.rapidformations.co.uk/help-centre/a-z-glossary-of-terms/?utm_source=storybook&utm_medium=story&utm_campaign=unbroken-token-overflow-check'

const SUPPORT_EMAIL = 'glossary.terminology.review.team@rapidformations-worldwide-group.co.uk'

const adIcon = {
  id: 'icon',
  url: 'https://d2zkzcdiu38fde.cloudfront.net/images/1681963f-62cf-4407-91e5-e437a2ae8ffb.png',
  alt: '',
  updatedAt: '',
  createdAt: '',
} as unknown as ServiceAd['icon']

const serviceAd = {
  id: 'business-address-service',
  name: 'Business Address Service',
  title: 'Business Address Service',
  body: 'A prestigious central London address for your non-statutory business mail.',
  variant: 'blue-green',
  icon: adIcon,
  cta: { type: 'custom', url: '/business-address-service/', label: 'Learn More' },
  pricing: { price: '49.99', suffix: 'per year' },
  updatedAt: '',
  createdAt: '',
} as unknown as ServiceAd

const aToC = group('A-C', [
  term(
    'A',
    'Abbreviated accounts',
    p([
      t(
        'A shorter version of annual financial accounts, containing only a balance sheet and notes to the accounts. ‘Small’ companies may send abbreviated accounts to Companies House instead of full statutory accounts.',
      ),
    ]),
  ),
  term(
    'A',
    'Accounting reference date (ARD)',
    p([
      t(
        'The date that signifies the end of a company’s financial year and the date to which the annual accounts must be made up to. It is normally the anniversary of the last day of the month in which the company was incorporated.',
      ),
    ]),
  ),
  term(
    'B',
    'Balance sheet',
    p([
      t(
        'A statement of the assets, liabilities and capital of a business at a particular point in time, detailing the balance of income and expenditure over the preceding period.',
      ),
    ]),
  ),
  term(
    'C',
    'Company addresses',
    list([
      [
        t(
          'Registered Office – Mandatory. The official address of a limited company. It will be displayed on the public record.',
        ),
      ],
      [
        t(
          'Service Address – Mandatory. The official address of individual directors, secretaries, and persons of significant control.',
        ),
      ],
      [
        t(
          'Usual Residential Address – Mandatory. The home address of directors, secretaries and persons of significant control.',
        ),
      ],
      [
        t(
          'Business Address – Optional. A correspondence address for receiving non-statutory mail. This will not be displayed on public record.',
        ),
      ],
    ]),
  ),
  term(
    'C',
    'Company registration',
    p([
      t(
        'The process of registering a business as a limited company or limited liability partnership at Companies House.',
      ),
    ]),
    p([
      t(
        'A registered company is a separate legal entity from those who own and run it. Most registered companies are limited liability companies, which means the liability of the owners is limited to the total nominal value of the shares or guarantee.',
      ),
    ]),
    p([t('Company registration is also known as company formation or incorporation.')]),
  ),
])

const dToF = group('D-F', [
  term(
    'D',
    'Dormant company',
    p([
      t(
        'A company that is registered at Companies House but is not trading and has had no significant accounting transactions during a financial year.',
      ),
    ]),
  ),
  term(
    'E',
    'Extraordinary general meeting',
    p([t('Any meeting of the members of a company other than the annual general meeting.')]),
  ),
  term(
    'F',
    'Filing obligations',
    p([
      t(
        'The statutory documents a company must deliver to Companies House and HMRC each year, including the confirmation statement and the annual accounts. Read more in our ',
      ),
      link('help centre', '/help-centre/'),
      t('.'),
    ]),
  ),
])

const gToI = group('G-I', [
  term(
    'G',
    'Guarantor',
    p([
      t(
        'A member of a company limited by guarantee who agrees to pay a fixed sum towards the company’s debts if it is wound up.',
      ),
    ]),
  ),
  term(
    'I',
    'Issuing shares',
    p([
      t(
        'The process of giving or selling portions of a company by issuing shares to new or existing shareholders. At least one share must be issued when a company limited by shares is incorporated.',
      ),
    ]),
    p([
      t(
        'More shares can also be issued (allotted) after incorporation, if required. Directors will usually have the authority to issue more shares but they must refer to the articles of association before doing so.',
      ),
    ]),
  ),
])

const jToM = group('J-M', [
  term(
    'L',
    'Limited by shares',
    p([
      t(
        'The most common company structure in the UK, where the liability of each member is limited to the nominal value of the shares they hold.',
      ),
    ]),
  ),
  term(
    'M',
    'Memorandum of association',
    p([
      t(
        'A legal statement signed by all initial shareholders or guarantors confirming their agreement to form the company.',
      ),
    ]),
  ),
])

const nToQ = group('N-Q', [
  term(
    'N',
    'Nominal value',
    p([t('The value assigned to a share when it is issued, most commonly £1.00 per share.')]),
  ),
  term(
    'P',
    'Person with significant control',
    p([
      t(
        'An individual who holds more than 25% of the shares or voting rights in a company, or who otherwise exercises significant influence over it.',
      ),
    ]),
  ),
])

const rToU = group('R-U', [
  term(
    'R',
    'Registered office',
    p([
      t(
        'The official address of a limited company, displayed on the public register and used by Companies House and HMRC for statutory mail.',
      ),
    ]),
  ),
  term(
    'S',
    'Share certificate',
    p([
      t(
        'A document issued to a shareholder as evidence of their ownership of a stated number of shares in a company.',
      ),
    ]),
  ),
  term(
    'U',
    'Unlimited company',
    p([t('A company whose members have no limit placed on their liability for its debts.')]),
  ),
])

const vToZ = group('V-Z', [
  term(
    'V',
    'Voluntary dissolution',
    p([
      t(
        'The process of closing a solvent company by applying to Companies House to have it struck off the register.',
      ),
    ]),
  ),
  term(
    'W',
    'Wound up',
    p([t('A company that has been closed down and removed from the Companies House register.')]),
  ),
])

const sourceGroups: Group[] = [aToC, dToF, gToI, jToM, nToQ, rToU, vToZ]

const meta: Meta<typeof GlossaryBlock> = {
  component: GlossaryBlock,
  title: 'Blocks/Glossary',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof GlossaryBlock>

export const Default: Story = {
  args: { groups: sourceGroups },
}

export const SingleRangeSingleTerm: Story = {
  args: {
    groups: [
      group('A', [
        term(
          'A',
          'Articles of association',
          p([
            t(
              'The written rules about running the company, agreed by the shareholders or guarantors, the directors and the company secretary.',
            ),
          ]),
        ),
      ]),
    ],
  },
}

export const OneRangePastTheMobileRow: Story = {
  parameters: {
    viewport: {
      viewports: { narrow: { name: '390', styles: { width: '390px', height: '900px' } } },
      defaultViewport: 'narrow',
    },
  },
  args: { groups: [aToC, dToF, gToI, jToM, nToQ] },
}

export const LongestStringsInTheNarrowestColumn: Story = {
  parameters: {
    viewport: {
      viewports: { narrow: { name: '390', styles: { width: '390px', height: '1400px' } } },
      defaultViewport: 'narrow',
    },
  },
  args: {
    groups: [
      group('Companies House terminology A through to F inclusive', [
        term(
          'C',
          'Certificate of Incorporation on Change of Name issued by the Registrar of Companies for England and Wales',
          p([
            t(
              'A certificate issued by Companies House confirming that a company has changed its registered name, showing the new name, the company registration number, and the date on which the change took effect. It does not replace the original Certificate of Incorporation, which continues to record the date the company was first incorporated, and both documents should be retained together with the company registers at the registered office or the Single Alternative Inspection Location address nominated for public inspection.',
            ),
          ]),
          list([
            [
              t(
                'The original Certificate of Incorporation remains valid and must be kept alongside the change of name certificate at all times.',
              ),
            ],
            [
              t(
                'The company registration number never changes, no matter how many times the registered company name is changed.',
              ),
            ],
          ]),
        ),
      ]),
    ],
  },
}

export const UnbrokenTokens: Story = {
  parameters: {
    viewport: {
      viewports: { narrow: { name: '390', styles: { width: '390px', height: '900px' } } },
      defaultViewport: 'narrow',
    },
  },
  args: {
    groups: [
      group(SUPPORT_EMAIL, [
        term('S', SUPPORT_EMAIL, p([t(LONG_URL)]), list([[t(SUPPORT_EMAIL)], [t(LONG_URL)]])),
      ]),
      group(LONG_URL, [term('U', LONG_URL, p([t(SUPPORT_EMAIL)]))]),
    ],
  },
}

export const WithServiceAd: Story = {
  args: {
    groups: [
      group('B', [
        term(
          'B',
          'Balance sheet',
          p([
            t(
              'A statement of the assets, liabilities and capital of a business at a particular point in time.',
            ),
          ]),
        ),
        {
          ...term(
            'B',
            'Business address',
            p([
              t(
                'A correspondence address used for non-statutory company mail. It is not displayed on the public register.',
              ),
            ]),
          ),
          ad: serviceAd,
        },
        term(
          'B',
          'Board of directors',
          p([t('The group of directors appointed to run a company on behalf of its members.')]),
        ),
      ]),
    ],
  },
}
