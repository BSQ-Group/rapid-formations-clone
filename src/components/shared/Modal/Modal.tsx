'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ModalProps } from './types'
import { useRegisterModal } from '@/hooks/useRegisterModal'
import './Modal.css'

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  onClose,
  children,
  contentClassName = '',
  title,
  description,
  cancelButtonLabel,
  confirmButtonLabel,
  confirmButtonDisabled = false,
  onConfirmClick,
}) => {
  useRegisterModal(open)

  const handleClose = () => {
    onClose?.()
    onOpenChange(false)
  }

  const renderFooter = () => {
    if (!cancelButtonLabel && !confirmButtonLabel) return null

    return (
      <DialogFooter className="modal__footer mt-6">
        {cancelButtonLabel && (
          <DialogClose asChild>
            <Button variant="secondary-light" type="button">
              {cancelButtonLabel}
            </Button>
          </DialogClose>
        )}
        {confirmButtonLabel && (
          <Button
            variant="primary"
            type="button"
            onClick={onConfirmClick}
            disabled={confirmButtonDisabled}
            className="!ml-0"
          >
            {confirmButtonLabel}
          </Button>
        )}
      </DialogFooter>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`modal ${contentClassName}`}>
        {(title || description) && (
          <DialogHeader className="modal__header">
            {title && <DialogTitle className="modal__title">{title}</DialogTitle>}
            {description && <p className="modal__description">{description}</p>}
          </DialogHeader>
        )}
        {!description && title && (
          <DialogDescription className="sr-only">{title}</DialogDescription>
        )}
        {children}
        {renderFooter()}
      </DialogContent>
    </Dialog>
  )
}
