import type { BarcodeGenerator, BarcodeOptions, BarcodeResult } from '@/types/barcode'
import { renderJsBarcodeSvg } from './jsbarcodeHelper'

export class ItfGenerator implements BarcodeGenerator {
  generate(value: string, options: BarcodeOptions): BarcodeResult {
    return renderJsBarcodeSvg('ITF', 'ITF', value, options)
  }
}

export const itfGenerator = new ItfGenerator()

