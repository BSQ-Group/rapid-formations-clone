export const suggestCompanyNames = async (companyDescription: string, turnstileToken?: string) => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (turnstileToken) headers['Captcha'] = turnstileToken

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL!}/graphql`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: `
        query SuggestCompanyNames($priorQueries: [String!]!) {
          suggestCompanyNames(priorQueries: $priorQueries) {
            suggestions {
              name
              matchType
              isUserPreferred
              isAvailable
            }
          }
        }
      `,
      variables: { priorQueries: [companyDescription] },
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error suggesting company names! status: ${response.status}`)
  }

  const result = await response.json()
  return result.data?.suggestCompanyNames?.suggestions ?? []
}
