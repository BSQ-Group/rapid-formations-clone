'use client'

import React from 'react'
import { faTimes } from '@fortawesome/pro-light-svg-icons/faTimes'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { styles } from './EligibleCountriesDialog.styles'

export const EligibleCountriesDialog: React.FC<{
  label: string
  lastUpdated?: string | null
  countries: string[]
  className?: string
}> = ({ label, lastUpdated, countries, className }) => (
  <Dialog>
    <DialogTrigger className={className}>{label}</DialogTrigger>
    <DialogContent className={styles.content} overlayClassName={styles.overlay} hideClose>
      <div className={styles.closeWrap}>
        <DialogClose className={styles.close}>
          <FaIcon icon={faTimes} className={styles.closeIcon} />
          <span className="sr-only">Close</span>
        </DialogClose>
      </div>
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
