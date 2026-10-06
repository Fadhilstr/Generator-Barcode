import QRCode from 'qrcode'
import type { BarcodeGenerator, BarcodeOptions, BarcodeResult } from '@/types/barcode'

export class QrGenerator implements BarcodeGenerator {
  async generate(value: string, options: BarcodeOptions): Promise<BarcodeResult> {
    const size = Math.max(160, options.height * 2)

    let svg = ''
    try {
      svg = await QRCode.toString(value, {
        type: 'svg',
        errorCorrectionLevel: options.errorCorrectionLevel || 'M',
        margin: Math.max(0, Math.floor(options.margin / 4)),
        color: {
          dark: options.foregroundColor || '#000000',
          light: options.backgroundColor || '#ffffff'
        },
        width: size
      })
    } catch (err: unknown) {
      console.warn('[QR Engine Error]', err)
      throw new Error('Content exceeds QR capacity for the selected error correction level. Please reduce content length.')
    }

    let finalWidth = size
    let finalHeight = size

    if (options.rotation) {
      const rot = options.rotation
      // For square QR, rotating 90/180/270 keeps width/height
      svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
        <rect width="${finalWidth}" height="${finalHeight}" fill="${options.backgroundColor || '#ffffff'}"/>
        <g transform="translate(${finalWidth / 2}, ${finalHeight / 2}) rotate(${rot}) translate(${-finalWidth / 2}, ${-finalHeight / 2})">
          ${svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
        </g>
      </svg>`
    }

    return {
      format: 'QR',
      value,
      svg,
      width: finalWidth,
      height: finalHeight
    }
  }
}

export const qrGenerator = new QrGenerator()
