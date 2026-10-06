export type BarcodeFormat =
  | 'CODE128'
  | 'CODE39'
  | 'EAN13'
  | 'EAN8'
  | 'UPCA'
  | 'UPCE'
  | 'ITF'
  | 'ITF14'
  | 'CODABAR'
  | 'QR'

export type BarcodeCategory = '1D' | '2D'

export type BarcodeErrorCategory =
  | 'INVALID_FORMAT'
  | 'INVALID_LENGTH'
  | 'INVALID_CHARACTER'
  | 'INVALID_CHECKSUM'
  | 'UNSUPPORTED_FORMAT'
  | 'GENERATION_FAILED'

export interface BarcodeValidationResult {
  isValid: boolean
  error?: string
  errorCategory?: BarcodeErrorCategory
  normalizedValue?: string
  suggestedValue?: string
}

export interface BarcodeOptions {
  width: number // bar width multiplier for 1D (1 to 4)
  height: number // barcode height in px (30 to 200)
  margin: number // quiet zone margin (0 to 50)
  rotation: 0 | 90 | 180 | 270 // rotation degrees
  foregroundColor: string // hex code e.g. #000000
  backgroundColor: string // hex code or #ffffff
  displayValue: boolean // show human readable text
  fontSize: number // text font size in px
  textAlign: 'left' | 'center' | 'right'
  textMargin: number
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H' // QR specific
}

export interface BarcodeResult {
  format: BarcodeFormat
  value: string
  svg: string
  width: number
  height: number
  dataUrl?: string
}

export interface BarcodeGenerator {
  generate(value: string, options: BarcodeOptions): Promise<BarcodeResult> | BarcodeResult
}

export interface BarcodeFormatMeta {
  id: BarcodeFormat
  name: string
  label: string
  category: BarcodeCategory
  description: string
  commonUsage: string[]
  characterSet: string
  specs: string
  exampleValue: string
  slug: string
  supportsText: boolean
  supportsErrorCorrection: boolean
}

export interface BarcodeHistoryItem {
  id: string
  format: BarcodeFormat
  value: string
  createdAt: number
  optionsSummary: {
    width: number
    height: number
    margin: number
  }
}

export type PngScale = 1 | 2 | 3 | 4

