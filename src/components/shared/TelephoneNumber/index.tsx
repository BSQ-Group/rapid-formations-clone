import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utilities/ui'
import { Input, Label } from '@/components/shared/Input'
import './TelephoneNumber.css'
import { ChevronDown } from 'lucide-react'

interface CountryCode {
  code: string
  dialCode: string
  name?: string
}

const CountryCodeList: CountryCode[] = [
  { code: 'GB', dialCode: '44', name: 'United Kingdom' },
  { code: 'US', dialCode: '1', name: 'United States' },
  { code: 'DE', dialCode: '49', name: 'Germany' },
  { code: 'FR', dialCode: '33', name: 'France' },
  { code: 'ES', dialCode: '34', name: 'Spain' },
  { code: 'IT', dialCode: '39', name: 'Italy' },
]

function getCountryCallingCode(countryCode: string, countryCodeList: CountryCode[]): string {
  const country = countryCodeList.find((c) => c.code === countryCode)
  return country?.dialCode || '44'
}

function getCountryName(countryCode: string, countryCodeList: CountryCode[]): string {
  const country = countryCodeList.find((c) => c.code === countryCode)
  return country?.name || countryCode
}

const telephoneNumberVariants = cva('telephone-number', {
  variants: {
    variant: {
      default: '',
      error: '',
      disabled: '',
    },
    size: {
      large: '',
      small: 'telephone-number--small',
    },
    fullWidth: {
      true: '',
      false: 'telephone-number--width-auto',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'large',
    fullWidth: true,
  },
})

const countrySelectVariants = cva(
  'telephone-number__country-select flex items-center justify-between bg-input-bg rounded-[6px] text-white relative',
  {
    variants: {
      variant: {
        default: '',
        error: '',
        disabled:
          'telephone-number__country-select--disabled bg-input-bg-disabled cursor-not-allowed opacity-50',
      },
      size: {
        large: 'h-10 px-3 w-[77px]',
        small: 'telephone-number__country-select--small h-8 px-2 w-[77px] text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'large',
    },
  },
)

const wrapperVariants = cva('telephone-number__wrapper relative flex items-center gap-2 w-full', {
  variants: {
    variant: {
      default: '',
      error: 'telephone-number__wrapper--error',
      disabled: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface TelephoneNumberProps
  extends
    Omit<React.ComponentProps<'input'>, 'size' | 'type'>,
    VariantProps<typeof telephoneNumberVariants> {
  error?: string
  description?: string
  countryCode?: string
  defaultCountryCode?: string
  onCountryCodeChange?: (countryCode: string) => void
}

export const TelephoneNumber = React.forwardRef<HTMLInputElement, TelephoneNumberProps>(
  (
    {
      className,
      error,
      description,
      variant = 'default',
      size = 'large',
      fullWidth = true,
      id,
      disabled,
      countryCode,
      defaultCountryCode = 'GB',
      onCountryCodeChange,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref,
  ) => {
    const [selectedCountry, setSelectedCountry] = React.useState<string>(
      countryCode || defaultCountryCode,
    )
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = React.useState(false)
    const countryDropdownRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const combinedRef = (node: HTMLInputElement) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
      inputRef.current = node
    }

    const resolvedVariant = disabled ? 'disabled' : variant
    const errorId = error ? `${id}-error` : undefined
    const descriptionId = description ? `${id}-description` : undefined
    const describedBy = ariaDescribedby || errorId || descriptionId

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          countryDropdownRef.current &&
          !countryDropdownRef.current.contains(event.target as Node)
        ) {
          setIsCountryDropdownOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])  

    React.useEffect(() => {
      if (countryCode && countryCode !== selectedCountry) {
        setSelectedCountry(countryCode)
      }
    }, [countryCode]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleCountrySelect = (countryCode: string) => {
      setSelectedCountry(countryCode)
      setIsCountryDropdownOpen(false)
      onCountryCodeChange?.(countryCode)

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const selectedCountryDialCode = getCountryCallingCode(selectedCountry, CountryCodeList)

    return (
      <div
        className={cn(
          telephoneNumberVariants({
            variant: resolvedVariant,
            size,
            fullWidth,
          }),
          className,
        )}
      >
        <div
          className={cn(
            wrapperVariants({
              variant: resolvedVariant,
            }),
          )}
        >
          <div
            className={cn(
              countrySelectVariants({
                variant: resolvedVariant,
                size,
              }),
            )}
            onClick={() => !disabled && setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            ref={countryDropdownRef}
          >
            <ChevronDown size={size === 'small' ? 14 : 16} className="telephone-number__chevron" />
            <div className="telephone-number__country-code">+{selectedCountryDialCode}</div>
            {isCountryDropdownOpen && (
              <div className="telephone-number__dropdown">
                {CountryCodeList.map((country) => (
                  <div
                    key={country.code}
                    className={cn(
                      'telephone-number__dropdown-item',
                      selectedCountry === country.code && 'telephone-number__dropdown-item--active',
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCountrySelect(country.code)
                    }}
                  >
                    <span className="telephone-number__country-name">
                      {getCountryName(country.code, CountryCodeList)}
                    </span>
                    <span className="telephone-number__country-dial-code">+{country.dialCode}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Input
            type="tel"
            ref={combinedRef}
            id={id}
            className={cn('telephone-number__input', className)}
            variant={resolvedVariant}
            size={size}
            aria-describedby={describedBy}
            disabled={disabled}
            error={undefined}
            {...props}
          />
        </div>
        {error && resolvedVariant === 'error' && (
          <div id={errorId} className="telephone-number__error" role="alert">
            <span className="telephone-number__error-icon" />
            <span>{error}</span>
          </div>
        )}
        {description && !error && (
          <div id={descriptionId} className="telephone-number__description">
            {description}
          </div>
        )}
      </div>
    )
  },
)

TelephoneNumber.displayName = 'TelephoneNumber'
export { Label, telephoneNumberVariants, countrySelectVariants, wrapperVariants }
