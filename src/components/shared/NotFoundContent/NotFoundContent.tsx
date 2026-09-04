import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { LucideIcon } from '@/components/shared/LucideIcon/LucideIcon'
import Text from '@/components/shared/Text'

import { notFoundContentStyles as s } from './NotFoundContent.styles'

export function NotFoundContent() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.card}>
          <div>
            <Text as="h1" textStyle="span" text="Error 404" className={s.title} />
            <Text as="h2" textStyle="span" text="Page not available" className={s.subtitle} />
            <Text
              as="p"
              textStyle="span"
              text="Sorry! It looks like this page is no longer available. It may have been removed because the information was outdated. Alternatively, it may have disappeared because our website is experiencing an unusually high volume of traffic. Please return to our homepage and try again."
              className={s.paragraph}
            />
            <Link href="/" className={s.link}>
              <LucideIcon name="circle-chevron-left" className={s.linkIcon} />
              Go back to homepage.
            </Link>
          </div>
          <div className={s.imageWrap}>
            <Image
              src="/images/errors/404-staff-illustration.png"
              alt="Three members of staff holding their hands over their face."
              width={561}
              height={392}
              className={s.image}
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}
