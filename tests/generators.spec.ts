import { describe, it, expect } from 'vitest'
import { generatorsMap, getBarcodeGenerator } from '../src/generators'
import { qrGenerator } from '../src/generators/qr'
import type { BarcodeOptions } from '../src/types/barcode'

const testOptions: BarcodeOptions = {
  width: 2,
  height: 80,
  margin: 10,
  rotation: 0,
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
  displayValue: true,
  fontSize: 16,
  textAlign: 'center',
  textMargin: 2,
  errorCorrectionLevel: 'M'
}

describe('Barcode Generators', () => {
  it('registers all 10 supported formats in registry', () => {
    const formats = ['CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPCA', 'UPCE', 'ITF', 'ITF14', 'CODABAR', 'QR']
    for (const fmt of formats) {
      const gen = getBarcodeGenerator(fmt as any)
      expect(gen).toBeDefined()
      expect(typeof gen.generate).toBe('function')
    }
  })

  it('generates clean vector SVG for QR Code', async () => {
    const res = await qrGenerator.generate('https://example.com/item/100', testOptions)
    expect(res.format).toBe('QR')
    expect(res.value).toBe('https://example.com/item/100')
    expect(res.svg).toContain('<svg')
    expect(res.svg).toContain('</svg>')
    expect(res.width).toBeGreaterThan(0)
    expect(res.height).toBeGreaterThan(0)
  })

  it('supports QR Code 90 degree rotation', async () => {
    const res = await qrGenerator.generate('https://example.com', {
      ...testOptions,
      rotation: 90
    })
    expect(res.svg).toContain('rotate(90)')
  })
})

