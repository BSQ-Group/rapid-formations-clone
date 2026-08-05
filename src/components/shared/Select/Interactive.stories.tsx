import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useEffect } from 'react'
import { Select } from './index'
import { Spinner } from '@/components/shared/Spinner'

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
]

const cityOptions = {
  us: [
    { value: 'nyc', label: 'New York City' },
    { value: 'la', label: 'Los Angeles' },
    { value: 'chi', label: 'Chicago' },
    { value: 'hou', label: 'Houston' },
  ],
  ca: [
    { value: 'tor', label: 'Toronto' },
    { value: 'van', label: 'Vancouver' },
    { value: 'mon', label: 'Montreal' },
    { value: 'cal', label: 'Calgary' },
  ],
  mx: [
    { value: 'mex', label: 'Mexico City' },
    { value: 'gua', label: 'Guadalajara' },
    { value: 'mon', label: 'Monterrey' },
  ],
  uk: [
    { value: 'lon', label: 'London' },
    { value: 'man', label: 'Manchester' },
    { value: 'bir', label: 'Birmingham' },
  ],
  fr: [
    { value: 'par', label: 'Paris' },
    { value: 'mar', label: 'Marseille' },
    { value: 'lyo', label: 'Lyon' },
  ],
  de: [
    { value: 'ber', label: 'Berlin' },
    { value: 'mun', label: 'Munich' },
    { value: 'ham', label: 'Hamburg' },
  ],
  jp: [
    { value: 'tok', label: 'Tokyo' },
    { value: 'osa', label: 'Osaka' },
    { value: 'kyo', label: 'Kyoto' },
  ],
  au: [
    { value: 'syd', label: 'Sydney' },
    { value: 'mel', label: 'Melbourne' },
    { value: 'bri', label: 'Brisbane' },
  ],
  br: [
    { value: 'rio', label: 'Rio de Janeiro' },
    { value: 'sao', label: 'São Paulo' },
    { value: 'bra', label: 'Brasília' },
  ],
  in: [
    { value: 'mum', label: 'Mumbai' },
    { value: 'del', label: 'Delhi' },
    { value: 'ban', label: 'Bangalore' },
  ],
}

const meta: Meta<typeof Select> = {
  title: 'Components/Select/Interactive',
  component: Select,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#111827' }, // gray-900
        { name: 'light', value: '#FFFFFF' },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const DependentSelects: Story = {
  render: () => {
    const [country, setCountry] = useState<string>('')
    const [city, setCity] = useState<string>('')

    useEffect(() => {
      setCity('')
    }, [country])

    return (
      <div className="w-96 p-6 bg-[var(--surface-canvas)] rounded-[6px]">
        <h2 className="text-xl font-bold text-white mb-6">Dependent Selects</h2>
        <div className="space-y-4">
          <Select
            label="Country"
            placeholder="Select a country"
            options={countryOptions}
            value={country}
            onValueChange={setCountry}
          />
          <Select
            label="City"
            placeholder={country ? 'Select a city' : 'Select a country first'}
            options={country ? cityOptions[country as keyof typeof cityOptions] : []}
            value={city}
            onValueChange={setCity}
            disabled={!country}
          />
          {country && city && (
            <div className="mt-6 p-4 bg-[var(--surface-primary)] rounded-[6px] text-white">
              Selected: {countryOptions.find((c) => c.value === country)?.label},{' '}
              {
                cityOptions[country as keyof typeof cityOptions].find((c) => c.value === city)
                  ?.label
              }
            </div>
          )}
        </div>
      </div>
    )
  },
}

export const AsyncLoading: Story = {
  render: () => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>([])
    const [value, setValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const loadOptions = () => {
      setLoading(true)
      setTimeout(() => {
        setOptions([
          { value: 'option1', label: 'Loaded Option 1' },
          { value: 'option2', label: 'Loaded Option 2' },
          { value: 'option3', label: 'Loaded Option 3' },
          { value: 'option4', label: 'Loaded Option 4' },
          { value: 'option5', label: 'Loaded Option 5' },
        ])
        setLoading(false)
      }, 1500)
    }

    return (
      <div className="w-96 p-6 bg-[var(--surface-canvas)] rounded-[6px]">
        <h2 className="text-xl font-bold text-white mb-4">Async Loading Demo</h2>
        <div className="space-y-4">
          <Select
            label="Async Select"
            placeholder={loading ? 'Loading options...' : 'Select an option'}
            options={options}
            value={value}
            onValueChange={setValue}
            disabled={loading}
          />
          {options.length === 0 && (
            <button
              className="w-full py-2 px-4 bg-amethyst text-white rounded-[6px]"
              onClick={loadOptions}
              disabled={loading}
            >
              {loading ? <Spinner fullScreen={false} /> : 'Load Options'}
            </button>
          )}
          {value && (
            <div className="mt-2 p-2 bg-[var(--surface-primary)] rounded-[6px] text-white/70 text-sm">
              Selected: {options.find((opt) => opt.value === value)?.label}
            </div>
          )}
        </div>
      </div>
    )
  },
}

export const CustomStyling: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')

    const options = [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
      { value: 'purple', label: 'Purple' },
      { value: 'orange', label: 'Orange' },
    ]

    const colorMap = {
      red: '#FF5555',
      green: '#55FF55',
      blue: '#5555FF',
      purple: '#AA55FF',
      orange: '#FFAA55',
    }

    return (
      <div className="w-96 p-6 bg-[var(--surface-canvas)] rounded-[6px]">
        <h2 className="text-xl font-bold text-white mb-4">Custom Styling</h2>
        <style jsx global>{`
          .custom-item {
            transition: all 0.2s ease;
            border-radius: 2px;
          }
          .custom-item:hover {
            background-color: rgba(var(--amethyst), 0.4) !important;
          }
          .custom-selected-item {
            background-color: rgba(var(--amethyst), 0.9) !important;
            font-weight: bold;
            border-radius: 2px;
          }
        `}</style>
        <Select
          label="Choose a color"
          placeholder="Select a color"
          options={options}
          value={value}
          onValueChange={setValue}
          itemClassName={
            value === options.find((opt) => opt.value === value)?.value
              ? 'custom-selected-item'
              : 'custom-item'
          }
        />
        {value && (
          <div
            className="mt-4 p-4 rounded-[6px] flex items-center justify-center text-black font-bold"
            style={{ backgroundColor: colorMap[value as keyof typeof colorMap] || '#FFF' }}
          >
            {options.find((opt) => opt.value === value)?.label}
          </div>
        )}
      </div>
    )
  },
}
