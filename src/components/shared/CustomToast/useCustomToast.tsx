import React from 'react'
import { useToast } from '@/components/ui/toast/use-toast'
import { CustomToast } from './CustomToast'

export function useCustomToast() {
  const { toast } = useToast()

  const customToast = {
    success: (description: string, onClose?: () => void) => {
      toast({
        variant: 'custom',
        description: <CustomToast type="success" description={description} onClose={onClose} />,
        className: 'p-0 bg-transparent border-0 shadow-none',
      })
    },

    error: (description: string, onClose?: () => void) => {
      toast({
        variant: 'custom',
        description: <CustomToast type="error" description={description} onClose={onClose} />,
        className: 'p-0 bg-transparent border-0 shadow-none',
      })
    },

    info: (description: string, onClose?: () => void) => {
      toast({
        variant: 'custom',
        description: <CustomToast type="info" description={description} onClose={onClose} />,
        className: 'p-0 bg-transparent border-0 shadow-none',
      })
    },

    warning: (description: string, onClose?: () => void) => {
      toast({
        variant: 'custom',
        description: <CustomToast type="warning" description={description} onClose={onClose} />,
        className: 'p-0 bg-transparent border-0 shadow-none',
      })
    },
  }

  return {
    toast,
    customToast,
  }
}
