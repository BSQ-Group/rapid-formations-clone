import { decodeEntities } from '@/components/shared/Text/sanitize'

export const capitalise = (str?: string) => {
  if (!str) return null
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const camelToHyphen = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

export const curlyToEm = (str: string) => {
  return str.replaceAll('{', '<em>').replaceAll('}', '</em>')
}

/**
 * Strip all HTML tags and decode entities to produce plain text. For arbitrary
 * HTML inputs (e.g. WordPress excerpts/titles) used in plain-text contexts:
 * `<img alt>`, word counts, or feeding the Text component (which only allows
 * a small set of inline tags via its sanitizeHtml and would render disallowed
 * tags as escaped literals).
 */
export const stripHtml = (html: string): string =>
  decodeEntities(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()

/** Estimate reading time for a chunk of HTML at ~200 words/minute, minimum 1 minute. */
export const readingTime = (html: string): string => {
  const words = stripHtml(html).split(' ').filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))}m`
}

export const breakIntoArray = (str?: string) => {
  if (typeof str !== 'string') return undefined
  return str.split(' ')
}

export const formatOfficerName = (
  name:
    | string
    | {
        title?: string
        firstname?: string
        middlename?: string
        surname?: string
        __typename?: string
      },
): string => {
  if (typeof name === 'string') {
    return name
  }
  return [name.title, name.firstname, name.middlename, name.surname].filter(Boolean).join(' ')
}

// Format date (assuming incorporatedOn is in ISO format)
export const formatDateISO = (dateString?: string | null) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const formatDateDDMMYYYY = (dateString?: string | null) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const formatDateShortMonth = (dateString?: string | null) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const formatDateShortMonthGB = (dateString?: string | null) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const formatDate = (unixSeconds?: number) => {
  if (!unixSeconds) return 'Unknown date'

  try {
    const date = new Date(unixSeconds * 1000)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch (_) {
    return 'Invalid date'
  }
}

export const formatTime = (unixSeconds?: number) => {
  if (!unixSeconds) return 'Unknown time'

  try {
    const date = new Date(unixSeconds * 1000)
    return date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .toLowerCase()
  } catch (_) {
    return 'Unknown time'
  }
}

/**
 * Format TTL value from seconds to human-readable format
 * @param ttlSeconds TTL value in seconds
 * @returns Formatted TTL string (e.g., "3.6 sec", "1 sec", "1h", "30 min", "1h 30 min")
 */
export const formatTTL = (ttlSeconds?: number): string => {
  if (!ttlSeconds || ttlSeconds <= 0) return '0sec'

  // Helper function to format seconds with conditional decimal
  const formatSeconds = (seconds: number): string => {
    return seconds % 1 === 0 ? `${Math.floor(seconds)}sec` : `${seconds.toFixed(1)}sec`
  }

  if (ttlSeconds < 60) {
    // Show decimal seconds for values less than 1 minute
    return formatSeconds(ttlSeconds)
  }

  if (ttlSeconds < 3600) {
    const minutes = Math.floor(ttlSeconds / 60)
    const seconds = ttlSeconds % 60
    if (seconds === 0) {
      return `${minutes}min`
    }
    return `${minutes}min ${formatSeconds(seconds)}`
  }

  const hours = Math.floor(ttlSeconds / 3600)
  const minutes = Math.floor((ttlSeconds % 3600) / 60)
  const seconds = ttlSeconds % 60

  if (minutes === 0 && seconds === 0) {
    return `${hours}h`
  }

  if (minutes === 0) {
    return `${hours}h ${formatSeconds(seconds)}`
  }

  if (seconds === 0) {
    return `${hours}h ${minutes}min`
  }

  return `${hours}h ${minutes}min ${formatSeconds(seconds)}`
}
