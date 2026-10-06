import type { BarcodeValidationResult } from '@/types/barcode'
import { createValidResult, createInvalidResult } from './common'

const CODABAR_START_STOP = /^[ABCD]/i
const CODABAR_BODY = /^[0-9\-$:/.+]+$/

export function validateCodabar(value: string): BarcodeValidationResult {
  const trimmed = value.trim().toUpperCase()
  if (!trimmed) {
    return createInvalidResult('Please enter data for Codabar.', 'INVALID_FORMAT')
  }

  // Check if start and stop characters (A, B, C, D) are present
  const hasStart = CODABAR_START_STOP.test(trimmed[0])
  const hasStop = CODABAR_START_STOP.test(trimmed[trimmed.length - 1])

  if (!hasStart || !hasStop || trimmed.length < 3) {
    // If user provided numbers only, offer suggested value with 'A' and 'B'
    if (CODABAR_BODY.test(trimmed)) {
      const suggested = `A${trimmed}B`
      return createInvalidResult(
        'Codabar requires start and stop characters (A, B, C, or D). Example: A' + trimmed + 'B',
        'INVALID_FORMAT',
        suggested
      )
    }
    return createInvalidResult(
      'Codabar must start and end with one of: A, B, C, or D. (Example: A12345B)',
      'INVALID_FORMAT'
    )
  }

  const body = trimmed.slice(1, -1)
  if (!body) {
    return createInvalidResult('Codabar requires content between start and stop characters.', 'INVALID_LENGTH')
  }

  if (!CODABAR_BODY.test(body)) {
    const invalidChars = body
      .split('')
      .filter(char => !/[0-9\-$:/.+]/.test(char))
      .slice(0, 3)
      .join(', ')
    return createInvalidResult(
      `Codabar payload only allows digits (0-9) and symbols (- $ : / . +). Invalid: ${invalidChars}`,
      'INVALID_CHARACTER'
    )
  }

  return createValidResult(trimmed)
}

