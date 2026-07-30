import React from 'react'
import { Modal } from '@/components/shared/Modal'
import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
import './ConfirmationModal.css'

export interface ConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onClose?: () => void
  title: string
  message: string
  buttonText?: string
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onOpenChange,
  onClose,
  title,
  message,
  buttonText = 'OK',
}) => {
  const handleClose = () => {
    onOpenChange(false)
    onClose?.()
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onClose={onClose}
      title={title}
      description={message}
      contentClassName="confirmation-modal"
      cancelButtonLabel={undefined}
      confirmButtonLabel={undefined}
    >
      <div className="confirmation-modal__icon">
        <CheckIcon />
      </div>
      <Button
        variant="secondary-light"
       
        className="confirmation-modal__button"
        onClick={handleClose}
      >
        {buttonText}
      </Button>
    </Modal>
  )
}

export default ConfirmationModal
