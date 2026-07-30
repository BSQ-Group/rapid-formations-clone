export const checkCompany = async (companyName: string, turnstileToken?: string) => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (turnstileToken) headers['Captcha'] = turnstileToken

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        query IsCompanyNameAvailable($name: String!) {
          isCompanyNameAvailable(name: $name) {
            isAvailable
          }
        }
      `,
      variables: { name: companyName },
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error checking company name availability! status: ${response.status}`)
  }

  const result = await response.json()
  if (result.errors?.length) {
    throw new Error(result.errors[0]?.message ?? 'Something went wrong. Please try again.')
  }
  return result.data?.isCompanyNameAvailable?.isAvailable ?? false
}
