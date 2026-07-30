import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Select } from './index'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Interactive',
  component: Select,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#111827' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const ComparisonDemo: Story = {
  render: () => {
    const [standardValue, setStandardValue] = useState<string>('')
    const [checkboxValue, setCheckboxValue] = useState<string>('')
    const [multiStandardValue, setMultiStandardValue] = useState<string>('')
    const [multiCheckboxValue, setMultiCheckboxValue] = useState<string>('')

    const parseSelectedValues = (value: string) => {
      if (!value) return []
      return value.split(',').map((v) => {
        const option = options.find((o) => o.value === v)
        return option ? option.label : v
      })
    }

    return (
      <div className="flex flex-col gap-8 p-8 bg-[var(--surface-canvas)] rounded-[6px] max-w-3xl">
        <h2 className="text-xl font-bold text-white">Select Component Variants Comparison</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-white font-medium">Standard Select</h3>
            <Select
              label="Label"
              placeholder="Select an option"
              options={options}
              value={standardValue}
              onValueChange={setStandardValue}
            />
            <div className="mt-2 text-white text-sm">
              {standardValue ? (
                <span>Selected: {options.find((o) => o.value === standardValue)?.label}</span>
              ) : (
                <span className="opacity-70">No selection</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-medium">Checkbox Select</h3>
            <Select
              label="Label"
              placeholder="Select an option"
              options={options}
              value={checkboxValue}
              onValueChange={setCheckboxValue}
              variant="checkbox"
            />
            <div className="mt-2 text-white text-sm">
              {checkboxValue ? (
                <span>Selected: {options.find((o) => o.value === checkboxValue)?.label}</span>
              ) : (
                <span className="opacity-70">No selection</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-medium">Standard Multi-Select</h3>
            <Select
              label="Label"
              placeholder="Select multiple options"
              options={options}
              value={multiStandardValue}
              onValueChange={setMultiStandardValue}
              multiSelect
            />
            <div className="mt-2">
              {parseSelectedValues(multiStandardValue).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {parseSelectedValues(multiStandardValue).map((label, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#5430C3] text-white"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-white text-sm opacity-70">No selections</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-white font-medium">Checkbox Multi-Select</h3>
            <Select
              label="Label"
              placeholder="Select multiple options"
              options={options}
              value={multiCheckboxValue}
              onValueChange={setMultiCheckboxValue}
              variant="checkbox"
              multiSelect
            />
            <div className="mt-2">
              {parseSelectedValues(multiCheckboxValue).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {parseSelectedValues(multiCheckboxValue).map((label, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#5430C3] text-white"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-white text-sm opacity-70">No selections</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="p-4 bg-[var(--surface-primary)] rounded-md">
            <h3 className="text-white font-medium mb-2">Standard Select Values</h3>
            <div className="space-y-2">
              <div>
                <p className="text-white text-sm opacity-70">Single:</p>
                <p className="text-white text-sm font-[ui-monospace,Menlo,Monaco,monospace]">{standardValue || '""'}</p>
              </div>
              <div>
                <p className="text-white text-sm opacity-70">Multi:</p>
                <p className="text-white text-sm font-[ui-monospace,Menlo,Monaco,monospace]">{multiStandardValue || '""'}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[var(--surface-primary)] rounded-md">
            <h3 className="text-white font-medium mb-2">Checkbox Select Values</h3>
            <div className="space-y-2">
              <div>
                <p className="text-white text-sm opacity-70">Single:</p>
                <p className="text-white text-sm font-[ui-monospace,Menlo,Monaco,monospace]">{checkboxValue || '""'}</p>
              </div>
              <div>
                <p className="text-white text-sm opacity-70">Multi:</p>
                <p className="text-white text-sm font-[ui-monospace,Menlo,Monaco,monospace]">{multiCheckboxValue || '""'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
