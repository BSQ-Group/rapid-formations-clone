'use client'

import React from 'react'
import { Switch as UISwitch } from '../../ui/switch'
import './Switch.css'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  id,
}) => {
  return (
    <UISwitch
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      className={className}
    />
  )
}

export { Switch }
