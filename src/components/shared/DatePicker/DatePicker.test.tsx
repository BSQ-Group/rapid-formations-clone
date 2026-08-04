import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders from and to dates correctly', () => {
    const currentYear = new Date().getFullYear()
    const fromDate = new Date(currentYear, 0, 5) // January 5, current year
    const toDate = new Date(currentYear, 0, 21) // January 21, current year

    render(<DatePicker fromDate={fromDate} toDate={toDate} />)

    const triggerButton = screen.getByRole('button', { name: /select date/i })
    fireEvent.click(triggerButton)

    const prevButton = screen.getByLabelText('Go to the Previous Month')
    let clickCount = 0
    const maxClicks = 12 // Maximum 12 months back should be enough

    while (prevButton.getAttribute('aria-disabled') !== 'true' && clickCount < maxClicks) {
      fireEvent.click(prevButton)
      clickCount++
    }

    expect(prevButton).toHaveAttribute('aria-disabled', 'true')

    const earlyJanuaryDates = ['1', '2', '3', '4']
    earlyJanuaryDates.forEach((date) => {
      const dateCell = screen.getByRole('gridcell', { name: date })
      expect(dateCell).toHaveAttribute('data-disabled', 'true')
    })

    const january5 = screen.getByRole('gridcell', { name: '5' })
    expect(january5).not.toHaveAttribute('data-disabled')

    const middleRangeDates = ['10', '15', '20']
    middleRangeDates.forEach((date) => {
      const dateCell = screen.getByRole('gridcell', { name: date })
      expect(dateCell).not.toHaveAttribute('data-disabled')
    })

    const january21 = screen.getByRole('gridcell', { name: '21' })
    expect(january21).not.toHaveAttribute('data-disabled')

    const lateJanuaryDates = ['22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
    lateJanuaryDates.forEach((date) => {
      const dateCell = screen.getByRole('gridcell', { name: date })
      expect(dateCell).toHaveAttribute('data-disabled', 'true')
    })
  })
})
