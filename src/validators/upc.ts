import type { BarcodeValidationResult } from '@/types/barcode'
import { calculateMod10CheckDigit, expandUpcEToUpcA, validateUpcE } from '@/utils/checksum'
import { createValidResult, createInvalidResult, isDigitsOnly } from './common'

export function validateUpcA(value: string): BarcodeValidationResult {
  const clean = value.replace(/[\s-]/g, '')
  if (!clean) {
    return createInvalidResult('Please enter a UPC-A number (11 or 12 numeric digits).', 'INVALID_FORMAT')
  }

  if (!isDigitsOnly(clean)) {
    return createInvalidResult('UPC-A only accepts numeric digits (0-9). Letters and symbols are not allowed.', 'INVALID_CHARACTER')
  }

  if (clean.length === 11) {
    const checkDigit = calculateMod10CheckDigit(clean)
    const fullNumber = `${clean}${checkDigit}`
    return createValidResult(fullNumber)
  }

  if (clean.length === 12) {
    const payload = clean.slice(0, 11)
    const expectedCheckDigit = calculateMod10CheckDigit(payload)
    const actualCheckDigit = parseInt(clean[11], 10)

    if (expectedCheckDigit !== actualCheckDigit) {
      const suggested = `${payload}${expectedCheckDigit}`
      return createInvalidResult(
        `Invalid UPC-A checksum. Expected check digit is ${expectedCheckDigit}, but got ${actualCheckDigit}.`,
        'INVALID_CHECKSUM',
        suggested
      )
    }

    return createValidResult(clean)
  }

  return createInvalidResult(
    `Invalid UPC-A length. UPC-A requires 11 digits (check digit will be computed) or 12 digits. Entered: ${clean.length} digits.`,
    'INVALID_LENGTH'
  )
}

export function validateUpcEBarcode(value: string): BarcodeValidationResult {
  const clean = value.replace(/[\s-]/g, '')
  if (!clean) {
    return createInvalidResult('Please enter a UPC-E number (6, 7, or 8 digits).', 'INVALID_FORMAT')
  }

  if (!isDigitsOnly(clean)) {
    return createInvalidResult('UPC-E only accepts numeric digits (0-9).', 'INVALID_CHARACTER')
  }

  if (![6, 7, 8].includes(clean.length)) {
    return createInvalidResult(
      `Invalid UPC-E length. Expected 6, 7, or 8 digits. Entered: ${clean.length} digits.`,
      'INVALID_LENGTH'
    )
  }

  const expanded = expandUpcEToUpcA(clean)
  if (!expanded) {
    return createInvalidResult(
      'Invalid UPC-E payload structure. Unable to expand to valid UPC-A.',
      'INVALID_FORMAT'
    )
  }

  if (clean.length === 8) {
    const isValid = validateUpcE(clean)
    if (!isValid) {
      const expectedCheckDigit = expanded.slice(-1)
      const corrected = `${clean.slice(0, 7)}${expectedCheckDigit}`
      return createInvalidResult(
        `Invalid UPC-E checksum. Expected check digit is ${expectedCheckDigit}, but got ${clean[7]}.`,
        'INVALID_CHECKSUM',
        corrected
      )
    }
  }

  return createValidResult(clean)
}

