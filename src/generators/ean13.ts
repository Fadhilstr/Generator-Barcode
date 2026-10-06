import type { BarcodeGenerator, BarcodeOptions, BarcodeResult } from '@/types/barcode'
import { renderJsBarcodeSvg } from './jsbarcodeHelper'

export class Ean13Generator implements BarcodeGenerator {
  generate(value: string, options: BarcodeOptions): BarcodeResult {
    return renderJsBarcodeSvg('EAN13', 'EAN13', value, options)
  }
}

export const ean13Generator = new Ean13Generator()

