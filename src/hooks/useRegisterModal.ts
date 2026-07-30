import { useEffect, useRef } from 'react'
import { useModalStore } from '@/state/modalStore'

/**
 * Custom hook to register a modal with the global modal store.
 *
 * This hook automatically handles:
 * - Generating unique modal IDs
 * - Registering/unregistering modals based on the open state
 * - Cleanup on component unmount
 * - Preventing race conditions with asynchronous unregistration
 *
 * @param open - Boolean indicating whether the modal is open
 * @returns The unique modal ID (string | undefined)
 *
 * @example
 * ```typescript
 * const modalId = useRegisterModal(open)
 * ```
 */
export const useRegisterModal = (open: boolean) => {
  const { registerModal, unregisterModal } = useModalStore()
  const modalIdRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    // Generate a unique modal ID if not already set
    if (!modalIdRef.current) {
      modalIdRef.current = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }

    // Cleanup on unmount
    return () => {
      if (modalIdRef.current) {
        unregisterModal(modalIdRef.current)
      }
    }
  }, [unregisterModal])

  // Register/unregister modal with global store
  useEffect(() => {
    if (modalIdRef.current) {
      if (open) {
        registerModal(modalIdRef.current)
      } else {
        // if this is Escape key, delay the unregister to prevent breadcrumb navigation
        setTimeout(() => unregisterModal(modalIdRef.current as string), 0)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return modalIdRef.current
}
