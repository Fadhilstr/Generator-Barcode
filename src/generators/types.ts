import type { BarcodeFormat, BarcodeOptions, BarcodeResult, BarcodeGenerator } from '@/types/barcode'

export interface GeneratorContext {
  format: BarcodeFormat
  value: string
  options: BarcodeOptions
}

export type { BarcodeGenerator, BarcodeOptions, BarcodeResult }

