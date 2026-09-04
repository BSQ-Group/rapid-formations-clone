'use client'

import React from 'react'

import type { Staff } from '@/payload-types'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { meetTheTeamStyles as s } from './MeetTheTeam.styles'

export type MemberCardProps = {
  fullName: string
  jobTitle: string
  photo: Staff['photo'] | null
  facts?: { id?: string | null; label: string; value: string }[] | null
}

export const MemberCard: React.FC<MemberCardProps> = ({ fullName, jobTitle, photo, facts }) => {
  const image = photo && typeof photo === 'object' ? photo : null
  const rows = (facts ?? []).filter((fact) => fact.label && fact.value)

  return (
    <Dialog>
      <DialogTrigger className={s.card}>
        <span className={s.photo}>
          {image ? (
            <Media
              resource={image}
              alt={`Profile of ${fullName}`}
              htmlElement={null}
              pictureClassName={s.photoPicture}
              imgClassName={s.photoImage}
              size={s.photoSizes}
              loading="lazy"
            />
          ) : null}
        </span>
        <span className={s.body}>
          <Text as="h3" textStyle="span" text={fullName} className={s.name} />
          <Text textStyle="span" text={jobTitle} className={s.jobTitle} />
        </span>
      </DialogTrigger>
      <DialogContent className={s.dialog} overlayClassName={s.dialogOverlay}>
        <div className={s.dialogScroller}>
          <div className={s.dialogPhoto}>
            {image ? (
              <Media
                resource={image}
                alt={`Profile of ${fullName}`}
                htmlElement={null}
                pictureClassName={s.dialogPhotoPicture}
                imgClassName={s.dialogPhotoImage}
                size={s.dialogPhotoSizes}
              />
            ) : null}
          </div>
          <div className={s.dialogContent}>
            <DialogTitle className={s.dialogName} asChild>
              <Text as="h2" textStyle="span" text={fullName} />
            </DialogTitle>
            <DialogDescription className={s.dialogJobTitle} asChild>
              <Text as="p" textStyle="span" text={jobTitle} />
            </DialogDescription>
            {rows.length ? (
              <ul className={s.dialogList}>
                {rows.map((fact) => (
                  <li key={fact.id ?? fact.label}>
                    <Text
                      as="span"
                      textStyle="span"
                      text={fact.label}
                      className={s.dialogFactLabel}
                    />
                    <Text as="span" textStyle="span" text={`: ${fact.value}`} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
