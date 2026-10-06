import type { BarcodeValidationResult } from '@/types/barcode'
import { createValidResult, createInvalidResult } from './common'

export function validateQr(value: string): BarcodeValidationResult {
  const trimmed = value.trim()
  if (!trimmed) {
    return createInvalidResult('Please enter a URL, text, or message for the QR code.', 'INVALID_FORMAT')
  }

  if (trimmed.length > 2500) {
    return createInvalidResult(
      `Content is too long for reliable QR scanning (${trimmed.length} characters, maximum 2500 recommended).`,
      'INVALID_LENGTH'
    )
  }

  return createValidResult(trimmed)
}

