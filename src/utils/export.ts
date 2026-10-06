import type { PngScale } from '@/types/barcode'

/**
 * Downloads an SVG string directly as a .svg vector file.
 */
export function downloadSvg(svgString: string, filename: string): void {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename.endsWith('.svg') ? filename : `${filename}.svg`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

/**
 * Converts SVG markup to a high-resolution PNG and downloads it.
 */
export async function downloadPng(
  svgString: string,
  filename: string,
  scale: PngScale = 2
): Promise<void> {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const width = img.naturalWidth || 300
        const height = img.naturalHeight || 150

        canvas.width = width * scale
        canvas.height = height * scale

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          throw new Error('Canvas 2D context not available.')
        }

        ctx.imageSmoothingEnabled = false
        ctx.scale(scale, scale)
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob((pngBlob) => {
          if (!pngBlob) {
            reject(new Error('Failed to generate PNG blob.'))
            return
          }
          const pngUrl = URL.createObjectURL(pngBlob)
          const anchor = document.createElement('a')
          anchor.href = pngUrl
          anchor.download = filename.endsWith('.png') ? filename : `${filename}.png`
          document.body.appendChild(anchor)
          anchor.click()
          document.body.removeChild(anchor)
          URL.revokeObjectURL(pngUrl)
          URL.revokeObjectURL(url)
          resolve()
        }, 'image/png')
      } catch (err) {
        URL.revokeObjectURL(url)
        reject(err)
      }
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load SVG into image for PNG export.'))
    }
    img.src = url
  })
}

/**
 * Triggers a dedicated print view for the barcode with print-optimized CSS.
 */
export function printBarcode(svgString: string, formatName: string, value: string): void {
  const iframe = document.createElement('iframe')
  iframe.style.position = 'fixed'
  iframe.style.right = '0'
  iframe.style.bottom = '0'
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = '0'
  document.body.appendChild(iframe)

  const doc = iframe.contentWindow?.document
  if (!doc) {
    document.body.removeChild(iframe)
    return
  }

  doc.open()
  doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Print - ${formatName} Barcode</title>
  <style>
    @page {
      size: auto;
      margin: 15mm;
    }
    body {
      margin: 0;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 80vh;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #000;
      background: #fff;
    }
    .print-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 90vw;
    }
    .barcode-wrapper {
      margin: 20px 0;
    }
    .barcode-wrapper svg {
      max-width: 100%;
      height: auto;
      shape-rendering: crispEdges;
    }
    .meta {
      margin-top: 12px;
      font-size: 13px;
      color: #555;
    }
    .format-tag {
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-size: 11px;
      margin-bottom: 4px;
    }
    .value-tag {
      font-family: "JetBrains Mono", monospace;
      font-size: 14px;
      letter-spacing: 0.05em;
    }
  </style>
</head>
<body>
  <div class="print-container">
    <div class="format-tag">${formatName}</div>
    <div class="barcode-wrapper">${svgString}</div>
    <div class="meta">
      <div class="value-tag">${value}</div>
    </div>
  </div>
</body>
</html>`)
  doc.close()

  iframe.contentWindow?.focus()
  setTimeout(() => {
    iframe.contentWindow?.print()
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 1000)
  }, 250)
}

