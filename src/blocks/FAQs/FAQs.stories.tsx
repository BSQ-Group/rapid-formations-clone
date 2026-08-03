import type { Meta, StoryObj } from '@storybook/react'
import { FAQsBlock } from './Component'
import type { FAQsBlock as FAQsBlockProps } from '@/payload-types'

type FaqItem = NonNullable<FAQsBlockProps['faqs']>[number]
type RichText = FaqItem['description']

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

const listItem = (text: string) => ({
  type: 'listitem',
  children: [t(text)],
  direction: 'ltr',
  format: '',
  indent: 0,
  value: 1,
  version: 1,
})

const list = (texts: string[]) => ({
  type: 'list',
  children: texts.map(listItem),
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
  }) as RichText

const faq = (title: string, ...blocks: unknown[]): FaqItem => ({
  title,
  description: richText(blocks),
})

const LONG_URL =
  'https://www.rapidformations.co.uk/help-centre/required-information/?utm_source=storybook&utm_medium=story&utm_campaign=unbroken-token-overflow'

const SUPPORT_EMAIL = 'company.formation.support.team@rapidformations-worldwide-group.co.uk'

const sourceFaqs: FaqItem[] = [
  faq(
    'What is a limited company?',
    p([
      t(
        "A limited company is a business structure that is legally separate from its owners - usually the shareholders and subscribers. The main benefit of registering this entity is to enjoy the status of 'limited liability' which means the owners are not personally liable for the financial losses of the business. Other benefits are enhanced corporate image, tax efficiency, investment and lending opportunities, and ease of selling the business.",
      ),
    ]),
  ),
  faq(
    'Can a non-UK resident start a company in the UK?',
    p([
      t(
        'Yes. The law allows people from outside the UK to set up a company in the UK. There is no need for you, or anyone else in the company, to live or work in the UK.',
      ),
    ]),
  ),
  faq(
    'Do I need a UK address to register a company?',
    p([
      t(
        'Yes, you will need a UK address to act as your company’s registered office address. A registered office address is the company’s ‘official’ legal address. It has a range of purposes, including receiving government and legal mail. Rapid Formations offers a Registered Office Service that’s perfect for protecting your privacy, bolstering your company’s credibility and ensuring you always have a legally compliant UK-based address.',
      ),
    ]),
  ),
  faq(
    'What is a SIC code, and why is it required?',
    p([
      t(
        'SIC codes (short for ‘Standard Industrial Classification’ codes) are a set of pre-defined codes representing activities a company can undertake. Each company must select between 1 and 4 of these codes to best describe what its activities will be. These codes are then reported to Companies House and made publicly available.',
      ),
    ]),
  ),
  faq(
    'What are the responsibilities of a company director?',
    p([
      t(
        'The directors run the company on a day-to-day basis and have several legal duties and responsibilities to fulfil. These include paying the company’s Corporation Tax bill, arranging its annual accounts, keeping the company’s information up to date at Companies House, and ensuring the company complies with all relevant laws and regulations.',
      ),
    ]),
  ),
  faq(
    'Do I need to register for Corporation Tax and VAT?',
    p([
      t(
        'Once your company is formed, it will be automatically registered for Corporation Tax. HMRC will usually send your Corporation Tax Number (referred to as the ‘Unique Taxpayer Reference’) within 2 weeks of your company’s incorporation. VAT registration, on the other hand, is not automatic. You must register for VAT if you expect your taxable turnover to go over £90,000 within the next 30 days. You can also register earlier, if you want to.',
      ),
    ]),
  ),
  faq(
    'What if I change my mind and don’t need the company?',
    p([
      t(
        'Approximately half a million companies registered in the UK are dissolved (shut down) every year at Companies House, so if you decide you no longer need your company and want to shut it down, there is no need to worry – it happens fairly often! Rapid Formations can dissolve your company hassle free, at a cost of only £89.99 +VAT. Find out more and order our ',
      ),
      link('Company Dissolution Service', '/company-dissolution/'),
      t('.'),
    ]),
    p([
      t(
        'For added peace of mind during the first year, you can opt for 12-month cancellation protection for just £14.99 at checkout.',
      ),
    ]),
  ),
  faq(
    'Is Rapid Formations authorised by Companies House?',
    p([
      t('We are one of the UK’s leading company formation agents, authorised by '),
      link(
        'Companies House',
        'https://www.gov.uk/government/publications/formation-and-company-secretarial-agents/company-formation-agents-and-secretarial-agents',
      ),
      t(' and a member of '),
      link('ACRA', 'https://acra-uk.org/'),
      t(
        ', the Association of Company Registration Agents. We provide our clients with online incorporation and the following address services: registered office, service address and business mail forwarding address. We are able to deliver documents to Companies House electronically, allowing you to register a limited company online, without the need for paper forms to sign and post.',
      ),
    ]),
  ),
  faq(
    'Is Rapid Formations an ACSP?',
    p([
      t(
        'Yes, Rapid Formations is an Authorised Corporate Service Provider (ACSP), authorised to perform ID checks and submit company documentation for clients in line with Companies House rules.',
      ),
    ]),
    p([
      t(
        'Our accreditation means we follow rigorous anti-money-laundering and due diligence standards, providing a reliable and secure formation service. It also ensures that when you set up a company through us, your identification is verified with Companies House as part of the process.',
      ),
    ]),
  ),
]

