import type { CountryCode } from './types'
import parsePhoneNumber from 'libphonenumber-js'

/**
 * Get the country calling code for a given country code
 * @param countryCode ISO 3166-1 alpha-2 country code
 * @param countryCodeList List of country codes and their calling codes
 * @returns The calling code for the given country
 */
export function getCountryCallingCode(countryCode: string, countryCodeList: CountryCode[]): string {
  const country = countryCodeList.find((c) => c.code === countryCode)
  return country?.dialCode || '44' // Default to UK (+44) if not found
}

/**
 * Parse a phone number to extract country code and telephone number
 * @param phoneNumber The phone number to parse
 * @returns Object containing countryCode (with +) and telephone number
 */
export function parsePhoneNumberParts(phoneNumber: string): {
  countryCode: string
  telephone: string
} {
  try {
    // Check if the phone number starts with a + (international format)
    const isInternational = phoneNumber.trim().startsWith('+')

    // Parse the phone number
    let parsedNumber = parsePhoneNumber(phoneNumber)

    // If parsing fails and it's not international, try with UK country code
    if ((!parsedNumber || !parsedNumber.isValid()) && !isInternational) {
      parsedNumber = parsePhoneNumber(phoneNumber, { defaultCountry: 'GB' })
    }

    if (!parsedNumber || !parsedNumber.isValid()) {
      // If parsing fails, return default values
      console.log('Parsing failed number: ', phoneNumber)
      return {
        countryCode: '+44',
        telephone: phoneNumber,
      }
    }

    // Extract country code and national number
    const countryCode = `+${parsedNumber.countryCallingCode}`
    const telephone = parsedNumber.nationalNumber

    return {
      countryCode,
      telephone,
    }
  } catch (error) {
    // If any error occurs, return default values
    console.log('Error parsing phone number: ', phoneNumber, ' error: ', error)
    return {
      countryCode: '+44',
      telephone: phoneNumber,
    }
  }
}

/**
 * Format a phone number for display using libphonenumber-js
 * @param phoneNumber The phone number to format
 * @param countryCode The country code to format for (used as fallback)
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phoneNumber: string): string {
  try {
    // Check if the phone number starts with a + (international format)
    const isInternational = phoneNumber.trim().startsWith('+')

    // Parse the phone number
    let parsedNumber = parsePhoneNumber(phoneNumber)

    // If parsing fails and it's not international, try with UK country code
    if ((!parsedNumber || !parsedNumber.isValid()) && !isInternational) {
      parsedNumber = parsePhoneNumber(phoneNumber, { defaultCountry: 'GB' })
    }

    if (!parsedNumber || !parsedNumber.isValid()) {
      return phoneNumber
    }

    // If it's international (starts with +), format as international
    // Otherwise, format as national
    const formattedNumber = isInternational
      ? parsedNumber.formatInternational()
      : parsedNumber.formatNational()
    return formattedNumber
  } catch (_ignore) {
    return phoneNumber
  }
}

/**
 * Check if form values would result in the same phone number as forwardTo
 * @param formValues Object containing countryCode and telephone
 * @param forwardTo The current forwarding phone number to compare against
 * @returns True if the form values would result in the same phone number as forwardTo
 */
export function isSamePhoneNumber(
  formValues: { countryCode: string; telephone: string },
  forwardTo?: string,
): boolean {
  if (!forwardTo) return false

  const formPhoneNumber = `${formValues.countryCode}${formValues.telephone}`
  return formPhoneNumber === forwardTo
}
