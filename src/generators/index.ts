import type { BarcodeFormat, BarcodeOptions, BarcodeResult, BarcodeGenerator } from '@/types/barcode'
import { code128Generator } from './code128'
import { code39Generator } from './code39'
import { ean13Generator } from './ean13'
import { ean8Generator } from './ean8'
import { upcAGenerator } from './upca'
import { upcEGenerator } from './upce'
import { itfGenerator } from './itf'
import { itf14Generator } from './itf14'
import { codabarGenerator } from './codabar'
import { qrGenerator } from './qr'

export const generatorsMap: Record<BarcodeFormat, BarcodeGenerator> = {
  CODE128: code128Generator,
  CODE39: code39Generator,
  EAN13: ean13Generator,
  EAN8: ean8Generator,
  UPCA: upcAGenerator,
  UPCE: upcEGenerator,
  ITF: itfGenerator,
  ITF14: itf14Generator,
  CODABAR: codabarGenerator,
  QR: qrGenerator
}

export function getBarcodeGenerator(format: BarcodeFormat): BarcodeGenerator {
  const generator = generatorsMap[format]
  if (!generator) {
    throw new Error(`Symbology ${format} is not supported.`)
  }
  return generator
}

export async function generateBarcode(
  format: BarcodeFormat,
  value: string,
  options: BarcodeOptions
): Promise<BarcodeResult> {
  const generator = getBarcodeGenerator(format)
  return await generator.generate(value, options)
}

export * from './types'
export * from './code128'
export * from './code39'
export * from './ean13'
export * from './ean8'
export * from './upca'
export * from './upce'
export * from './itf'
export * from './itf14'
export * from './codabar'
export * from './qr'

