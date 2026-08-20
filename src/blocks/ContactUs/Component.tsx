import React from 'react'

import type { ContactUsBlock as ContactUsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { contactUsStyles as s } from './ContactUs.styles'
import { ContactUsView, type ContactUsButton, type ContactUsSection } from './ContactUsView'

type RawSection = NonNullable<ContactUsBlockProps['sections']>[number]
type RawButton = NonNullable<RawSection['buttons']>[number]

const toButton = (button: RawButton, id: string): ContactUsButton[] => {
  if (button.action === 'liveChat') {
    return button.chatLabel ? [{ id, label: button.chatLabel, liveChat: true }] : []
  }
  const cta = button.cta as LinkData | undefined
  if (!cta?.label) return []
  const href = getLinkHref(cta)
  return [
    {
      id,
      label: cta.label,
      phoneIcon: button.icon === 'phone',
      href,
      newTab: href.startsWith('tel:') ? false : cta.newTab,
      rel: cta.newTab ? 'nofollow noreferrer noopener' : undefined,
    },
  ]
}

const toSection = (section: RawSection, index: number): ContactUsSection[] => {
  const { heading, body } = section
  if (!heading || !body) return []
  const buttons = (section.buttons ?? []).flatMap((button, buttonIndex) =>
    toButton(button, button.id ?? `${index}-${buttonIndex}`),
  )
  return [{ id: section.id ?? `${index}`, heading, body, buttons }]
}

export const ContactUsBlockComponent: React.FC<ContactUsBlockProps> = ({
  sections,
  sectionLayout,
}) => {
  const items = (sections ?? []).flatMap(toSection)

  if (!items.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <ContactUsView sections={items} />
      </Container>
    </SectionWrapper>
  )
}
