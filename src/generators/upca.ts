import type { BarcodeGenerator, BarcodeOptions, BarcodeResult } from '@/types/barcode'
import { renderJsBarcodeSvg } from './jsbarcodeHelper'

export class UpcAGenerator implements BarcodeGenerator {
  generate(value: string, options: BarcodeOptions): BarcodeResult {
    return renderJsBarcodeSvg('UPC', 'UPCA', value, options)
  }
}

export const upcAGenerator = new UpcAGenerator()

