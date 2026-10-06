import type { BarcodeGenerator, BarcodeOptions, BarcodeResult } from '@/types/barcode'
import { renderJsBarcodeSvg } from './jsbarcodeHelper'

export class Ean8Generator implements BarcodeGenerator {
  generate(value: string, options: BarcodeOptions): BarcodeResult {
    return renderJsBarcodeSvg('EAN8', 'EAN8', value, options)
  }
}

export const ean8Generator = new Ean8Generator()

