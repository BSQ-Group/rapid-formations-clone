import { cn } from '@/utilities/ui'
import { LoaderCircle } from 'lucide-react'
import './Spinner.css'

type SpinnerProps = {
  className?: string
  fullScreen?: boolean
  withBackground?: boolean
}

export const Spinner = ({ className, fullScreen = true, withBackground = true }: SpinnerProps) => {
  return (
    <div
      className={cn('spinner-container', className, {
        'spinner-container--full-screen': fullScreen,
      })}
    >
      <div
        className={cn('spinner__icon-wrapper', {
          'spinner__icon-wrapper--with-background': withBackground,
        })}
      >
        <LoaderCircle className="spinner__icon" size={40} />
      </div>
    </div>
  )
}
