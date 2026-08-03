import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders from and to dates correctly', () => {
    const currentYear = new Date().getFullYear()
    const fromDate = new Date(currentYear, 0, 5) // January 5, current year
    const toDate = new Date(currentYear, 0, 21) // January 21, current year

    render(<DatePicker fromDate={fromDate} toDate={toDate} />)

    // Open the date picker popover
    const triggerButton = screen.getByRole('button', { name: /select date/i })
    fireEvent.click(triggerButton)

    // Navigate to January 2020 with safety timeout
    const prevButton = screen.getByLabelText('Go to the Previous Month')
    let clickCount = 0
    const maxClicks = 12 // Maximum 12 months back should be enough

    // Navigate back until we reach January 2020 or hit safety limit
    while (prevButton.getAttribute('aria-disabled') !== 'true' && clickCount < maxClicks) {
      fireEvent.click(prevButton)
      clickCount++
    }

    // Should now be at January 2020 (the start month for our range)
    expect(prevButton).toHaveAttribute('aria-disabled', 'true')

    // In January 2020, check edge dates
    // Dates before January 5, 2020 should be disabled (1-4)
    const earlyJanuaryDates = ['1', '2', '3', '4']
    earlyJanuaryDates.forEach((date) => {
      const dateCell = screen.getByRole('gridcell', { name: date })
      expect(dateCell).toHaveAttribute('data-disabled', 'true')
    })

    // January 5, 2020 should be enabled (start edge of range)
    const january5 = screen.getByRole('gridcell', { name: '5' })
    expect(january5).not.toHaveAttribute('data-disabled')

    // Dates within the range should be enabled
    const middleRangeDates = ['10', '15', '20']
    middleRangeDates.forEach((date) => {
      const dateCell = screen.getByRole('gridcell', { name: date })
      expect(dateCell).not.toHaveAttribute('data-disabled')
    })

    // January 21, 2020 should be enabled (end edge of range)
    const january21 = screen.getByRole('gridcell', { name: '21' })
    expect(january21).not.toHaveAttribute('data-disabled')

    // Dates after January 21, 2020 should be disabled (22-31)
    const lateJanuaryDates = ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    lateJanuaryDates.forEach((date) => {
      const dateCell = screen.getByRole('gridcell', { name: date })
      expect(dateCell).toHaveAttribute('data-disabled', 'true')
    })
  })
})
