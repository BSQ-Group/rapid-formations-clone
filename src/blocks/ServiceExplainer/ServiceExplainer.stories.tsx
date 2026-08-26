import type { Meta, StoryObj } from '@storybook/react'

import { ServiceExplainerBlockComponent } from './Component'
import type { Media, ServiceExplainerBlock } from '@/payload-types'

const still = {
  id: 'still-landscape',
  filename: 'still.png',
  alt: 'Video still',
  url: 'https://placehold.co/1600x900/1c2436/ffffff?text=Video+still',
  width: 1600,
  height: 900,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
} as Media

const stillPortrait = {
  id: 'still-portrait',
  filename: 'still-tall.png',
  alt: 'Tall video still',
  url: 'https://placehold.co/600x1200/1c2436/ffffff?text=Tall+still',
  width: 600,
  height: 1200,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
} as Media

const landscape = {
  id: 'image-landscape',
  filename: 'library.png',
  alt: 'Template library',
  url: 'https://placehold.co/1106x730/1c2436/ffffff?text=Library',
  width: 1106,
  height: 730,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
} as Media

const portrait = {
  id: 'image-portrait',
  filename: 'tall.png',
  alt: 'Tall image',
  url: 'https://placehold.co/600x1200/1c2436/ffffff?text=Tall',
  width: 600,
  height: 1200,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
} as Media

const cta = {
  type: 'custom' as const,
  url: 'https://client.rapidformations.co.uk/login/',
  label: 'Buy Now',
  newTab: true,
}

const meta: Meta<typeof ServiceExplainerBlockComponent> = {
  component: ServiceExplainerBlockComponent,
  title: 'Blocks/ServiceExplainer',
  parameters: { layout: 'fullscreen' },
  args: {
    blockType: 'serviceExplainer',
    heading: 'Instant access to 400+ ready-to-use business document templates',
    subheading:
      'Your company will need a lot of documents over its lifetime. Our library of 400+ legally reviewed templates means you’ll never start from scratch – covering employment, contracts, data protection, company policies, and more.',
    videoUrl: 'https://player.vimeo.com/video/1181103563',
    videoStill: still,
    videoTitle: 'Business Document Template Library Explained.',
    image: landscape,
    contentTitle: 'Continuous compliance support, all in one place',
    contentBody:
      'After forming your company, staying compliant can feel like a full-time job. Our Hassle-Free Compliance Service takes care of the filings, the documents, and the deadlines – so you don’t have to. Be confident that your company stays compliant year-round.',
    cta,
  },
}

export default meta
type Story = StoryObj<typeof ServiceExplainerBlockComponent>

export const Default: Story = {
  args: {
    heading: 'Instant access to 400+ ready-to-use business document templates',
    subheading:
      'Your company will need a lot of documents over its lifetime. Our library of 400+ legally reviewed templates means you’ll never start from scratch – covering employment, contracts, data protection, company policies, and more.',
    videoUrl: 'https://player.vimeo.com/video/1181103563',
    videoStill: still,
    videoTitle: 'Business Document Template Library Explained.',
    image: landscape,
    contentTitle: 'Continuous compliance support, all in one place',
    contentBody:
      'After forming your company, staying compliant can feel like a full-time job. Our Hassle-Free Compliance Service takes care of the filings, the documents, and the deadlines – so you don’t have to. Be confident that your company stays compliant year-round.',
    cta,
  },
}

export const NoSubheading: Story = {
  args: { subheading: '' },
}

export const ShortCopy: Story = {
  args: {
    heading: 'Templates, explained',
    subheading: 'Watch the tour.',
    contentTitle: 'One place',
    contentBody: 'Two words.',
    cta: { ...cta, label: 'Buy' },
  },
}

export const LongCopy: Story = {
  args: {
    heading:
      'Instant access to more than four hundred ready-to-use, legally reviewed and fully editable business document templates for your growing UK limited company, its directors and its shareholders',
    subheading:
      'Your company will need a great many documents over its lifetime, and writing each one from scratch is neither quick nor safe. Our library of more than four hundred legally reviewed templates means you never start from a blank page — covering employment, contracts, data protection, company policies, board minutes, shareholder resolutions and a great deal more besides. Every template is drafted by qualified lawyers, kept current with changing legislation, and editable in the tools your team already uses, so the version you download on the day you need it is the version that is correct on that day.',
    contentTitle:
      'Continuous compliance support for your company, all gathered together in one single place',
    contentBody:
      'After forming your company, staying compliant can feel like a full-time job. Our Hassle-Free Compliance Service takes care of the filings, the documents, and the deadlines, so you do not have to. Every confirmation statement, every ICO renewal, every register update and every reminder is handled for you, and our compliance specialists are on the end of a phone whenever a question comes up. Your statutory books are kept current as directors, shareholders and addresses change, your filing history stays in one place, and you are told what is due well before anything falls overdue.',
    cta: {
      ...cta,
      label:
        'Buy the Hassle-Free Compliance Service and the Business Document Template Library now',
    },
  },
}

export const UnbrokenTokens: Story = {
  args: {
    heading: 'https://www.rapidformations.co.uk/hassle-free-compliance/documents-explained',
    subheading: 'Rechtsschutzversicherungsgesellschaftenvertragsvorlagendokumentation',
    videoTitle:
      'Betriebsvereinbarungsentwurfsdokumentationsvorlagenverzeichnisverwaltungsberechtigungsnachweisformular',
    contentTitle: 'compliance-support@rapidformations.co.uk',
    contentBody: 'Unternehmensdokumentenvorlagenbibliothekszugangsberechtigungsnachweis',
    cta: { ...cta, label: 'compliance-support@rapidformations.co.uk' },
  },
}

export const NoVideoUrl: Story = {
  args: { videoUrl: '' },
}

export const NoVideoStill: Story = {
  args: { videoStill: null } as unknown as Partial<ServiceExplainerBlock>,
}

export const NoImage: Story = {
  args: { image: null } as unknown as Partial<ServiceExplainerBlock>,
}

export const PortraitImage: Story = {
  args: { image: portrait },
}

export const PortraitStill: Story = {
  args: { videoStill: stillPortrait },
}

export const NoCta: Story = {
  args: { cta: { ...cta, label: '' } },
}

export const Narrow: Story = {
  args: {
    heading:
      'Instant access to more than four hundred ready-to-use, legally reviewed and fully editable business document templates for your growing UK limited company, its directors and its shareholders',
    subheading:
      'Your company will need a great many documents over its lifetime, and writing each one from scratch is neither quick nor safe. Our library of more than four hundred legally reviewed templates means you never start from a blank page.',
    contentTitle:
      'Continuous compliance support for your company, all gathered together in one single place',
    contentBody:
      'After forming your company, staying compliant can feel like a full-time job. Our Hassle-Free Compliance Service takes care of the filings, the documents, and the deadlines, so you do not have to.',
    cta: { ...cta, label: 'Buy the Hassle-Free Compliance Service now' },
  },
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '2000px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}
