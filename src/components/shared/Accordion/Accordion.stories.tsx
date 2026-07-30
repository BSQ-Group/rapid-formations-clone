import type { Meta, StoryObj } from '@storybook/react'
import { Shield, FileText, Lock, Users } from 'lucide-react'
import Accordion, { AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A collapsible accordion component that integrates with shadcn/ui and follows the design system. Use the Theme switcher in the toolbar to see different brand themes.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

const headerClass = 'flex flex-col sm:flex-row items-start gap-3 w-full flex-1'
const iconContainerClass =
  'flex-shrink-0 w-12 h-12 bg-[var(--surface-primary)] rounded-[6px] flex items-center justify-center text-white'
const contentClass = 'flex-1 min-w-0'
const titleClass = 'font-semibold text-white mb-1'
const descriptionClass = '!text-sm font-normal text-[var(--text-inverse-muted)]'

export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className={headerClass}>
              <div className={iconContainerClass}>
                <Shield className="w-6 h-6" />
              </div>
              <div className={contentClass}>
                <h3 className={titleClass}>Non-Disclosure Agreements (Commercial)</h3>
                <p className={descriptionClass}>
                  Protect your business&#39;s sensitive and confidential information with NDAs for
                  use during preliminary commercial negotiations.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>Example content for item 1</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className={headerClass}>
              <div className={iconContainerClass}>
                <Users className="w-6 h-6" />
              </div>
              <div className={contentClass}>
                <h3 className={titleClass}>Employment Contracts</h3>
                <p className={descriptionClass}>
                  Standard employment agreements and contracts for hiring.
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>Example content for item 2</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  render: () => (
    <div className="w-[640px]">
      <Accordion type="multiple" defaultValue={['a']}>
        <AccordionItem value="a">
          <AccordionTrigger>
            <div className="accordion__header">
              <div className="accordion__icon">
                <FileText className="w-6 h-6" />
              </div>
              <div className="accordion__content">
                <h3 className="accordion__title">Policy Documents</h3>
                <p className="accordion__description">Company policies and guidelines.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>Content for A</div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>
            <div className="accordion__header">
              <div className="accordion__icon">
                <Lock className="w-6 h-6" />
              </div>
              <div className="accordion__content">
                <h3 className="accordion__title">Privacy Policy</h3>
                <p className="accordion__description">Comprehensive privacy policy templates.</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>Content for B</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}
