// Must stay a browser fetch, not a server action — Cloudflare blocks Vercel's
// serverless egress.
export const sendEmailOrPin = async (
  path: string,
  email: string,
  otp?: string,
): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Brand: process.env.NEXT_PUBLIC_API_BRAND!,
      },
      body: JSON.stringify({
        email,
        ...(otp ? { otp } : {}),
      }),
    })

    if (response.ok) {
      const data = response.status === 202 ? true : await response.json()
      return { ok: true, data }
    }

    const body = await response.text().catch(() => '')
    return {
      ok: false,
      error: `${response.status}: ${body || response.statusText}`,
    }
  } catch (error) {
    return {
      ok: false,
      error: (error as Error).message || 'Network request failed',
    }
  }
}
