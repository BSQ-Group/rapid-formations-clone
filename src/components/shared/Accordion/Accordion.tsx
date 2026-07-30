import React from 'react'
import {
  Accordion as AccordionRoot,
  AccordionItem as AccordionItemUI,
  AccordionTrigger as AccordionTriggerUI,
} from '@/components/ui/accordion'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '@/utilities/ui'
import './Accordion.css'

type RadixRootProps = React.ComponentProps<typeof AccordionPrimitive.Root>
type RadixSingleProps = Extract<RadixRootProps, { type?: 'single' | undefined }>
type RadixMultipleProps = Extract<RadixRootProps, { type: 'multiple' }>

export type AccordionPropsSingle = Omit<RadixSingleProps, 'type'> & { type?: 'single' }
export type AccordionPropsMultiple = Omit<RadixMultipleProps, 'type'> & { type: 'multiple' }
export type AccordionProps = AccordionPropsSingle | AccordionPropsMultiple

export function Accordion(props: AccordionPropsSingle): React.JSX.Element
export function Accordion(props: AccordionPropsMultiple): React.JSX.Element
export function Accordion(props: AccordionProps): React.JSX.Element {
  if ('type' in props && props.type === 'multiple') {
    const { className, type: _omitted, ...others } = props as AccordionPropsMultiple
    return <AccordionRoot type="multiple" className={cn('accordion', className)} {...others} />
  }

  const { className, type: _omitted, ...others } = props as AccordionPropsSingle
  return <AccordionRoot type="single" className={cn('accordion', className)} {...others} />
}

export type AccordionItemProps = React.ComponentProps<typeof AccordionItemUI>
export function AccordionItem({ className, ...props }: AccordionItemProps): React.JSX.Element {
  return <AccordionItemUI className={cn('accordion__item', className)} {...props} />
}

export type AccordionTriggerProps = React.ComponentProps<typeof AccordionTriggerUI>
export function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionTriggerProps): React.JSX.Element {
  return (
    <AccordionTriggerUI className={cn('accordion__trigger', className)} {...props}>
      {children}
    </AccordionTriggerUI>
  )
}

export type AccordionContentProps = React.ComponentProps<typeof AccordionPrimitive.Content>
export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps): React.JSX.Element {
  return (
    <AccordionPrimitive.Content className={cn('accordion__content')} {...props}>
      <div className={cn('accordion__content-inner', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export default Accordion
