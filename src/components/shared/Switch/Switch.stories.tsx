import React, { useState } from 'react'
import { Switch } from './index'

export default {
  title: 'Shared/Switch',
  component: Switch,
}

export const Default = () => {
  const [checked, setChecked] = useState(false)
  return <Switch checked={checked} onChange={setChecked} />
}
