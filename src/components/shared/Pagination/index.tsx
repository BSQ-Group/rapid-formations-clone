import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import './Pagination.css'
import { cn } from '@/utilities/ui'

interface PaginationProps {
  className?: string
  currentPage: number
  totalNrOfResults: number
  pageSize: number
  onPageChange: (page: number) => void
  maxPageButtons?: number
}

export function Pagination({
  className,
  currentPage,
  totalNrOfResults,
  pageSize,
  onPageChange,
  maxPageButtons = 5,
}: PaginationProps) {
  const totalPages = Math.ceil(totalNrOfResults / pageSize)
  const pages = Array.from({ length: totalPages }, (_, i) => i)
  const maxButtons = Math.min(maxPageButtons, totalPages)
  const halfButtons = Math.floor(maxButtons / 2)

  const showEllipsisStart = currentPage > halfButtons + 1
  const showEllipsisEnd = currentPage < totalPages - halfButtons - 2

  const getVisiblePages = () => {
    if (totalPages <= maxButtons) return pages

    if (currentPage <= halfButtons) {
      return pages.slice(0, maxButtons)
    }

    if (currentPage >= totalPages - halfButtons - 1) {
      return pages.slice(totalPages - maxButtons)
    }

    // For middle range: show maxButtons buttons centered around currentPage
    // For even maxButtons, show one less before and one more after (or vice versa)
    const buttonsBefore = Math.floor((maxButtons - 1) / 2)
    const buttonsAfter = Math.ceil((maxButtons - 1) / 2)
    const start = currentPage - buttonsBefore
    const end = currentPage + buttonsAfter + 1
    return pages.slice(start, end)
  }

  if (totalNrOfResults === 0) {
    return null
  }

  return (
    <PaginationRoot className={cn('pagination', className)}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 0}
            className={currentPage === 0 ? 'pointer-events-none opacity-50' : ''}
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 0) onPageChange(currentPage - 1)
            }}
          />
        </PaginationItem>

        {showEllipsisStart && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(0)
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {getVisiblePages().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              isActive={currentPage === pageNum}
              onClick={(e) => {
                e.preventDefault()
                onPageChange(pageNum)
              }}
            >
              {pageNum + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {showEllipsisEnd && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(totalPages - 1)
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage >= totalPages - 1}
            className={currentPage >= totalPages - 1 ? 'pointer-events-none opacity-50' : ''}
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages - 1) onPageChange(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  )
}
