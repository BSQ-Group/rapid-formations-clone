import { isSameOrigin, withinRateLimit } from '@/lib/nameCheck/guard'
import {
  describe,
  ERROR_DESCRIPTION,
  ERROR_NAME,
  type NameCheckVerdict,
} from '@/lib/nameCheck/verdict'

const EFILING_HOST = 'client.rapidformations.co.uk'
const TIMEOUT_MS = 8_000

async function upstreamVerdict(name: string): Promise<NameCheckVerdict> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(
      `https://${EFILING_HOST}/ejax-name-check?gle=name-check&name=${encodeURIComponent(name)}`,
      {
        headers: {
          Referer: `https://${EFILING_HOST}`,
          Accept: 'application/json, text/plain, */*',
        },
        signal: controller.signal,
        cache: 'no-store',
      },
    )
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) throw new Error(`ejax-name-check returned ${response.status}`)

  const body = await response.text()
  if (!body.trimStart().startsWith('{')) {
    throw new Error(`ejax-name-check rejected: ${body.slice(0, 80)}`)
  }

  const verdict: NameCheckVerdict = JSON.parse(body)
  if (!verdict.NameStatus) throw new Error('ejax-name-check returned no NameStatus')

  return verdict
}

export async function POST(req: Request): Promise<Response> {
  if (!isSameOrigin(req)) {
    return Response.json({ error: 'Cross-origin requests are not allowed' }, { status: 403 })
  }

  if (!withinRateLimit(req, Date.now())) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const name = (body as Record<string, unknown>)?.name

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return Response.json({ error: 'name is required' }, { status: 400 })
  }

  const trimmedName = name.trim()

  try {
    const verdict = await upstreamVerdict(trimmedName)
    return Response.json(describe(verdict, trimmedName))
  } catch {
    return Response.json(
      { name: ERROR_NAME, available: false, description: ERROR_DESCRIPTION },
      { status: 503 },
    )
  }
}
