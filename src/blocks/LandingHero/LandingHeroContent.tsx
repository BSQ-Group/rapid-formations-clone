'use client'

import React, { useRef, useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

import type { LandingHeroBlock as LandingHeroBlockProps } from '@/payload-types'
import { checkCompany } from '@/api/checkCompany'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { useTurnstileToken } from '@/utilities/turnstile'
import { useCustomToast } from '@/components/shared/CustomToast/useCustomToast'
import { landingHeroStyles as s } from './LandingHero.styles'

type SearchResult =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'available'; name: string }
  | { status: 'unavailable'; name: string; alsoUnavailable?: string }

type Props = Pick<
  LandingHeroBlockProps,
  'eyebrow' | 'heading' | 'benefits' | 'searchPlaceholder' | 'pricingLink' | 'packagesLink'
>

export function LandingHeroContent({
  eyebrow,
  heading,
  benefits,
  searchPlaceholder,
  pricingLink,
  packagesLink,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<SearchResult>({ status: 'idle' })
  const { latestToken, resetToken, TurnstileComponent } = useTurnstileToken()
  const { customToast } = useCustomToast()

  const handleSearch = async (value?: string) => {
    const name = (value ?? inputRef.current?.value ?? '').trim()
    if (!name) return

    setResult({ status: 'loading' })
    try {
      const available = await checkCompany(name, latestToken || undefined)
      if (available) {
        setResult({ status: 'available', name })
      } else {
        setResult({ status: 'unavailable', name })
      }
    } catch (err) {
      setResult({ status: 'idle' })
      customToast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      resetToken()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleReset = () => {
    setResult({ status: 'idle' })
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const isLoading = result.status === 'loading'
  const isReady = latestToken !== null

  const renderContent = () => {
    // ── Idle / Loading state ──────────────────────────────────────────────────
    if (result.status === 'idle' || result.status === 'loading') {
      return (
        <div className={s.content}>
          <div className={s.headlineBlock}>
            <div className={s.headlineGroup}>
              {eyebrow && <Text text={eyebrow} textStyle="body-sm" className={s.eyebrow} />}
              {heading && (
                <Text text={heading} as="h1" textStyle="headline-6xl" className={s.heading} />
              )}
            </div>
            {benefits && benefits.length > 0 && (
              <div className={s.benefitsList}>
                {benefits.map((item) => (
                  <div key={item.id} className={s.benefitItem}>
                    <span className={s.benefitIconContainer}>
                      <Check size={16} className={s.benefitIcon} />
                    </span>
                    <Text text={item.text} textStyle="body-sm" className={s.benefitText} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={s.ctaContainer}>
            <div className={s.searchInput}>
              <input
                ref={inputRef}
                type="text"
                placeholder={searchPlaceholder || 'What will you call your company?'}
                className={s.searchPlaceholder}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button
                variant="primary"
                size="icon"
                aria-label="Check company name availability"
                className={s.searchButton}
                onClick={() => handleSearch()}
                disabled={isLoading || !isReady}
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin text-[var(--icon-default)]" />
                ) : (
                  <ArrowRight size={24} className={s.searchButtonIcon} />
                )}
              </Button>
            </div>

            {pricingLink && (
              <CMSLink {...pricingLink} appearance="inline" className={s.pricingLink} />
            )}
          </div>
        </div>
      )
    }

    // ── Available state ───────────────────────────────────────────────────────
    if (result.status === 'available') {
      return (
        <div className={s.content}>
          <div className={s.headlineBlock}>
            <div className={cn(s.resultBadge, s.resultBadgeAvailable)}>
              <span>✓</span>
              <span>Available</span>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <Text text="COMPANY NAME CHECK" textStyle="body-xs" className={s.resultEyebrow} />
                <div className={s.resultNameBlock}>
                  <Text
                    as="h1"
                    textStyle="headline-6xl"
                    text={result.name}
                    className={s.resultName}
                  />
                  <div className={s.resultBarAvailable} />
                </div>
              </div>
              <Text
                textStyle="body-lg"
                text="Congratulations! This company name is available."
                className={s.resultDescription}
              />
            </div>
          </div>

          <div className={s.availableCtaRow}>
            <CMSLink
              {...(packagesLink ?? {})}
              appearance="inline"
              className="inline-flex items-center justify-center gap-2 bg-[var(--button-primary-idle)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-hover)] font-bold shadow-sm rounded px-4 py-3 w-full sm:w-auto text-base"
            >
              Choose a Package
            </CMSLink>
            <button type="button" onClick={handleReset} className={s.searchAgainLink}>
              Or search again
            </button>
          </div>
        </div>
      )
    }

    // ── Unavailable state ─────────────────────────────────────────────────────
    return (
      <div className={s.content}>
        <div className={s.headlineBlock}>
          <div className={cn(s.resultBadge, s.resultBadgeUnavailable)}>
            <span>✕</span>
            <span>Unavailable</span>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Text text="COMPANY NAME CHECK" textStyle="body-xs" className={s.resultEyebrow} />
              <div className={s.resultNameBlock}>
                <Text
                  as="h1"
                  textStyle="headline-6xl"
                  text={result.name}
                  className={cn(s.resultName, s.resultNameUnavailable)}
                />
                <div className={s.resultBarUnavailable} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Text
                textStyle="body-lg"
                text="Sorry, this company name is unavailable."
                className={s.resultDescription}
              />
              {result.alsoUnavailable && (
                <Text
                  textStyle="body-lg"
                  text={`Also unavailable is: ${result.alsoUnavailable}`}
                  className={s.resultDescription}
                />
              )}
            </div>
          </div>
        </div>

        <div className={s.unavailableSearchRow}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Check if your perfect company name is available"
            className={s.unavailableInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(inputRef.current?.value)
            }}
          />
          <Button
            variant="secondary-light"
            size="lg"
            className={s.unavailableSearchButton}
            onClick={() => handleSearch(inputRef.current?.value)}
          >
            Search Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderContent()}
      <TurnstileComponent />
    </>
  )
}
