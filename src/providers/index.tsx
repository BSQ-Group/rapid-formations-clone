import React from 'react'
import { MixpanelProvider } from './MixpanelProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <MixpanelProvider>{children}</MixpanelProvider>
}
