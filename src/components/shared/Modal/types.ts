export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose?: () => void
  children: React.ReactNode
  contentClassName?: string
  title?: string
  description?: string
  cancelButtonLabel?: string
  confirmButtonLabel?: string
  confirmButtonDisabled?: boolean
  onConfirmClick?: () => void
}
