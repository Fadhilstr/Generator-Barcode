import JsBarcode from 'jsbarcode'
import type { BarcodeFormat, BarcodeOptions, BarcodeResult } from '@/types/barcode'

/**
 * Renders a 1D barcode using JsBarcode into a self-contained SVG string.
 */
export function renderJsBarcodeSvg(
  jsBarcodeFormat: string,
  internalFormat: BarcodeFormat,
  value: string,
  options: BarcodeOptions
): BarcodeResult {
  // Create an in-memory SVG element
  const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  let hasError = false
  let technicalDetail = ''

  try {
    JsBarcode(svgNode, value, {
      format: jsBarcodeFormat,
      width: options.width,
      height: options.height,
      displayValue: options.displayValue,
      text: value,
      fontSize: options.fontSize,
      textAlign: options.textAlign,
      textMargin: options.textMargin,
      lineColor: options.foregroundColor || '#000000',
      background: options.backgroundColor || '#ffffff',
      margin: options.margin,
      valid: (valid) => {
        if (!valid) {
          hasError = true
          technicalDetail = `JsBarcode validation callback returned false for ${internalFormat}`
        }
      }
    })
  } catch (err: unknown) {
    hasError = true
    technicalDetail = err instanceof Error ? err.message : String(err)
  }

  if (hasError) {
    // Log technical detail for developers without leaking raw strings to UI
    console.warn(`[Barcode Engine] ${internalFormat} encoding rejected:`, technicalDetail)
    throw new Error(`The entered value is not valid for ${internalFormat}. Please verify required length and characters.`)
  }

  // Extract dimensions
  const baseWidth = parseFloat(svgNode.getAttribute('width') || '200')
  const baseHeight = parseFloat(svgNode.getAttribute('height') || '100')

  // Apply rotation if needed
  let finalWidth = baseWidth
  let finalHeight = baseHeight
  let svgContent = new XMLSerializer().serializeToString(svgNode)

  if (options.rotation) {
    const rot = options.rotation
    if (rot === 90 || rot === 270) {
      finalWidth = baseHeight
      finalHeight = baseWidth
    }

    const innerSvg = svgNode.innerHTML
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${finalWidth}" height="${finalHeight}" viewBox="0 0 ${finalWidth} ${finalHeight}">
      <rect width="${finalWidth}" height="${finalHeight}" fill="${options.backgroundColor || '#ffffff'}"/>
      <g transform="translate(${finalWidth / 2}, ${finalHeight / 2}) rotate(${rot}) translate(${-baseWidth / 2}, ${-baseHeight / 2})">
        ${innerSvg}
      </g>
    </svg>`
  }

  return {
    format: internalFormat,
    value,
    svg: svgContent,
    width: Math.round(finalWidth),
    height: Math.round(finalHeight)
  }
}
