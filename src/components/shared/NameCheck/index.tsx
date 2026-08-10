'use client'

import React, { useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { checkCompany } from '@/api/checkCompany'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { useCustomToast } from '@/components/shared/CustomToast/useCustomToast'
import { cn } from '@/utilities/ui'
import { nameCheckStyles as s } from './NameCheck.styles'

export const ACCOUNT_URL = 'https://client.rapidformations.co.uk'

export type NameCheckResult =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'available'; name: string }
  | { status: 'unavailable'; name: string }

export type NameCheckProps = {
  variant?: 'hero' | 'package'
  placeholder?: string | null
  idleSlot?: React.ReactNode
  footerSlot?: React.ReactNode
  availableCta?: React.ReactNode
  checkoutPath?: string | null
  resultHeadingLevel?: 'h1' | 'h2'
  className?: string
}

const COOKIE_MAX_AGE = 3600

const writeCompanyNameCookie = (name: string) => {
  if (typeof document === 'undefined') return
  const parts = [
    `company-name=${encodeURIComponent(name)}`,
    `max-age=${COOKIE_MAX_AGE}`,
    'path=/',
    'SameSite=Lax',
  ]
  if (window.location.hostname.endsWith('rapidformations.co.uk')) {
    parts.push('domain=rapidformations.co.uk', 'Secure')
  }
  document.cookie = parts.join('; ')
}

export const buildCheckoutUrl = (checkoutPath: string, name: string) =>
  `${ACCOUNT_URL}${checkoutPath}?name=${encodeURIComponent(name)}&gle=namecheck`

export const NameCheck: React.FC<NameCheckProps> = ({
  variant = 'hero',
  placeholder,
  idleSlot,
  footerSlot,
  availableCta,
  checkoutPath,
  resultHeadingLevel,
  className,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<NameCheckResult>({ status: 'idle' })
  const { customToast } = useCustomToast()

  const onLight = variant === 'package'
  const headingLevel = resultHeadingLevel ?? (variant === 'hero' ? 'h1' : 'h2')
  const isLoading = result.status === 'loading'
  const label = placeholder || 'Find your perfect company name'

  const handleSearch = async (value?: string) => {
    const name = (value ?? inputRef.current?.value ?? '').trim()
    if (!name) return

    setResult({ status: 'loading' })
    try {
      const available = await checkCompany(name)
      if (available) writeCompanyNameCookie(name)
      setResult({ status: available ? 'available' : 'unavailable', name })
    } catch (err) {
      setResult({ status: 'idle' })
      customToast.error(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  const handleReset = () => {
    setResult({ status: 'idle' })
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const searchForm = (
    <div className={s.form}>
      <div className={s.row}>
        <input
          ref={inputRef}
          type="text"
          placeholder={label}
          aria-label={label}
          className={cn(s.input, onLight && s.inputOnLight)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
          disabled={isLoading}
        />
        <Button
          variant="primary"
          size="lg"
          aria-label="Check company name availability"
          className={s.button}
          onClick={() => handleSearch()}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className={cn('animate-spin', s.buttonIcon)} />
          ) : (
            'Search'
          )}
        </Button>
      </div>
    </div>
  )

  if (result.status === 'idle' || result.status === 'loading') {
    return (
      <div className={cn(s.root, onLight && s.rootPackage, className)}>
        {idleSlot}
        {searchForm}
        {footerSlot}
      </div>
    )
  }

  const isAvailable = result.status === 'available'

  return (
    <div className={cn(s.root, onLight && s.rootPackage, className)}>
      <div className={s.result}>
        <div className={s.resultHead}>
          <div
            className={cn(
              s.resultBadge,
              isAvailable ? s.resultBadgeAvailable : s.resultBadgeUnavailable,
            )}
          >
            <span>{isAvailable ? '✓' : '✕'}</span>
            <span>{isAvailable ? 'Available' : 'Unavailable'}</span>
          </div>
          <div className={s.resultNameBlock}>
            <Text
              textStyle="body-xs"
              text="COMPANY NAME CHECK"
              className={cn(s.resultEyebrow, onLight && s.resultEyebrowOnLight)}
            />
            <Text
              as={headingLevel}
              textStyle="headline-6xl"
              text={result.name}
              className={cn(
                s.resultName,
                onLight && s.resultNameOnLight,
                !isAvailable && s.resultNameUnavailable,
              )}
            />
            <div className={isAvailable ? s.resultBarAvailable : s.resultBarUnavailable} />
          </div>
          <Text
            textStyle="body-lg"
            text={
              isAvailable
                ? 'Congratulations! This company name is available.'
                : 'Sorry, this company name is unavailable.'
            }
            className={cn(s.resultDescription, onLight && s.resultDescriptionOnLight)}
          />
        </div>

        {isAvailable ? (
          <div className={s.ctaRow}>
            {availableCta ??
              (checkoutPath ? (
                <a className={s.cta} href={buildCheckoutUrl(checkoutPath, result.name)}>
                  Continue
                </a>
              ) : null)}
            <button
              type="button"
              onClick={handleReset}
              className={cn(s.searchAgain, onLight && s.searchAgainOnLight)}
            >
              Or search again
            </button>
          </div>
        ) : (
          <div className={s.retryRow}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Check if your perfect company name is available"
              aria-label="Check if your perfect company name is available"
              className={s.retryInput}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(inputRef.current?.value)
              }}
            />
            <Button
              variant="secondary-light"
              size="lg"
              className={cn(s.retryButton, onLight && s.retryButtonOnLight)}
              onClick={() => handleSearch(inputRef.current?.value)}
            >
              Search Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
