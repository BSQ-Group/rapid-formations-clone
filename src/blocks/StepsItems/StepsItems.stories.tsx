import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { StepsItemRow, type StepsItem } from './Component'
import { stepsItemsStyles as s } from './StepsItems.styles'

const textNode = (text: string) => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const linkNode = (text: string, url: string) => ({
  type: 'link',
  children: [textNode(text)],
  direction: 'ltr',
  fields: { linkType: 'custom', newTab: false, url },
  format: '',
  indent: 0,
  version: 3,
})

const paragraph = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const listItem = (children: unknown[], value = 1) => ({
  type: 'listitem',
  children,
  value,
  checked: undefined,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const bulletList = (items: unknown[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const bullets = (lines: string[]) =>
  bulletList(lines.map((line, i) => listItem([textNode(line)], i + 1)))

const richText = (children: unknown[]) =>
  ({
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as StepsItem['content']

const step = (over: Partial<StepsItem> = {}): StepsItem =>
  ({
    icon: 'file',
    iconColour: 'cyan',
    heading: '1. Registered Office Address',
    content: richText([
      paragraph([
        textNode(
          'You must provide a registered office address to set up a limited company or LLP with Companies House. It must be a physical postal address - you cannot use a PO Box number.',
        ),
      ]),
    ]),
    ...over,
  }) as StepsItem

const Steps: React.FC<{ steps: StepsItem[] }> = ({ steps: rows }) => (
  <div className={s.list}>
    {rows.map((row, i) => (
      <StepsItemRow key={i} step={row} />
    ))}
  </div>
)

const meta: Meta<typeof Steps> = {
  title: 'Blocks/StepsItems',
  component: Steps,
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
type Story = StoryObj<typeof Steps>

const securityDetails = listItem(
  [
    textNode('Three Security Details (these act as an online signature)'),
    bullets([
      'First three letters of mother’s maiden name',
      'First three letters of father’s forename',
      'First three letters of town of birth',
    ]),
  ],
  7,
)

export const RequiredInformationSevenSteps: Story = {
  args: {
    steps: [
      step({ icon: 'mapMarker', heading: '1. Registered Office Address' }),
      step({
        icon: 'fileChartLine',
        heading: '2. Business Activity',
        content: richText([
          paragraph([
            textNode(
              "You must provide Companies House with your new company's business activity. This is done by choosing a SIC code which describes and classifies business activities.",
            ),
          ]),
          paragraph([
            textNode('You may wish to find your SIC code up front by looking at the '),
            linkNode(
              'SIC code list',
              'https://www.gov.uk/government/publications/standard-industrial-classification-of-economic-activities-sic',
            ),
            textNode('.'),
          ]),
        ]),
      }),
      step({
        icon: 'user',
        heading: '3. Director Details',
        content: richText([
          bullets([
            'Full Name',
            'Date of Birth (must be at least 16 years old)',
            'Occupation',
            'Nationality',
            'Residential Address (not on the public register)',
            'Service Address (residential or other address)',
          ]),
        ]),
      }),
      step({
        icon: 'users',
        heading: '4. Shareholder Details',
        subtitle: 'Where the shareholder is a Person with Significant Control (PSC)',
        content: richText([
          bulletList([
            listItem([textNode('Full Name')], 1),
            listItem([textNode('Date of Birth')], 2),
            listItem([textNode('Nationality')], 3),
            listItem(
              [
                textNode(
                  'Nature of Control (e.g. The person holds more than 50% but less than 75% of shares)',
                ),
              ],
              4,
            ),
            securityDetails,
          ]),
        ]),
      }),
      step({
        icon: 'users',
        heading: '5. Shareholder Details',
        subtitle: 'Where the shareholder is NOT a Person with Significant Control (PSC)',
        content: richText([
          bulletList([
            listItem([textNode('Full Name')], 1),
            listItem([textNode('Date of Birth')], 2),
            listItem([textNode('Nationality')], 3),
            securityDetails,
          ]),
        ]),
      }),
      step({
        icon: 'file',
        heading: '6. Secretary Details',
        subtitle: '(Not Compulsory)',
        content: richText([
          bullets([
            'Full Name',
            'Date of Birth (must be at least 16 years old)',
            'Occupation',
            'Nationality',
          ]),
        ]),
      }),
      step({
        icon: 'dotCircle',
        heading: '7. PSC* Details',
        content: richText([
          bullets(['Full Name', 'Date of Birth', 'Nationality']),
          paragraph([textNode('*A PSC is a person with significant control')]),
        ]),
      }),
    ],
  },
}

export const StepsToFormingFourSteps: Story = {
  args: {
    steps: [
      step({
        icon: 'search',
        iconColour: 'green',
        heading: '1. Company Name',
        content: richText([
          paragraph([
            textNode(
              'First of all, check if the company name you desire is available using our name search tool on our homepage. If it is already in use, you will have to modify the name and try again.',
            ),
          ]),
          paragraph([
            textNode('A full list of the words considered sensitive by Companies House is '),
            linkNode(
              'available here',
              'https://www.gov.uk/government/publications/incorporation-and-names',
            ),
            textNode('.'),
          ]),
        ]),
      }),
      step({
        icon: 'file',
        iconColour: 'orange',
        heading: '2. Package',
        content: richText([
          paragraph([
            textNode(
              'Select a company registration package that best suits your requirements. We offer 3 standard packages - please have a look at our ',
            ),
            linkNode('package comparison', '/compare-packages/'),
            textNode(' table to assist you with your choice.'),
          ]),
        ]),
      }),
      step({
        icon: 'shoppingCart',
        iconColour: 'magenta',
        heading: '3. Checkout',
        content: richText([
          paragraph([
            textNode(
              'Checkout and make a payment by credit / debit card via our secure payment page. Immediately upon making payment, we will send you an email confirming your payment, a receipted invoice and login details to our online admin portal.',
            ),
          ]),
        ]),
      }),
      step({
        icon: 'flag',
        iconColour: 'blue',
        heading: '4. Enter Company Details',
        content: richText([
          paragraph([
            textNode(
              'You will then be required to complete our company registration form. To find out what information you require having to hand, please see our ',
            ),
            linkNode('company registration checklist', '/help-centre/required-information/'),
            textNode('.'),
          ]),
        ]),
      }),
    ],
  },
}

export const NoSubtitles: Story = {
  args: {
    steps: [
      step({ icon: 'mapMarker', heading: '1. Registered Office Address' }),
      step({ icon: 'user', heading: '2. Director Details' }),
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    steps: [
      step({
        icon: 'dotCircle',
        heading: '1. Geschäftsführerbestellungsservice',
        subtitle: 'compliance.department@rapidformations-support.co.uk',
        content: richText([
          paragraph([
            textNode(
              'https://www.rapidformations.co.uk/help-centre/required-information/?utm_source=storybook&utm_campaign=unbroken-token-overflow-check',
            ),
          ]),
          bullets([
            'registered.office.notifications@rapidformations-support.co.uk',
            'https://www.gov.uk/government/publications/standard-industrial-classification-of-economic-activities-sic',
          ]),
        ]),
      }),
    ],
  },
}

export const NarrowColumnLongCopy: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    steps: [
      step({
        icon: 'users',
        iconColour: 'magenta',
        heading: '4. Shareholder Details for a Person with Significant Control of the Company',
        subtitle:
          'Where the shareholder is a Person with Significant Control (PSC) and also acts as a company director or company secretary',
        content: richText([
          paragraph([
            textNode(
              'You must supply the full name, date of birth, nationality, residential address and service address of every shareholder, together with the nature of their control over the company and three security details that act as an online signature when the incorporation is submitted to Companies House.',
            ),
          ]),
          bulletList([
            listItem(
              [
                textNode(
                  'Nature of Control (e.g. The person holds more than 50% but less than 75% of the issued share capital of the company)',
                ),
              ],
              1,
            ),
            securityDetails,
          ]),
        ]),
      }),
    ],
  },
}
