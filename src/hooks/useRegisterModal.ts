import { useEffect, useRef } from 'react'
import { useModalStore } from '@/state/modalStore'

export const useRegisterModal = (open: boolean) => {
  const { registerModal, unregisterModal } = useModalStore()
  const modalIdRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!modalIdRef.current) {
      modalIdRef.current = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    return () => {
      if (modalIdRef.current) {
        unregisterModal(modalIdRef.current)
      }
    }
  }, [unregisterModal])

  useEffect(() => {
    if (modalIdRef.current) {
      if (open) {
        registerModal(modalIdRef.current)
      } else {
        setTimeout(() => unregisterModal(modalIdRef.current as string), 0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return modalIdRef.current
}
