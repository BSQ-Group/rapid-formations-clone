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
import type { DocumentSection } from '@/utilities/shortcodes'
import { styles } from './DocumentsListDialog.styles'

export const DocumentsListDialog: React.FC<{
  label: string
  sections: DocumentSection[]
  className?: string
}> = ({ label, sections, className }) => (
  <Dialog>
    <DialogTrigger className={className}>{label}</DialogTrigger>
    <DialogContent className={styles.panel} overlayClassName={styles.overlay} hideClose>
      <DialogTitle className="sr-only">Full list of documents available</DialogTitle>
      <div className={styles.closeWrap}>
        <DialogClose className={styles.close}>
          <FaIcon icon={faTimes} className={styles.closeIcon} />
          <span className="sr-only">Close</span>
        </DialogClose>
      </div>
      <div className={styles.flow}>
        {sections.map((section) => (
          <React.Fragment key={section.title}>
            <Text as="h3" textStyle="span" text={section.title} className={styles.sectionTitle} />
            {section.groups.map((group) => (
              <React.Fragment key={group.title}>
                <Text as="h4" textStyle="span" text={group.title} className={styles.groupTitle} />
                <ul className={styles.list}>
                  {group.documents.map((document) => (
                    <li key={document} className={styles.item}>
                      {document}
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </DialogContent>
  </Dialog>
)
