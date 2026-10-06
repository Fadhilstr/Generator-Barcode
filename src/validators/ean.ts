import type { BarcodeValidationResult } from '@/types/barcode'
import { calculateMod10CheckDigit } from '@/utils/checksum'
import { createValidResult, createInvalidResult, isDigitsOnly } from './common'

export function validateEan13(value: string): BarcodeValidationResult {
  const clean = value.replace(/[\s-]/g, '')
  if (!clean) {
    return createInvalidResult('Please enter an EAN-13 number (12 or 13 numeric digits).', 'INVALID_FORMAT')
  }

  if (!isDigitsOnly(clean)) {
    return createInvalidResult('EAN-13 only accepts numeric digits (0-9). Letters and symbols are not allowed.', 'INVALID_CHARACTER')
  }

  if (clean.length === 12) {
    const checkDigit = calculateMod10CheckDigit(clean)
    const fullNumber = `${clean}${checkDigit}`
    return createValidResult(fullNumber)
  }

  if (clean.length === 13) {
    const payload = clean.slice(0, 12)
    const expectedCheckDigit = calculateMod10CheckDigit(payload)
    const actualCheckDigit = parseInt(clean[12], 10)

    if (expectedCheckDigit !== actualCheckDigit) {
      const suggested = `${payload}${expectedCheckDigit}`
      return createInvalidResult(
        `Invalid EAN-13 checksum. Expected check digit is ${expectedCheckDigit}, but got ${actualCheckDigit}.`,
        'INVALID_CHECKSUM',
        suggested
      )
    }

    return createValidResult(clean)
  }

  return createInvalidResult(
    `Invalid EAN-13 length. EAN-13 requires 12 digits (check digit will be computed) or 13 digits. Entered: ${clean.length} digits.`,
    'INVALID_LENGTH'
  )
}

export function validateEan8(value: string): BarcodeValidationResult {
  const clean = value.replace(/[\s-]/g, '')
  if (!clean) {
    return createInvalidResult('Please enter an EAN-8 number (7 or 8 numeric digits).', 'INVALID_FORMAT')
  }

  if (!isDigitsOnly(clean)) {
    return createInvalidResult('EAN-8 only accepts numeric digits (0-9). Letters and symbols are not allowed.', 'INVALID_CHARACTER')
  }

  if (clean.length === 7) {
    const checkDigit = calculateMod10CheckDigit(clean)
    const fullNumber = `${clean}${checkDigit}`
    return createValidResult(fullNumber)
  }

  if (clean.length === 8) {
    const payload = clean.slice(0, 7)
    const expectedCheckDigit = calculateMod10CheckDigit(payload)
    const actualCheckDigit = parseInt(clean[7], 10)

    if (expectedCheckDigit !== actualCheckDigit) {
      const suggested = `${payload}${expectedCheckDigit}`
      return createInvalidResult(
        `Invalid EAN-8 checksum. Expected check digit is ${expectedCheckDigit}, but got ${actualCheckDigit}.`,
        'INVALID_CHECKSUM',
        suggested
      )
    }

    return createValidResult(clean)
  }

  return createInvalidResult(
    `Invalid EAN-8 length. EAN-8 requires 7 digits (check digit will be computed) or 8 digits. Entered: ${clean.length} digits.`,
    'INVALID_LENGTH'
  )
}

