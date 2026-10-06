import type { BarcodeFormat, BarcodeFormatMeta } from '@/types/barcode'

export const SUPPORTED_FORMATS: BarcodeFormatMeta[] = [
  {
    id: 'CODE128',
    name: 'Code 128',
    label: 'CODE128',
    category: '1D',
    description: 'High-density alphanumeric barcode widely used in logistics, shipping, and supply chain management.',
    commonUsage: ['Logistics and freight', 'Packaging labels', 'Inventory tracking', 'E-commerce shipping labels'],
    characterSet: 'All 128 ASCII characters (numbers, letters uppercase and lowercase, symbols, control codes).',
    specs: 'Variable length, bi-directional scanning, includes internal modulo 103 checksum.',
    exampleValue: 'ITEM-987452',
    slug: 'code-128',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'CODE39',
    name: 'Code 39',
    label: 'CODE39',
    category: '1D',
    description: 'Classic variable-length alphanumeric symbology commonly required in automotive, defense, and healthcare systems.',
    commonUsage: ['Defense logistics (MIL-STD-129)', 'Automotive parts labeling', 'Medical and pharmaceutical equipment', 'Badge and asset tracking'],
    characterSet: 'Uppercase letters (A-Z), digits (0-9), and punctuation (- . $ / + % space).',
    specs: 'Discrete, self-checking symbology. Each character consists of 9 elements (5 bars, 4 spaces; 3 of which are wide).',
    exampleValue: 'ASSET-4821',
    slug: 'code-39',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'EAN13',
    name: 'EAN-13',
    label: 'EAN-13',
    category: '1D',
    description: 'International standard for marking retail consumer goods, governed by GS1 global specifications.',
    commonUsage: ['Point of sale (POS) retail', 'Global trade item numbers (GTIN-13)', 'Supermarket products', 'Book numbering (ISBN conversion)'],
    characterSet: '12 data digits + 1 GS1 Modulo-10 check digit (13 digits total).',
    specs: 'Fixed 13-digit length. Includes country prefix, manufacturer code, product number, and mandatory modulo-10 check digit.',
    exampleValue: '4006381333931',
    slug: 'ean-13',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'EAN8',
    name: 'EAN-8',
    label: 'EAN-8',
    category: '1D',
    description: 'Compact version of EAN-13 designed specifically for small retail packages where space is limited.',
    commonUsage: ['Small retail packaging (cosmetics, confectionary, pens)', 'Convenience store POS checkout', 'Vending machine goods'],
    characterSet: '7 data digits + 1 GS1 Modulo-10 check digit (8 digits total).',
    specs: 'Fixed 8-digit length. Split into 2 blocks of 4 digits with center guard pattern.',
    exampleValue: '96385074',
    slug: 'ean-8',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'UPCA',
    name: 'UPC-A',
    label: 'UPC-A',
    category: '1D',
    description: 'Standard retail barcode throughout North America (United States and Canada), representing GTIN-12.',
    commonUsage: ['North American retail POS scanning', 'Consumer packaged goods (CPG)', 'Warehouse inventory receipt'],
    characterSet: '11 data digits + 1 GS1 Modulo-10 check digit (12 digits total).',
    specs: 'Fixed 12-digit length. Composed of number system character, manufacturer code, item code, and check digit.',
    exampleValue: '012345678905',
    slug: 'upc-a',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'UPCE',
    name: 'UPC-E',
    label: 'UPC-E',
    category: '1D',
    description: 'Zero-suppressed compact barcode variation of UPC-A for small items in North American retail.',
    commonUsage: ['Small packaged items in North America', 'Cigarettes, candy bars, cosmetics', 'Compact pharmacy items'],
    characterSet: 'Numeric only (6 payload digits, optional number system and check digit).',
    specs: 'Suppresses trailing zeros of manufacturer code and leading zeros of item number into 6 digits.',
    exampleValue: '01234565',
    slug: 'upc-e',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'ITF',
    name: 'Interleaved 2 of 5 (ITF)',
    label: 'ITF',
    category: '1D',
    description: 'Continuous two-width barcode encoding digits in pairs using alternating bars and spaces.',
    commonUsage: ['Corrugated cardboard outer cartons', 'Industrial warehouse transport', 'Ticketing and baggage handling'],
    characterSet: 'Numeric only (0-9). Length must be an even number of digits.',
    specs: 'Interleaved structure where odd-positioned digits are encoded in bars and even-positioned digits in spaces.',
    exampleValue: '30712345000018',
    slug: 'itf',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'ITF14',
    name: 'ITF-14',
    label: 'ITF-14',
    category: '1D',
    description: 'GS1 implementation of Interleaved 2 of 5 for trade items packaged in corrugated cases.',
    commonUsage: ['Master cartons and outer shipping boxes', 'Pallet containers', 'Wholesale distribution hubs'],
    characterSet: '13 numeric digits + 1 GS1 Modulo-10 check digit (14 digits total).',
    specs: 'Fixed 14-digit format, typically printed with bearer bars to prevent incomplete scans.',
    exampleValue: '10012345678902',
    slug: 'itf-14',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'CODABAR',
    name: 'Codabar (NW-7)',
    label: 'Codabar',
    category: '1D',
    description: 'Discrete, self-checking symbology historically utilized in blood banks, libraries, and FedEx airbills.',
    commonUsage: ['Blood banks and transfusion services', 'Public and academic library books', 'Express courier airbills', 'Photo processing labs'],
    characterSet: 'Digits (0-9), special symbols (- $ : / . +), and start/stop characters (A, B, C, D).',
    specs: 'Requires framing start and stop delimiters selected from A, B, C, or D.',
    exampleValue: 'A12345678B',
    slug: 'codabar',
    supportsText: true,
    supportsErrorCorrection: false
  },
  {
    id: 'QR',
    name: 'QR Code',
    label: 'QR Code',
    category: '2D',
    description: 'Two-dimensional matrix barcode with rapid readability and robust Reed-Solomon error correction.',
    commonUsage: ['Website URLs and web links', 'Wi-Fi connection credentials', 'Digital contact cards (vCard)', 'Payment transfers and tickets'],
    characterSet: 'Alphanumeric, binary data, Kanji, and full UTF-8 Unicode characters.',
    specs: 'Matrix symbol with position detection patterns at 3 corners. Error correction levels: L (7%), M (15%), Q (25%), H (30%).',
    exampleValue: 'https://example.com',
    slug: 'qr-code',
    supportsText: false,
    supportsErrorCorrection: true
  }
]

