import type { BarcodeValidationResult } from '@/types/barcode'
import { createValidResult, createInvalidResult } from './common'

export function validateCode128(value: string): BarcodeValidationResult {
  const trimmed = value.trim()
  if (!trimmed) {
    return createInvalidResult('Please enter text or numbers to generate a Code 128 barcode.', 'INVALID_FORMAT')
  }

  // Code 128 supports standard ASCII (0-127)
  for (let i = 0; i < trimmed.length; i++) {
    const code = trimmed.charCodeAt(i)
    if (code > 127) {
      return createInvalidResult(
        `Code 128 only supports standard ASCII characters. Character "${trimmed[i]}" is not supported.`,
        'INVALID_CHARACTER'
      )
    }
  }

  if (trimmed.length > 80) {
    return createInvalidResult('Code 128 input is too long (maximum recommended is 80 characters).', 'INVALID_LENGTH')
  }

  return createValidResult(trimmed)
}

