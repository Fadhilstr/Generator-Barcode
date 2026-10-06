import type { BarcodeValidationResult } from '@/types/barcode'

export function createValidResult(normalizedValue: string): BarcodeValidationResult {
  return {
    isValid: true,
    normalizedValue
  }
}

export function createInvalidResult(
  error: string,
  errorCategory: BarcodeValidationResult['errorCategory'],
  suggestedValue?: string
): BarcodeValidationResult {
  return {
    isValid: false,
    error,
    errorCategory,
    suggestedValue
  }
}

export function isDigitsOnly(value: string): boolean {
  return /^[0-9]+$/.test(value)
}

