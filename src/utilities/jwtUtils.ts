interface JWTPayload {
  exp?: number
  [key: string]: unknown
}

const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.warn('Failed to decode JWT token:', error)
    return null
  }
}

export const isTokenExpired = (token: string): boolean | null => {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) return null

  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}
