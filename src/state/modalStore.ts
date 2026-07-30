import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ModalStore {
  openModals: Set<string>
  registerModal: (modalId: string) => void
  unregisterModal: (modalId: string) => void
  isAnyModalOpen: () => boolean
}

export const useModalStore = create<ModalStore>()(
  devtools(
    (set, get) => ({
      openModals: new Set(),
      registerModal: (modalId: string) =>
        set(
          (state) => ({
            openModals: new Set([...state.openModals, modalId]),
          }),
          false,
          `registerModal(${modalId})`,
        ),
      unregisterModal: (modalId: string) =>
        set(
          (state) => {
            const newSet = new Set(state.openModals)
            newSet.delete(modalId)
            return { openModals: newSet }
          },
          false,
          `unregisterModal(${modalId})`,
        ),
      isAnyModalOpen: () => get().openModals.size > 0,
    }),
    {
      name: 'Modal Store',
      enabled: process.env.NODE_ENV === 'development',
    },
  ),
)