const defaultArgs: FAQsBlockProps = {
  id: 'story-faqs',
  blockType: 'faqs',
  blockName: 'FAQs',
  title: "New to company formation?\nWe've got it covered.",
  faqs: sourceFaqs,
}

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const meta: Meta<typeof FAQsBlock> = {
  component: FAQsBlock,
  title: 'Blocks/FAQs',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="theme-rapidformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FAQsBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const KeyQuestions: Story = {
  args: {
    ...defaultArgs,
    title: 'Key questions about forming a company',
    faqs: [
      faq(
        'What is company formation?',
        p([
          t(
            'Company formation is the process of legally incorporating a business as a limited company. It is also known as company incorporation and company registration. Rapid Formations is a leading company formation agent specialising in registering companies online at Companies House - the UK registrar of companies.',
          ),
        ]),
      ),
      faq(
        'What information is needed to register a company?',
        p([
          t(
            "To set up a limited company, you simply need a company name, the company's business activity, a registered office address in the UK, and the details of the company directors, shareholders, and People with Significant Control (PSC). For more information, please have a look at our ",
          ),
          link('Required Information Checklist', '/help-centre/required-information/'),
          t('.'),
        ]),
      ),
    ],
  },
}

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    title: 'Common questions',
    faqs: [
      faq('What is it?', p([t('A limited company.')])),
      faq('How long?', p([t('About 24 hours.')])),
    ],
  },
}

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    title:
      'New to company formation, company incorporation, and the whole business of registering a private limited company at Companies House? We have got every single part of it covered for you.',
    faqs: [
      faq(
        'What information, documentation and proof of identity will I need to provide before Rapid Formations can submit my private limited company registration to Companies House on my behalf?',
        p([
          t(
            "To set up a limited company, you simply need a company name, the company's business activity, a registered office address in the UK, and the details of the company directors, shareholders, and People with Significant Control (PSC). The beneficial owners of the company, those owning more than 25% of the issued shares, may also be required to provide proof of ID and address. For more information, please have a look at our ",
          ),
          link('Required Information Checklist', '/help-centre/required-information/'),
          t(
            '. If you are based outside of the United Kingdom, our non-resident packages include a London registered office address, a business banking referral and our Hassle-Free Compliance Service, so that everything Companies House expects of a newly incorporated company is handled for you from the day the company is approved.',
          ),
        ]),
        p([
          t(
            'We must also perform our own due diligence checks to meet anti-money laundering requirements, as HMRC supervises us for anti-money laundering compliance, and the identity verification process is quick, user-friendly, and provided at no additional cost to you.',
          ),
        ]),
      ),
      ...sourceFaqs,
    ],
  },
}

export const RichAnswer: Story = {
  args: {
    ...defaultArgs,
    faqs: [
      faq(
        'What is included in every company formation package?',
        p([
          t(
            'Every package includes everything you need to incorporate a private company limited by shares and start trading straight away.',
          ),
        ]),
        list([
          'Digital certificate of incorporation and share certificates',
          'Memorandum and articles of association',
          'Free business bank account referrals with up to eight UK banks',
          'Companies House filing handled electronically on your behalf',
        ]),
        p([
          t('If you later decide you no longer need the company, our '),
          link('Company Dissolution Service', '/company-dissolution/'),
          t(' will close it down for you.'),
        ]),
      ),
      ...sourceFaqs.slice(0, 2),
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    title: SUPPORT_EMAIL,
    faqs: [
      faq(
        `Where do I send my documents — ${SUPPORT_EMAIL}?`,
        p([t(`Full terms are published at ${LONG_URL}`)]),
        p([t('Questions go to '), link(SUPPORT_EMAIL, LONG_URL), t('.')]),
      ),
      ...sourceFaqs.slice(0, 1),
    ],
  },
}

export const NoTitle: Story = {
  args: {
    ...defaultArgs,
    title: null,
  },
}

export const SingleItem: Story = {
  args: {
    ...defaultArgs,
    faqs: sourceFaqs.slice(0, 1),
  },
}

export const ManyItems: Story = {
  args: {
    ...defaultArgs,
    faqs: [...sourceFaqs, ...sourceFaqs],
  },
}

export const NarrowLongCopy: Story = {
  ...narrowViewport,
  args: LongCopy.args,
}

export const NarrowUnbrokenTokens: Story = {
  ...narrowViewport,
  args: UnbrokenTokens.args,
}
