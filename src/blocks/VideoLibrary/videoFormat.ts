const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

/**
 * ISO-8601 duration ("PT3M12S") to the source's wording ("3 mins", "1 min").
 */
export const formatDuration = (duration?: string | null): string => {
  if (!duration) return '0 mins'

  const match = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(duration.trim())
  if (!match) return '0 mins'

  const hours = Number(match[1] ?? 0)
  const minutes = Number(match[2] ?? 0)
  const seconds = Number(match[3] ?? 0)
  const total = Math.round(hours * 60 + minutes + seconds / 60)

  return total === 1 ? '1 min' : `${total} mins`
}

/**
 * Formatted on the server, in UTC, so the markup cannot differ between the
 * server render and the client's timezone.
 */
export const formatPublishedDate = (value?: string | null): string => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}
