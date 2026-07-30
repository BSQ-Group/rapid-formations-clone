'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

type IconProps = {
  data: Record<string, any>
  [key: string]: any
}

const Icon = ({ data, ...props }: IconProps) => {
  if (!data) return null
  const { url, dynamicSVG } = data
  const isAnimated = props?.initial || props?.animate || props?.variants

  const IconWrapper = isAnimated ? motion.span : 'span'

  return dynamicSVG ? (
    <IconWrapper dangerouslySetInnerHTML={{ __html: dynamicSVG }} {...props} />
  ) : (
    <IconWrapper {...props}>
      <Image src={url} alt="icon" width={42} height={42} />
    </IconWrapper>
  )
}

export default Icon
