import type { BarcodeValidationResult } from '@/types/barcode'
import { calculateMod10CheckDigit } from '@/utils/checksum'
import { createValidResult, createInvalidResult, isDigitsOnly } from './common'

export function validateItf(value: string): BarcodeValidationResult {
  const clean = value.replace(/[\s-]/g, '')
  if (!clean) {
    return createInvalidResult('Please enter digits for Interleaved 2 of 5 (ITF).', 'INVALID_FORMAT')
  }

  if (!isDigitsOnly(clean)) {
    return createInvalidResult('ITF only accepts numeric digits (0-9). Letters and symbols are not allowed.', 'INVALID_CHARACTER')
  }

  // Interleaved 2 of 5 requires an even number of digits
  if (clean.length % 2 !== 0) {
    const suggested = `0${clean}`
    return createInvalidResult(
      `Interleaved 2 of 5 requires an even number of digits (currently ${clean.length}). A leading 0 can be added.`,
      'INVALID_LENGTH',
      suggested
    )
  }

  return createValidResult(clean)
}

export function validateItf14(value: string): BarcodeValidationResult {
  const clean = value.replace(/[\s-]/g, '')
  if (!clean) {
    return createInvalidResult('Please enter an ITF-14 number (13 or 14 numeric digits).', 'INVALID_FORMAT')
  }

  if (!isDigitsOnly(clean)) {
    return createInvalidResult('ITF-14 only accepts numeric digits (0-9).', 'INVALID_CHARACTER')
  }

  if (clean.length === 13) {
    const checkDigit = calculateMod10CheckDigit(clean)
    const fullNumber = `${clean}${checkDigit}`
    return createValidResult(fullNumber)
  }

  if (clean.length === 14) {
    const payload = clean.slice(0, 13)
    const expectedCheckDigit = calculateMod10CheckDigit(payload)
    const actualCheckDigit = parseInt(clean[13], 10)

    if (expectedCheckDigit !== actualCheckDigit) {
      const suggested = `${payload}${expectedCheckDigit}`
      return createInvalidResult(
        `Invalid ITF-14 checksum. Expected check digit is ${expectedCheckDigit}, but got ${actualCheckDigit}.`,
        'INVALID_CHECKSUM',
        suggested
      )
    }

    return createValidResult(clean)
  }

  return createInvalidResult(
    `Invalid ITF-14 length. ITF-14 requires 13 digits (check digit will be computed) or 14 digits. Entered: ${clean.length} digits.`,
    'INVALID_LENGTH'
  )
}

