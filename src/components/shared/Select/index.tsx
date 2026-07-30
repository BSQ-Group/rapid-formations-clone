'use client'

import React, { FC, useState, useRef, ReactNode, useEffect } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '@/utilities/ui'
import { ChevronDown, ChevronUp, Check, Search, AlertCircle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Input } from '@/components/shared/Input'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
  icon?: ReactNode
}

// Define trigger variants
const selectTriggerVariants = cva(
  'select__trigger flex items-center justify-between rounded-[6px] border-[length:var(--control-input-border-width)] border-[var(--border-subtle)] px-4 text-[var(--text-strong)] outline-none focus:border-[var(--control-input-border-focus)]',
  {
    variants: {
      background: {
        light: 'bg-[var(--control-input-background-light)]',
        dark: 'bg-[var(--control-input-background-dark)]',
      },
      size: {
        large: '!h-[46px]',
        small: '!h-[40px]',
      },
      state: {
        default: 'hover:bg-[var(--surface-hover)]',
        error:
          'border-[var(--border-error)] hover:bg-[var(--surface-hover)] focus-visible:bg-[var(--feedback-error-background-muted)] focus-within:bg-[var(--feedback-error-background-muted)] focus-visible:border-[var(--border-error)] focus-within:border-[var(--border-error)]',
        disabled: 'cursor-not-allowed bg-[var(--control-input-background-subtle)] opacity-50',
      },
    },
    compoundVariants: [
      {
        background: 'light',
        state: 'disabled',
        className: 'cursor-not-allowed bg-[var(--control-input-background-light)] opacity-50',
      },
    ],
    defaultVariants: {
      background: 'dark',
      size: 'large',
      state: 'default',
    },
  },
)

