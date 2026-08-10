import { ERROR_DESCRIPTION, ERROR_NAME, type NameCheckOutcome } from '@/lib/nameCheck/verdict'

export const checkCompany = async (companyName: string): Promise<NameCheckOutcome> => {
  const response = await fetch('/api/name-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: companyName }),
  })

  const result = (await response.json().catch(() => null)) as Partial<NameCheckOutcome> | null

  if (!result || typeof result.description !== 'string') {
    return { name: ERROR_NAME, available: false, description: ERROR_DESCRIPTION }
  }

  return {
    name: result.name || companyName,
    available: Boolean(result.available),
    description: result.description,
  }
}
