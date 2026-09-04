'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

import { checkCompany } from '@/api/checkCompany'
import { EMPTY_DESCRIPTION, ERROR_DESCRIPTION, ERROR_NAME } from '@/lib/nameCheck/verdict'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { useCustomToast } from '@/components/shared/CustomToast/useCustomToast'
import { cn } from '@/utilities/ui'
import { NAME_CHECK_RESET_EVENT } from './reset'
import { nameCheckStyles as s } from './NameCheck.styles'

export const ACCOUNT_URL = 'https://client.rapidformations.co.uk'

export type NameCheckResult =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'available'; name: string; description: string }
  | { status: 'unavailable'; name: string; description: string }
  | { status: 'error'; name: string; description: string }

export type NameCheckProps = {
  variant?: 'hero' | 'package'
  placeholder?: string | null
  idleSlot?: React.ReactNode
  footerSlot?: React.ReactNode
  availableCta?: React.ReactNode
  checkoutPath?: string | null
  resultHeadingLevel?: 'h1' | 'h2' | 'h3'
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
  const headingLevel = resultHeadingLevel ?? (variant === 'hero' ? 'h3' : 'h2')
  const isLoading = result.status === 'loading'
  const label = placeholder || 'Find your perfect company name'

  const handleSearch = async (value?: string) => {
    const name = (value ?? inputRef.current?.value ?? '').trim()
    if (!name) {
      setResult({ status: 'error', name: ERROR_NAME, description: EMPTY_DESCRIPTION })
      return
    }

    setResult({ status: 'loading' })
    try {
      const outcome = await checkCompany(name)
      if (outcome.available) writeCompanyNameCookie(outcome.name)
      setResult({
        status: outcome.available ? 'available' : 'unavailable',
        name: outcome.name,
        description: outcome.description,
      })
    } catch {
      setResult({ status: 'error', name: ERROR_NAME, description: ERROR_DESCRIPTION })
      customToast.error(ERROR_DESCRIPTION)
    }
  }

  const handleReset = () => {
    setResult({ status: 'idle' })
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  useEffect(() => {
    const onReset = () => setResult({ status: 'idle' })
    window.addEventListener(NAME_CHECK_RESET_EVENT, onReset)
    return () => window.removeEventListener(NAME_CHECK_RESET_EVENT, onReset)
  }, [])

  const renderForm = (isRetry: boolean) => (
    <div className={cn(s.form, onLight && s.formPackage, isRetry && s.formRetry)}>
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
          className={cn(s.button, isRetry && s.buttonRetry)}
          onClick={() => handleSearch()}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className={cn('animate-spin', s.buttonIcon)} />
          ) : isRetry ? (
            'Search again'
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
        {renderForm(false)}
        {footerSlot}
      </div>
    )
  }

  const isAvailable = result.status === 'available'
  const isError = result.status === 'error'
  const icon = isError ? 'oops' : isAvailable ? 'pass' : 'fail'

  return (
    <div className={cn(s.root, onLight && s.rootPackage, className)}>
      <div className={cn(s.result, !onLight && s.resultHero)}>
        <Image
          src={`/images/namecheck/${icon}.png`}
          alt={`Icon for ${isAvailable ? 'green' : isError ? 'error' : 'red'} status.`}
          className={s.resultIcon}
          width={40}
          height={40}
          unoptimized
        />
        <Text
          as={headingLevel}
          text={result.name}
          className={cn(
            s.resultName,
            isAvailable
              ? s.resultNameAvailable
              : isError
                ? s.resultNameError
                : s.resultNameUnavailable,
            !onLight && s.resultNameHero,
          )}
        />
        <Text
          textStyle="span"
          text={result.description}
          className={cn(s.resultDescription, !onLight && s.resultDescriptionHero)}
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
            className={cn(s.searchAgain, !onLight && s.searchAgainHero)}
          >
            Or search again
          </button>
        </div>
      ) : (
        renderForm(true)
      )}
    </div>
  )
}
