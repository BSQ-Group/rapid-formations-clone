import { Text } from '@/components/shared'
import { cn } from '@/utilities/ui'
import './ProgressBar.css'

type ProgressBarProps = {
  label: string
  value: number
  total: number
  suffix?: string
  className?: string
}

const formatValue = (value: number): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const ProgressBar = ({ label, value, total, suffix = '', className }: ProgressBarProps) => {
  const percentage = Math.min((value / total) * 100, 100)

  return (
    <div className={cn('progress-bar', className)}>
      <Text text={label} textStyle="body-sm" className="progress-bar__label" />
      <div className="progress-bar__track">
        <div className="progress-bar__fill" style={{ width: `${percentage}%` }} />
      </div>
      <Text
        text={`${formatValue(value)}${suffix}`}
        textStyle="body-sm"
        className="progress-bar__value"
      />
    </div>
  )
}
