// Do not prepend a base URL: Next.js 16's remotePatterns blocks private IPs, so
// local paths must stay relative to be optimized as local.
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${url}?${cacheTag}` : url
}
