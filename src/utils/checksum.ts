/**
 * Calculates GS1 Modulo-10 check digit.
 * Used for EAN-13, EAN-8, UPC-A, ITF-14.
 *
 * Algorithm (from right to left of the payload without check digit):
 * Multiply 1st from right by 3, 2nd by 1, 3rd by 3, 4th by 1, and so forth.
 * Sum all products.
 * Check digit = (10 - (sum % 10)) % 10.
 */
export function calculateMod10CheckDigit(payload: string): number {
  const digits = payload.replace(/\D/g, '')
  let sum = 0
  let multiplier = 3

  for (let i = digits.length - 1; i >= 0; i--) {
    const digit = parseInt(digits[i], 10)
    sum += digit * multiplier
    multiplier = multiplier === 3 ? 1 : 3
  }

  const remainder = sum % 10
  return remainder === 0 ? 0 : 10 - remainder
}

/**
 * Validates whether the last digit of the number is a valid GS1 Modulo-10 check digit.
 */
export function validateMod10CheckDigit(fullNumber: string): boolean {
  const clean = fullNumber.replace(/\D/g, '')
  if (clean.length < 2) return false

  const payload = clean.slice(0, -1)
  const expectedCheckDigit = calculateMod10CheckDigit(payload)
  const actualCheckDigit = parseInt(clean.slice(-1), 10)

  return expectedCheckDigit === actualCheckDigit
}

/**
 * Expands a 6-digit UPC-E payload to a full 12-digit UPC-A string.
 * Supports 6, 7, or 8 digit representations.
 */
export function expandUpcEToUpcA(upcE: string): string | null {
  const clean = upcE.replace(/\D/g, '')
  let numSystem = '0'
  let payload = ''

  if (clean.length === 6) {
    numSystem = '0'
    payload = clean
  } else if (clean.length === 7) {
    numSystem = clean[0] === '1' ? '1' : '0'
    payload = clean.slice(1)
  } else if (clean.length === 8) {
    numSystem = clean[0] === '1' ? '1' : '0'
    payload = clean.slice(1, 7)
  } else {
    return null
  }

  const [d1, d2, d3, d4, d5, d6] = payload.split('')
  let upcA11 = ''

  switch (d6) {
    case '0':
    case '1':
    case '2':
      upcA11 = `${numSystem}${d1}${d2}${d6}0000${d3}${d4}${d5}`
      break
    case '3':
      upcA11 = `${numSystem}${d1}${d2}${d3}00000${d4}${d5}`
      break
    case '4':
      upcA11 = `${numSystem}${d1}${d2}${d3}${d4}00000${d5}`
      break
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      upcA11 = `${numSystem}${d1}${d2}${d3}${d4}${d5}0000${d6}`
      break
    default:
      return null
  }

  const checkDigit = calculateMod10CheckDigit(upcA11)
  return `${upcA11}${checkDigit}`
}

/**
 * Validates a UPC-E barcode string (6, 7, or 8 digits).
 */
export function validateUpcE(value: string): boolean {
  const clean = value.replace(/\D/g, '')
  if (![6, 7, 8].includes(clean.length)) {
    return false
  }

  const expanded = expandUpcEToUpcA(clean)
  if (!expanded) return false

  if (clean.length === 8) {
    const expectedCheckDigit = parseInt(expanded.slice(-1), 10)
    const actualCheckDigit = parseInt(clean.slice(-1), 10)
    return expectedCheckDigit === actualCheckDigit
  }

  return true
}

