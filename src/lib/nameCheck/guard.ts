const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 30

const hits = new Map<string, { count: number; resetAt: number }>()

export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('Origin')
  if (!origin) return true

  try {
    return new URL(origin).host === new URL(req.url).host
  } catch {
    return false
  }
}

export function withinRateLimit(req: Request, now: number): boolean {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const entry = hits.get(ip)

  if (!entry || now >= entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    pruneExpired(now)
    return true
  }

  entry.count += 1
  return entry.count <= MAX_PER_WINDOW
}

function pruneExpired(now: number): void {
  if (hits.size < 1_000) return
  for (const [ip, entry] of hits) {
    if (now >= entry.resetAt) hits.delete(ip)
  }
}

export function resetRateLimit(): void {
  hits.clear()
}

export { MAX_PER_WINDOW, WINDOW_MS }