// Define item variants
const selectItemVariants = cva(
  'select__item relative flex w-full cursor-pointer select-none items-center justify-between rounded-[2px] px-2 py-1.5 text-sm outline-none transition-colors',
  {
    variants: {
      variant: {
        default: 'hover:bg-[var(--surface-hover)] hover:text-[var(--text-strong)]',
        checkbox: 'gap-2 hover:bg-[var(--surface-hover)] hover:text-[var(--text-strong)]',
        search: 'hover:bg-[var(--surface-hover)]',
      },
      selected: {
        true: 'bg-[var(--surface-accent)] font-semibold text-white hover:bg-[var(--surface-accent)] hover:text-white',
        false: 'text-[var(--text-subtle)]',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        selected: false,
        className: 'text-[var(--text-muted)]',
      },
      {
        variant: 'checkbox',
        selected: false,
        className: 'text-[var(--text-muted)]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      selected: false,
    },
  },
)

// Checkbox cell: Figma Select/Light — white field, 1px subtle border, 4px radius (semantic tokens)
const checkboxVariants = cva(
  'select__checkbox box-border flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[var(--border-subtle)] bg-[var(--control-input-background-light)] text-[var(--text-strong)]',
)

// Check mark: ~14px, 1.5px stroke, #1C1D24 — use text-strong; hidden when unchecked
const checkIconVariants = cva('select__check-icon h-[14px] w-[14px] stroke-[1.5px]', {
  variants: {
    checked: {
      true: '',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    checked: false,
  },
})

// Export variant types
export type SelectSize = 'small' | 'large'
export type SelectState = 'default' | 'error' | 'disabled'
export type SelectBackground = 'light' | 'dark'
export type SelectVariant = 'default' | 'checkbox' | 'search'

export interface SelectProps extends Omit<
  VariantProps<typeof selectTriggerVariants>,
  'background'
> {
  label?: string
  placeholder?: string
  options: SelectOption[]
  defaultValue?: string
  value?: string
  onValueChange: (value: string) => void
  className?: string
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  disabled?: boolean
  error?: string
  errorIcon?: React.ReactNode
  multiSelect?: boolean
  variant?: SelectVariant
  background?: SelectBackground
}

export const Select: FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  options,
  defaultValue,
  value,
  onValueChange,
  className = '',
  triggerClassName = '',
  contentClassName = '',
  itemClassName = '',
  disabled = false,
  size = 'large',
  error,
  multiSelect = false,
  variant = 'default',
  background = 'dark',
  errorIcon = <AlertCircle size={18} className="text-[var(--feedback-error-surface)]" />,
  state,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(value ? [value] : [])
  const internalChangeRef = useRef(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Search variant only:
  // Radix Select runs focusSelectedItem in a passive effect after popper positions (isPositioned).
  // Defer past that so the search input keeps focus (FocusScope also prevents mount autoFocus).
  useEffect(() => {
    if (!open || variant !== 'search') return

    setSearchTerm('')
    const focusSearch = () => searchInputRef.current?.focus({ preventScroll: true })
    const timeout = window.setTimeout(focusSearch, 0)
    return () => {
      window.clearTimeout(timeout)
    }
  }, [open, variant])

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Determine state based on disabled and error props
  const resolvedState = disabled ? 'disabled' : error ? 'error' : state || 'default'

  const handleValueChange = (val: string) => {
    if (multiSelect) {
      let updatedOptions = [...selectedOptions]

      if (selectedOptions.includes(val)) {
        updatedOptions = updatedOptions.filter((option) => option !== val)
      } else {
        updatedOptions.push(val)
      }

      internalChangeRef.current = true
      setSelectedOptions(updatedOptions)
      onValueChange(updatedOptions.join(','))
    } else {
      onValueChange(val)
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    // If it's multiselect and we're closing due to selection (not outside click)
    if (multiSelect && !isOpen && internalChangeRef.current) {
      internalChangeRef.current = false
      return // Don't close the dropdown
    }

    setOpen(isOpen)
  }

  const isSelected = (val: string) => {
    if (multiSelect) {
      return selectedOptions.includes(val)
    }
    return value === val
  }

  // Initialize selectedOptions from value prop when it changes
  React.useEffect(() => {
    if (value && multiSelect) {
      setSelectedOptions(value.split(','))
    } else if (value) {
      setSelectedOptions([value])
    } else {
      setSelectedOptions([])
    }
  }, [value, multiSelect])

  return (
    <div
      className={cn('select__wrapper', background === 'dark' && 'select__wrapper--dark', className)}
    >
      {label && <label className="select__label">{label}</label>}

      <SelectPrimitive.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <SelectPrimitive.Trigger
          className={cn(
            selectTriggerVariants({
              background,
              size,
              state: resolvedState,
              className: triggerClassName,
            }),
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} className="select__value">
            {(() => {
              const selected = options.find((o) => o.value === value)
              return selected && selected.icon ? (
                <span className="select__item-icon mr-2 align-middle inline-block">
                  {selected.icon}
                </span>
              ) : null
            })()}
            {(() => {
              const selected = options.find((o) => o.value === value)
              return selected ? selected.label : ''
            })()}
          </SelectPrimitive.Value>
          <div className="select__icon-container">
            {open ? (
              <ChevronUp className="select__icon" />
            ) : (
              <ChevronDown className="select__icon" />
            )}
          </div>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'select__content',
              background === 'light' ? 'select__content--light' : 'select__content--dark',
              contentClassName,
            )}
            position="popper"
            sideOffset={4}
          >
            {variant === 'search' && (
              <div className="p-2" onPointerDown={(e) => e.stopPropagation()}>
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search size={16} className="text-[var(--text-placeholder)]" />}
                  hasLeftIcon
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && filteredOptions.length > 0) {
                      e.preventDefault()
                      e.stopPropagation()
                      const firstOption = filteredOptions[0]
                      if (firstOption) {
                        handleValueChange(firstOption.value)
                        if (!multiSelect) {
                          setOpen(false)
                        }
                      }
                    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                      e.preventDefault()
                      const firstItem = document.querySelector('[role="option"]') as HTMLElement
                      if (firstItem) {
                        firstItem.focus()
                      }
                    }
                  }}
                />
              </div>
            )}
            <SelectPrimitive.Viewport className="select__viewport">
              {filteredOptions.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    selectItemVariants({
                      variant,
                      selected: isSelected(option.value),
                      className: itemClassName,
                    }),
                  )}
                  onSelect={(event) => {
                    if (multiSelect) {
                      event.preventDefault()
                      handleValueChange(option.value)
                    }
                  }}
                >
                  <SelectPrimitive.ItemText>
                    {option.icon && (
                      <span className="select__item-icon mr-2 align-middle inline-block">
                        {option.icon}
                      </span>
                    )}
                    {option.label}
                  </SelectPrimitive.ItemText>
                  {variant === 'checkbox' && (
                    <div className={cn(checkboxVariants())}>
                      <div className="flex items-center justify-center">
                        <Check
                          className={cn(
                            checkIconVariants({
                              checked: isSelected(option.value),
                            }),
                          )}
                        />
                      </div>
                    </div>
                  )}
                </SelectPrimitive.Item>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-2 py-1.5 text-sm text-[var(--text-muted)]">No results found</div>
              )}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && (
        <section className="flex items-center gap-2">
          {errorIcon}
          <p className="select__error">{error}</p>
        </section>
      )}
    </div>
  )
}

// Export variant utilities for use in other components
export { selectTriggerVariants, selectItemVariants, checkboxVariants, checkIconVariants }

export default Select
