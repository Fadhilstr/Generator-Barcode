import type { BarcodeValidationResult } from '@/types/barcode'
import { createValidResult, createInvalidResult } from './common'

const CODE39_ALLOWED = /^[A-Z0-9\-. $/+%]+$/

export function validateCode39(value: string): BarcodeValidationResult {
  const trimmed = value.trim()
  if (!trimmed) {
    return createInvalidResult('Please enter text or numbers for Code 39.', 'INVALID_FORMAT')
  }

  // Normalize: remove framing asterisks if typed, uppercase letters
  let normalized = trimmed.toUpperCase()
  if (normalized.startsWith('*') && normalized.endsWith('*') && normalized.length > 2) {
    normalized = normalized.slice(1, -1)
  }

  if (!CODE39_ALLOWED.test(normalized)) {
    const invalidChars = normalized
      .split('')
      .filter(char => !/[A-Z0-9\-. $/+%]/.test(char))
      .slice(0, 3)
      .join(', ')
    return createInvalidResult(
      `Code 39 only allows uppercase letters (A-Z), digits (0-9), and symbols (- . $ / + % space). Invalid: ${invalidChars}`,
      'INVALID_CHARACTER'
    )
  }

  if (normalized.length > 50) {
    return createInvalidResult('Code 39 input is too long (maximum recommended is 50 characters).', 'INVALID_LENGTH')
  }

  return createValidResult(normalized)
}

