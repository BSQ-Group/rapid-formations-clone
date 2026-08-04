'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { Input } from '@/components/shared/Input'
import { cn } from '@/utilities/ui'
import './Slider.css'

interface SliderProps extends Omit<
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  'value' | 'onValueChange' | 'defaultValue'
> {
  label?: string
  showValue?: boolean
  className?: string
  children?: React.ReactNode
  minValue?: number
  maxValue?: number
  total?: number
  value?: number
  defaultValue?: number
  disabled?: boolean
  onValueChange?: (value: number) => void
}

export const Slider: React.FC<SliderProps> = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      label,
      minValue,
      maxValue,
      total = 100,
      showValue = true,
      defaultValue,
      value,
      disabled = false,
      onValueChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = React.useState(value ?? defaultValue ?? 0)
    const [inputValue, setInputValue] = React.useState(String(value ?? defaultValue ?? 0))
    const percentageRef = React.useRef<HTMLSpanElement>(null)
    const trackRef = React.useRef<HTMLDivElement>(null)

    const calculatePercentage = React.useCallback(
      (val: number) => {
        const percentage = Math.round((val / total) * 100)
        return Math.min(percentage, 100) // Ensure percentage never exceeds 100%
      },
      [total],
    )

    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return

      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return

      const position = e.clientX - rect.left
      const percentage = position / rect.width
      const newValue = Math.round(percentage * total)

      updateValue(newValue)
    }

    const updatePercentagePosition = React.useCallback(() => {
      if (percentageRef.current) {
        const percentage = calculatePercentage(localValue)
        percentageRef.current.style.setProperty('--percentage-left', `${percentage}%`)
      }
    }, [localValue, calculatePercentage])

    const updateValue = (newValue: number) => {
      const min = minValue ?? 0
      const max = maxValue ?? total
      const safeValue = Math.max(min, Math.min(max, newValue))

      setLocalValue(safeValue)
      setInputValue(String(safeValue))
      onValueChange?.(safeValue)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      setInputValue(e.target.value)

      const numericValue = Number(e.target.value)
      if (!isNaN(numericValue)) {
        updateValue(numericValue)
      }
    }

    const handleInputBlur = () => {
      if (disabled) return

      const numericValue = Number(inputValue)
      if (isNaN(numericValue)) {
        setInputValue(String(localValue))
      } else {
        updateValue(numericValue)
      }
    }

    const handleSliderChange = (values: number[]) => {
      if (disabled) return
      const firstValue = values[0]
      if (firstValue !== undefined) {
        updateValue(firstValue)
      }
    }

    React.useEffect(() => {
      if (value !== undefined) {
        setLocalValue(value)
        setInputValue(String(value))
      }
    }, [value])

    React.useEffect(() => {
      updatePercentagePosition()
    }, [updatePercentagePosition])

    return (
      <div className={cn('slider', className)}>
        <div className={cn('slider__wrapper', disabled && 'slider__wrapper--disabled')}>
          <div className="slider__content">
            <div className="slider__track-container">
              {label && (
                <div className="slider__label-group">
                  <label className={cn('slider__label', disabled && 'slider__label--disabled')}>
                    {label}
                  </label>
                </div>
              )}
              <SliderPrimitive.Root
                ref={ref}
                min={0}
                max={total}
                value={[localValue]}
                onValueChange={handleSliderChange}
                disabled={disabled}
                className={cn('slider__container')}
                {...props}
              >
                <SliderPrimitive.Track
                  ref={trackRef}
                  className={cn('slider__track', disabled && 'slider__track--disabled')}
                  onClick={handleTrackClick}
                >
                  <SliderPrimitive.Range
                    className={cn('slider__range', disabled && 'slider__range--disabled')}
                  />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                  className={cn('slider__thumb', disabled && 'slider__thumb--disabled')}
                />
              </SliderPrimitive.Root>
              {showValue && (
                <span
                  className={cn(
                    'slider__percentage',
                    label && 'slider__percentage--with-label',
                    disabled && 'slider__percentage--disabled',
                  )}
                  ref={percentageRef}
                >
                  {calculatePercentage(localValue)}%
                </span>
              )}
            </div>
            <div className="slider__input-wrapper">
              <Input
                type="number"
                min={0}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                disabled={disabled}
                className={cn('slider__input')}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    )
  },
)

Slider.displayName = 'Slider'
