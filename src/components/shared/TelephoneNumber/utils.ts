import type { CountryCode } from './types'
import parsePhoneNumber from 'libphonenumber-js'

export function getCountryCallingCode(countryCode: string, countryCodeList: CountryCode[]): string {
  const country = countryCodeList.find((c) => c.code === countryCode)
  return country?.dialCode || '44' // Default to UK (+44) if not found
}

export function parsePhoneNumberParts(phoneNumber: string): {
  countryCode: string
  telephone: string
} {
  try {
    const isInternational = phoneNumber.trim().startsWith('+')

    let parsedNumber = parsePhoneNumber(phoneNumber)

    if ((!parsedNumber || !parsedNumber.isValid()) && !isInternational) {
      parsedNumber = parsePhoneNumber(phoneNumber, { defaultCountry: 'GB' })
    }

    if (!parsedNumber || !parsedNumber.isValid()) {
      console.log('Parsing failed number: ', phoneNumber)
      return {
        countryCode: '+44',
        telephone: phoneNumber,
      }
    }

    const countryCode = `+${parsedNumber.countryCallingCode}`
    const telephone = parsedNumber.nationalNumber

    return {
      countryCode,
      telephone,
    }
  } catch (error) {
    console.log('Error parsing phone number: ', phoneNumber, ' error: ', error)
    return {
      countryCode: '+44',
      telephone: phoneNumber,
    }
  }
}

export function formatPhoneNumber(phoneNumber: string): string {
  try {
    const isInternational = phoneNumber.trim().startsWith('+')

    let parsedNumber = parsePhoneNumber(phoneNumber)

    if ((!parsedNumber || !parsedNumber.isValid()) && !isInternational) {
      parsedNumber = parsePhoneNumber(phoneNumber, { defaultCountry: 'GB' })
    }

    if (!parsedNumber || !parsedNumber.isValid()) {
      return phoneNumber
    }

    const formattedNumber = isInternational
      ? parsedNumber.formatInternational()
      : parsedNumber.formatNational()
    return formattedNumber
  } catch (_ignore) {
    return phoneNumber
  }
}

export function isSamePhoneNumber(
  formValues: { countryCode: string; telephone: string },
  forwardTo?: string,
): boolean {
  if (!forwardTo) return false

  const formPhoneNumber = `${formValues.countryCode}${formValues.telephone}`
  return formPhoneNumber === forwardTo
}