export interface FutureFormatMeta {
  name: string
  category: string
  description: string
  status: 'Roadmap' | 'Planned'
}

export const FUTURE_FORMATS: FutureFormatMeta[] = [
  { name: 'CODE93', category: '1D', description: 'Higher-density successor to Code 39 supporting full ASCII.', status: 'Planned' },
  { name: 'GS1-128', category: '1D', description: 'Application identifier structure built on Code 128 symbology.', status: 'Planned' },
  { name: 'Data Matrix', category: '2D', description: 'Compact 2D matrix symbology for direct part marking and electronics.', status: 'Roadmap' },
  { name: 'PDF417', category: '2D', description: 'Stacked linear 2D barcode for identification cards and boarding passes.', status: 'Roadmap' },
  { name: 'Aztec', category: '2D', description: '2D matrix barcode with central bullseye finder for transport ticketing.', status: 'Roadmap' },
  { name: 'MSI Plessey', category: '1D', description: 'Continuous barcode variant for retail shelf storage and inventory.', status: 'Planned' },
  { name: 'Pharmacode', category: '1D', description: 'Pharmaceutical binary packaging inspection control barcode.', status: 'Planned' },
  { name: 'ISBN / ISSN', category: '1D', description: 'Standardized book and serial publication identification codes.', status: 'Planned' }
]

export function getFormatMeta(format: BarcodeFormat): BarcodeFormatMeta {
  const found = SUPPORTED_FORMATS.find(f => f.id === format)
  if (!found) {
    return SUPPORTED_FORMATS[0]
  }
  return found
}

export function getFormatMetaBySlug(slug: string): BarcodeFormatMeta | undefined {
  return SUPPORTED_FORMATS.find(f => f.slug === slug || f.id.toLowerCase() === slug.toLowerCase())
}

