import { describe, it, expect } from 'vitest'
import {
  validateCode128,
  validateCode39,
  validateEan13,
  validateEan8,
  validateUpcA,
  validateUpcEBarcode,
  validateItf,
  validateItf14,
  validateCodabar,
  validateQr,
  validateBarcode
} from '../src/validators'

describe('Barcode Validators', () => {
  describe('Code 128', () => {
    it('accepts valid ASCII strings', () => {
      const res = validateCode128('PKG-2026-001')
      expect(res.isValid).toBe(true)
      expect(res.normalizedValue).toBe('PKG-2026-001')
    })

    it('rejects empty input', () => {
      const res = validateCode128('')
      expect(res.isValid).toBe(false)
      expect(res.errorCategory).toBe('INVALID_FORMAT')
    })

    it('rejects non-ASCII characters', () => {
      const res = validateCode128('Hello \u00E9')
      expect(res.isValid).toBe(false)
      expect(res.errorCategory).toBe('INVALID_CHARACTER')
    })
  })

  describe('Code 39', () => {
    it('accepts valid uppercase and special symbols', () => {
      const res = validateCode39('ITEM-123.4')
      expect(res.isValid).toBe(true)
      expect(res.normalizedValue).toBe('ITEM-123.4')
    })

    it('auto-normalizes lowercase to uppercase', () => {
      const res = validateCode39('inv-01')
      expect(res.isValid).toBe(true)
      expect(res.normalizedValue).toBe('INV-01')
    })

    it('rejects invalid symbols', () => {
      const res = validateCode39('ITEM#123')
      expect(res.isValid).toBe(false)
      expect(res.errorCategory).toBe('INVALID_CHARACTER')
    })
  })

  describe('EAN-13', () => {
    it('accepts valid 13 digits with correct checksum', () => {
      const res = validateEan13('4006381333931')
      expect(res.isValid).toBe(true)
    })

    it('auto-computes check digit for 12 digits', () => {
      const res = validateEan13('400638133393')
      expect(res.isValid).toBe(true)
      expect(res.normalizedValue).toBe('4006381333931')
    })

    it('rejects 13 digits with bad checksum and provides suggested fix', () => {
      const res = validateEan13('4006381333935')
      expect(res.isValid).toBe(false)
      expect(res.errorCategory).toBe('INVALID_CHECKSUM')
      expect(res.suggestedValue).toBe('4006381333931')
    })

    it('rejects non-numeric characters', () => {
      const res = validateEan13('400638133393A')
      expect(res.isValid).toBe(false)
      expect(res.errorCategory).toBe('INVALID_CHARACTER')
    })
  })

  describe('EAN-8', () => {
    it('accepts valid 8 digits with correct checksum', () => {
      const res = validateEan8('96385074')
      expect(res.isValid).toBe(true)
    })

    it('auto-computes check digit for 7 digits', () => {
      const res = validateEan8('9638507')
      expect(res.isValid).toBe(true)
      expect(res.normalizedValue).toBe('96385074')
    })

    it('rejects bad checksum', () => {
      const res = validateEan8('96385079')
      expect(res.isValid).toBe(false)
      expect(res.errorCategory).toBe('INVALID_CHECKSUM')
      expect(res.suggestedValue).toBe('96385074')
    })
  })

  describe('UPC-A', () => {
    it('accepts valid 12 digits with correct checksum', () => {
      const res = validateUpcA('012345678905')
      expect(res.isValid).toBe(true)
    })

    it('auto-computes check digit for 11 digits', () => {
      const res = validateUpcA('01234567890')
      expect(res.isValid).toBe(true)
      expect(res.normalizedValue).toBe('012345678905')
    })
  })

  describe('UPC-E', () => {
    it('accepts valid 8-digit UPC-E', () => {
      const res = validateUpcEBarcode('01234565')
      expect(res.isValid).toBe(true)
    })

    it('accepts valid 6-digit payload', () => {
      const res = validateUpcEBarcode('123456')
      expect(res.isValid).toBe(true)
    })
  })

  describe('ITF & ITF-14', () => {
    it('accepts even length for ITF', () => {
      const res = validateItf('123456')
      expect(res.isValid).toBe(true)
    })

    it('rejects odd length for ITF and suggests prepending 0', () => {
      const res = validateItf('12345')
      expect(res.isValid).toBe(false)
      expect(res.suggestedValue).toBe('012345')
    })

    it('accepts valid 14-digit ITF-14', () => {
      const res = validateItf14('10012345678902')
      expect(res.isValid).toBe(true)
    })
  })

  describe('Codabar', () => {
    it('accepts valid start and stop characters (A...B)', () => {
      const res = validateCodabar('A12345B')
      expect(res.isValid).toBe(true)
    })

    it('suggests adding A and B if digits only', () => {
      const res = validateCodabar('12345')
      expect(res.isValid).toBe(false)
      expect(res.suggestedValue).toBe('A12345B')
    })
  })

  describe('QR Code', () => {
    it('accepts valid URL and text', () => {
      const res = validateQr('https://example.com/item/123')
      expect(res.isValid).toBe(true)
    })

    it('rejects empty string', () => {
      const res = validateQr('   ')
      expect(res.isValid).toBe(false)
      expect(res.errorCategory).toBe('INVALID_FORMAT')
    })
  })

  describe('Central validateBarcode dispatcher', () => {
    it('correctly routes format to validator', () => {
      expect(validateBarcode('CODE128', 'ABC').isValid).toBe(true)
      expect(validateBarcode('EAN13', '4006381333931').isValid).toBe(true)
      expect(validateBarcode('QR', 'Hello').isValid).toBe(true)
    })
  })
})

