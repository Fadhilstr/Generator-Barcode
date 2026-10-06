import type { BarcodeFormat, BarcodeValidationResult } from '@/types/barcode'
import { validateCode128 } from './code128'
import { validateCode39 } from './code39'
import { validateEan13, validateEan8 } from './ean'
import { validateUpcA, validateUpcEBarcode } from './upc'
import { validateItf, validateItf14 } from './itf'
import { validateCodabar } from './codabar'
import { validateQr } from './qr'
import { createInvalidResult } from './common'

export function validateBarcode(format: BarcodeFormat, value: string): BarcodeValidationResult {
  switch (format) {
    case 'CODE128':
      return validateCode128(value)
    case 'CODE39':
      return validateCode39(value)
    case 'EAN13':
      return validateEan13(value)
    case 'EAN8':
      return validateEan8(value)
    case 'UPCA':
      return validateUpcA(value)
    case 'UPCE':
      return validateUpcEBarcode(value)
    case 'ITF':
      return validateItf(value)
    case 'ITF14':
      return validateItf14(value)
    case 'CODABAR':
      return validateCodabar(value)
    case 'QR':
      return validateQr(value)
    default:
      return createInvalidResult(`Symbology ${format} is not yet supported.`, 'UNSUPPORTED_FORMAT')
  }
}

export * from './code128'
export * from './code39'
export * from './ean'
export * from './upc'
export * from './itf'
export * from './codabar'
export * from './qr'

