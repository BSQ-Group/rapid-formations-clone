import React from 'react'
import { faPhone } from '@fortawesome/pro-solid-svg-icons/faPhone'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { CtaLink } from '@/components/shared/CtaLink/CtaLink'
import { FaIcon } from '@/components/shared/FaIcon'
import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { contactUsStyles as s } from './ContactUs.styles'
import { LiveChatButton } from './LiveChatButton'

export type ContactUsButton = {
  id: string
  label: string
  liveChat?: boolean
  phoneIcon?: boolean
  href?: string
  newTab?: boolean | null
  rel?: string
}

export type ContactUsSection = {
  id: string
  heading: string
  body: DefaultTypedEditorState
  buttons: ContactUsButton[]
}

export const ContactUsView: React.FC<{ sections: ContactUsSection[] }> = ({ sections }) => (
  <div className={s.list}>
    {sections.map((section) => (
      <div key={section.id} className={s.block}>
        <div className={s.titleWrap}>
          <Text as="h2" textStyle="span" text={section.heading} className={s.heading} />
        </div>
        <RichText data={section.body} enableGutter={false} enableProse={false} className={s.body} />
        {section.buttons.length > 0 && (
          <div className={s.buttons}>
            {section.buttons.map((button) =>
              button.liveChat ? (
                <LiveChatButton key={button.id} label={button.label} className={s.button} />
              ) : (
                <CtaLink
                  key={button.id}
                  href={button.href ?? '#'}
                  label={button.label}
                  newTab={button.newTab}
                  rel={button.rel}
                  icon={button.phoneIcon ? <FaIcon icon={faPhone} className={s.icon} /> : undefined}
                  size="md"
                  tone="cyanLift"
                  className={s.button}
                />
              ),
            )}
          </div>
        )}
      </div>
    ))}
  </div>
)
