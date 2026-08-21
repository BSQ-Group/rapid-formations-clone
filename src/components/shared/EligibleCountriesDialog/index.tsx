'use client'

import React from 'react'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Text from '@/components/shared/Text'
import { styles } from './EligibleCountriesDialog.styles'

export const EligibleCountriesDialog: React.FC<{
  label: string
  lastUpdated?: string | null
  countries: string[]
}> = ({ label, lastUpdated, countries }) => (
  <Dialog>
    <DialogTrigger className={styles.trigger}>{label}</DialogTrigger>
    <DialogContent className={styles.content}>
      {lastUpdated && (
        <Text
          textStyle="body-base"
          text={`Last updated: ${lastUpdated}`}
          className={styles.updated}
        />
      )}
      <div className={styles.scroller}>
        <DialogTitle className={styles.heading} asChild>
          <Text as="h3" textStyle="span" text="Check your country is eligible" />
        </DialogTitle>
        <Text
          as="p"
          textStyle="body-base"
          text="We can register companies for customers from most countries in the world. Check if your country is eligible."
          className={styles.intro}
        />
        <ul className={styles.list}>
          {countries.map((country) => (
            <li key={country} className={styles.item}>
              {country}
            </li>
          ))}
        </ul>
      </div>
    </DialogContent>
  </Dialog>
)
