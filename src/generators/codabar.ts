import type { BarcodeGenerator, BarcodeOptions, BarcodeResult } from '@/types/barcode'
import { renderJsBarcodeSvg } from './jsbarcodeHelper'

export class CodabarGenerator implements BarcodeGenerator {
  generate(value: string, options: BarcodeOptions): BarcodeResult {
    return renderJsBarcodeSvg('codabar', 'CODABAR', value.toUpperCase(), options)
  }
}

export const codabarGenerator = new CodabarGenerator()

