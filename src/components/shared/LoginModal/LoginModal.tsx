'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronLeft } from 'lucide-react'
import { Modal } from '@/components/shared/Modal/Modal'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { InputHookForm } from '@/components/HookForm/InputHookForm'
import Text from '@/components/shared/Text'
import {
  firebaseSignInWithGoogle,
  firebaseSignInWithApple,
  firebaseSignInWithMicrosoft,
  firebaseSignInWithLink,
} from '@/lib/firebase'
import { sendEmailOrPin } from '@/utilities/emailOrPin'
import { validateEmail } from '@/utilities/validateEmail'
import { loginModalStyles as s } from './LoginModal.styles'
import IconEmail from '@/assets/icons/iconEmail.svg'
import IconGoogle from '@/assets/icons/iconGoogle.svg'
import IconApple from '@/assets/icons/iconApple.svg'
import IconMicrosoft from '@/assets/icons/iconMicrosoft.svg'

const PIN_LENGTH = 6
const RESEND_COOLDOWN = 60
const OTP_PATH = { SEND: 'send-otp', VERIFY: 'verify-otp' } as const

type View = 'methods' | 'email' | 'pin'

interface EmailFormValues {
  email: string
}

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  error?: string | null
}

export function LoginModal({ open, onOpenChange, error }: LoginModalProps) {
  const [view, setView] = useState<View>('methods')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(''))
  const [authError, setAuthError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const pinRefs = useRef<(HTMLInputElement | null)[]>([])
  const displayError = error || authError

  const emailForm = useForm<EmailFormValues>({
    defaultValues: { email: '' },
  })

  const [wasOpen, setWasOpen] = useState(open)
  if (wasOpen !== open) {
    setWasOpen(open)
    if (!open) {
      setView('methods')
      setEmail('')
      setPin(Array(PIN_LENGTH).fill(''))
      setAuthError(null)
      setIsLoading(false)
      setResendTimer(0)
    }
  }

  useEffect(() => {
    if (!open) emailForm.reset()
  }, [open, emailForm])

  useEffect(() => {
    if (resendTimer <= 0) return
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [resendTimer])

  const handleSSO = async (signIn: () => Promise<{ ok: boolean; error: string | null }>) => {
    setAuthError(null)
    const result = await signIn()
    if (!result.ok && result.error) {
      setAuthError(result.error)
    }
  }

  const handleSendOtp = useCallback(
    async (values: EmailFormValues) => {
      if (!validateEmail(values.email)) {
        emailForm.setError('email', { message: 'Please enter a valid email address' })
        return
      }

      setAuthError(null)
      setIsLoading(true)

      const result = await sendEmailOrPin(OTP_PATH.SEND, values.email)

      setIsLoading(false)

      if (result.ok) {
        setEmail(values.email)
        setView('pin')
        setPin(Array(PIN_LENGTH).fill(''))
        setResendTimer(RESEND_COOLDOWN)
        setTimeout(() => pinRefs.current[0]?.focus(), 100)
      } else {
        setAuthError(result.error)
      }
    },
    [emailForm],
  )

  const handleResend = useCallback(async () => {
    if (resendTimer > 0) return
    setAuthError(null)
    setIsLoading(true)
    const result = await sendEmailOrPin(OTP_PATH.SEND, email)
    setIsLoading(false)

    if (result.ok) {
      setPin(Array(PIN_LENGTH).fill(''))
      setResendTimer(RESEND_COOLDOWN)
      pinRefs.current[0]?.focus()
    } else {
      setAuthError(result.error)
    }
  }, [email, resendTimer])

  const handleVerifyPin = useCallback(
    async (currentPin: string[]) => {
      const code = currentPin.join('')
      if (code.length !== PIN_LENGTH) return

      setAuthError(null)
      setIsLoading(true)

      const result = await sendEmailOrPin(OTP_PATH.VERIFY, email, code)

      if (result.ok && result.data && typeof result.data === 'object' && 'signInLink' in result.data) {
        const { signInLink } = result.data as { signInLink: string }
        const signInResult = await firebaseSignInWithLink(email, signInLink, () => {
          onOpenChange(false)
        })
        if (!signInResult.ok) {
          setAuthError(signInResult.error || 'Authentication failed')
          setIsLoading(false)
        }
      } else {
        setAuthError(result.ok ? 'Invalid response from server' : result.error)
        setPin(Array(PIN_LENGTH).fill(''))
        pinRefs.current[0]?.focus()
        setIsLoading(false)
      }
    },
    [email, onOpenChange],
  )

  const handlePinChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return

      const newPin = [...pin]
      newPin[index] = value.slice(-1)
      setPin(newPin)

      if (value && index < PIN_LENGTH - 1) {
        pinRefs.current[index + 1]?.focus()
      }

      if (newPin.every((d) => d !== '') && newPin.join('').length === PIN_LENGTH) {
        handleVerifyPin(newPin)
      }
    },
    [pin, handleVerifyPin],
  )

  const handlePinKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !pin[index] && index > 0) {
        pinRefs.current[index - 1]?.focus()
      }
    },
    [pin],
  )

  const handlePinPaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PIN_LENGTH)
      if (!pasted) return

      const newPin = Array(PIN_LENGTH).fill('')
      pasted.split('').forEach((char, i) => {
        newPin[i] = char
      })
      setPin(newPin)

      const focusIndex = Math.min(pasted.length, PIN_LENGTH - 1)
      pinRefs.current[focusIndex]?.focus()

      if (pasted.length === PIN_LENGTH) {
        handleVerifyPin(newPin)
      }
    },
    [handleVerifyPin],
  )

  if (view === 'methods') {
    return (
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        title="Sign in"
        description="Choose a sign-in method to continue"
        contentClassName={s.content}
      >
        {displayError && <Text text={displayError} textStyle="body-sm" className={s.error} />}
        <div className={s.methods}>
          <button type="button" className={s.methodButton} onClick={() => setView('email')}>
            <IconEmail className={s.methodIcon} />
            Continue with Email
          </button>
          <div className={s.dividerRow}>
            <div className={s.dividerLine} />
            <Text text="or" textStyle="body-xs" className={s.dividerText} />
            <div className={s.dividerLine} />
          </div>
          <button
            type="button"
            className={s.methodButton}
            onClick={() => handleSSO(firebaseSignInWithGoogle)}
          >
            <IconGoogle className={s.methodIcon} />
            Continue with Google
          </button>
          <button
            type="button"
            className={s.methodButton}
            onClick={() => handleSSO(firebaseSignInWithApple)}
          >
            <IconApple className={s.methodIcon} />
            Continue with Apple
          </button>
          <button
            type="button"
            className={s.methodButton}
            onClick={() => handleSSO(firebaseSignInWithMicrosoft)}
          >
            <IconMicrosoft className={s.methodIcon} />
            Continue with Microsoft
          </button>
        </div>
      </Modal>
    )
  }

  if (view === 'email') {
    return (
      <Modal
        open={open}
        onOpenChange={onOpenChange}
        title="Sign in with Email"
        contentClassName={s.content}
      >
        <button type="button" className={s.backButton} onClick={() => setView('methods')}>
          <ChevronLeft size={16} />
          Back
        </button>
        {displayError && <Text text={displayError} textStyle="body-sm" className={s.error} />}
        <Form {...emailForm}>
          <form
            onSubmit={(event) => emailForm.handleSubmit(handleSendOtp)(event)}
            className={s.emailForm}
          >
            <InputHookForm
              name="email"
              control={emailForm.control}
              placeholder="Enter your email address"
              type="email"
              rules={{ required: 'Email is required' }}
              autoFocus
            />
            <Button variant="primary" size="lg" type="submit" isLoading={isLoading}>
              Send code
            </Button>
          </form>
        </Form>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Enter verification code"
      description={`We sent a 6-digit code to ${email}`}
      contentClassName={s.content}
    >
      <button type="button" className={s.backButton} onClick={() => setView('email')}>
        <ChevronLeft size={16} />
        Back
      </button>
      {displayError && <Text text={displayError} textStyle="body-sm" className={s.error} />}
      <div className={s.emailForm}>
        <div className={s.pinRow} onPaste={handlePinPaste}>
          {pin.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                pinRefs.current[i] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(i, e.target.value)}
              onKeyDown={(e) => handlePinKeyDown(i, e)}
              className={s.pinInput}
              disabled={isLoading}
            />
          ))}
        </div>
        <div className={s.resendRow}>
          {resendTimer > 0 ? (
            <Text
              text={`Resend code in ${resendTimer}s`}
              textStyle="body-sm"
              className={s.resendTimer}
            />
          ) : (
            <button
              type="button"
              className={s.resendButton}
              onClick={handleResend}
              disabled={isLoading}
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
