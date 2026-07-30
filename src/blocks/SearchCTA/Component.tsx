'use client'

import React, { useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { SearchCTABlock as SearchCTABlockProps } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { LucideIcon } from '@/components/shared/LucideIcon'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { searchCTAStyles as s } from './SearchCTA.styles'
import { track } from '@/lib/analytics'

export const SearchCTABlock: React.FC<SearchCTABlockProps> = ({
  textTheme,
  trustPillText,
  trustPillTextMobile,
  heading,
  subtitle,
  inputPlaceholder,
  submitButtonText,
  searchActionUrl,
  footerNote,
  image,
  sectionLayout,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const isDark = textTheme === 'dark'

  const handleSubmit = () => {
    const value = inputRef.current?.value?.trim()
    if (!value || !searchActionUrl) return
    track('Search CTA clicked', { search: value })
    const [path, qs] = searchActionUrl.split('?')
    const params = new URLSearchParams(qs ?? '')
    params.set('q', value)
    router.push(`${path}?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.card}>
          {/* Background — uploaded image, or CSS gradient fallback */}
          {image && typeof image === 'object' ? (
            <Media resource={image} fill imgClassName="object-cover" />
          ) : (
            <div className={s.cardGradient} aria-hidden />
          )}

          <div className={s.content}>
            {/* Trust pill */}
            {(trustPillText || trustPillTextMobile) && (
              <div className={s.pill}>
                <div className={s.pillBorder} />
                <div className={isDark ? s.pillFillDark : s.pillFillLight} />
                <span className={s.pillDot} />
                {trustPillTextMobile && (
                  <span className={isDark ? s.pillTextDarkMobile : s.pillTextLightMobile}>
                    {trustPillTextMobile}
                  </span>
                )}
                {trustPillText && (
                  <span className={isDark ? s.pillTextDarkDesktop : s.pillTextLightDesktop}>
                    {trustPillText}
                  </span>
                )}
              </div>
            )}

            {/* Heading + subtitle */}
            <div className={s.textGroup}>
              <Text
                as="h2"
                textStyle="headline-5xl"
                text={heading}
                className={isDark ? s.headingDark : s.headingLight}
              />
              {subtitle && (
                <Text
                  textStyle="body-base"
                  text={subtitle}
                  className={isDark ? s.subtitleDark : s.subtitleLight}
                />
              )}
            </div>

            {/* Input row */}
            <div className={s.inputWrap}>
              <input
                ref={inputRef}
                type="text"
                placeholder={inputPlaceholder ?? 'Enter company name'}
                className={s.inputField}
                onKeyDown={handleKeyDown}
              />
              {/* Text button — md+ */}
              <Button
                variant="primary"
                size="lg"
                className={s.submitBtnDesktop}
                onClick={handleSubmit}
              >
                {submitButtonText ?? 'Check availability'}
              </Button>
              {/* Icon button — mobile */}
              <Button
                variant="primary"
                size="icon"
                className={s.submitBtnMobile}
                onClick={handleSubmit}
                aria-label="Search"
              >
                <LucideIcon name="ArrowRight" size={20} />
              </Button>
            </div>

            {/* Footer note */}
            {footerNote && (
              <Text
                textStyle="body-xs"
                text={footerNote}
                className={isDark ? s.footerNoteDark : s.footerNoteLight}
              />
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
