import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Pagination } from '../'

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 0,
    totalNrOfResults: 100,
    pageSize: 10,
    onPageChange: vi.fn(),
    className: 'test-class',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with default props', () => {
    render(<Pagination {...defaultProps} />)

    expect(screen.getByRole('link', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '2' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '3' })).toBeInTheDocument()

    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
  })

  it('shows correct active page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)

    const activePage = screen.getByRole('link', { name: '2' })
    expect(activePage).toHaveAttribute('aria-current', 'page')
  })

  it('handles next page navigation correctly', () => {
    render(<Pagination {...defaultProps} />)

    fireEvent.click(screen.getByLabelText('Go to next page'))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1)
  })

  it('handles previous page navigation correctly', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)

    fireEvent.click(screen.getByLabelText('Go to previous page'))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(0)
  })

  it('shows ellipsis for many pages', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalNrOfResults={200} />)

    const ellipses = screen.getAllByText('More pages', { selector: '.sr-only' })
    expect(ellipses).toHaveLength(2)
  })

  it('prevents navigation beyond boundaries', () => {
    render(<Pagination {...defaultProps} currentPage={0} />)

    fireEvent.click(screen.getByLabelText('Go to previous page'))
    expect(defaultProps.onPageChange).not.toHaveBeenCalled()
  })

  it('handles last page correctly', () => {
    render(<Pagination {...defaultProps} currentPage={9} totalNrOfResults={100} pageSize={10} />)

    fireEvent.click(screen.getByLabelText('Go to next page'))
    expect(defaultProps.onPageChange).not.toHaveBeenCalled()
  })

  it('renders nothing when there are no results', () => {
    const { container } = render(<Pagination {...defaultProps} totalNrOfResults={0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('applies custom className', () => {
    const { container } = render(<Pagination {...defaultProps} className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('handles direct page number clicks', () => {
    render(<Pagination {...defaultProps} currentPage={0} />)

    fireEvent.click(screen.getByRole('link', { name: '2' }))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1)
  })

  it('shows correct page range for middle pages', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalNrOfResults={200} />)

    expect(screen.getByRole('link', { name: '5' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '6' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '7' })).toBeInTheDocument()
  })
})
