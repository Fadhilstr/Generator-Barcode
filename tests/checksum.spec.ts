import { describe, it, expect } from 'vitest'
import {
  calculateMod10CheckDigit,
  validateMod10CheckDigit,
  expandUpcEToUpcA,
  validateUpcE
} from '../src/utils/checksum'

describe('Checksum Utilities', () => {
  describe('calculateMod10CheckDigit', () => {
    it('calculates valid check digit for EAN-13 payload (400638133393 -> 1)', () => {
      // 4006381333931 is a real standard barcode
      const check = calculateMod10CheckDigit('400638133393')
      expect(check).toBe(1)
    })

    it('calculates valid check digit for EAN-8 payload (9638507 -> 4)', () => {
      // 96385074
      const check = calculateMod10CheckDigit('9638507')
      expect(check).toBe(4)
    })

    it('calculates valid check digit for UPC-A payload (01234567890 -> 5)', () => {
      // 012345678905
      const check = calculateMod10CheckDigit('01234567890')
      expect(check).toBe(5)
    })

    it('calculates valid check digit for ITF-14 payload (1001234567890 -> 2)', () => {
      // 10012345678902
      const check = calculateMod10CheckDigit('1001234567890')
      expect(check).toBe(2)
    })
  })

  describe('validateMod10CheckDigit', () => {
    it('returns true for correct EAN-13 full numbers', () => {
      expect(validateMod10CheckDigit('4006381333931')).toBe(true)
      expect(validateMod10CheckDigit('8991234567891')).toBe(true)
    })

    it('returns false for corrupted check digits', () => {
      expect(validateMod10CheckDigit('4006381333932')).toBe(false)
      expect(validateMod10CheckDigit('8991234567899')).toBe(false)
    })
  })

  describe('expandUpcEToUpcA', () => {
    it('expands 6-digit payload ending in 0 (012340 -> 00100000234x)', () => {
      const expanded = expandUpcEToUpcA('012340')
      expect(expanded).not.toBeNull()
      expect(expanded?.startsWith('00100000234')).toBe(true)
    })

    it('correctly validates UPC-E barcodes', () => {
      expect(validateUpcE('01234565')).toBe(true)
      expect(validateUpcE('123456')).toBe(true)
      // Corrupted check digit
      expect(validateUpcE('01234569')).toBe(false)
    })
  })
})

