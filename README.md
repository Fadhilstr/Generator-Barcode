# Barcode Generator

> Generate barcodes instantly. No backend. No data upload.

A modern, high-precision client-side barcode generation suite built with Vue 3, Vite, and TypeScript. The application runs 100% inside your web browser sandbox, ensuring absolute data privacy and full offline functionality as a Progressive Web App (PWA).

---

## Features

- **100% Client-Side Engine**: Barcodes are encoded and rendered directly in browser memory. No backend server, external API, or database is involved.
- **Real-Time Dynamic Preview**: Instant vector SVG rendering with debounce protection as you adjust format, content, dimensions, or styling.
- **Strict Format Validation**: Real-time validation adhering to international GS1 and ISO standards, including Modulo-10 check digit verification with automatic fix suggestions.
- **Dual Symbology Support**: Covers both 1D linear barcodes and 2D matrix codes (QR Code).
- **High-Resolution Exports**:
  - Vector SVG export for infinite scaling and precision printing.
  - Multi-resolution PNG export (1x standard, 2x Retina, 3x high-res, 4x print-ready).
  - Print layout with dedicated CSS print styles (`@media print`) and sharp edge rendering.
- **Customizable Appearance**:
  - Bar width and barcode height multipliers
  - Quiet zone (margin) adjustment
  - 4-quadrant orientation rotation (0°, 90°, 180°, 270°)
  - Foreground and background color pickers with hex support
  - Human-readable text toggle, font scaling, and alignment
  - QR Code Reed-Solomon error correction levels (L, M, Q, H)
- **Local History with Privacy Control**:
  - Recent barcodes stored strictly in local `localStorage`.
  - Pause / private mode toggle to stop recording history at any time.
  - One-click reload back into the generator workspace.
- **Progressive Web App (PWA)**:
  - Service worker caching for complete offline functionality.
  - Installable on desktop and mobile devices.
- **Theme Support**:
  - System preference detection, explicit light mode, and dark mode.

---

## Supported Barcode Formats

### 1D Linear Barcodes

1. **CODE128** (Code 128)
   - Category: 1D
   - Common Usage: Logistics, shipping labels, inventory management, supply chain
   - Character Set: Full 128 ASCII character set (0-127)
   - Checksum: Internal Modulo 103 checksum

2. **CODE39** (Code 39)
   - Category: 1D
   - Common Usage: Automotive parts, defense logistics (MIL-STD-129), healthcare assets
   - Character Set: Uppercase letters (A-Z), digits (0-9), symbols (- . $ / + % space)

3. **EAN-13** (European Article Number)
   - Category: 1D
   - Common Usage: International retail point-of-sale (POS), consumer goods (GTIN-13)
   - Character Set: 12 data digits + 1 GS1 Modulo-10 check digit (13 digits total)

4. **EAN-8**
   - Category: 1D
   - Common Usage: Compact retail packaging (cosmetics, small confectionary items)
   - Character Set: 7 data digits + 1 GS1 Modulo-10 check digit (8 digits total)

5. **UPC-A** (Universal Product Code)
   - Category: 1D
   - Common Usage: North American retail point-of-sale (GTIN-12)
   - Character Set: 11 data digits + 1 GS1 Modulo-10 check digit (12 digits total)

6. **UPC-E**
   - Category: 1D
   - Common Usage: Zero-suppressed retail barcode for small packages in the United States and Canada
   - Character Set: 6 payload digits (with expandable UPC-A parity check)

7. **ITF** (Interleaved 2 of 5)
   - Category: 1D
   - Common Usage: Corrugated cardboard shipping cartons, industrial transport
   - Character Set: Numeric only, requiring an even number of digits

8. **ITF-14**
   - Category: 1D
   - Common Usage: Master cartons, wholesale distribution packaging (GTIN-14)
   - Character Set: 13 data digits + 1 GS1 Modulo-10 check digit (14 digits total)

9. **CODABAR** (NW-7)
   - Category: 1D
   - Common Usage: Blood banks, library inventory, courier airbills
   - Character Set: Numeric digits (0-9), symbols (- $ : / . +), framed by start/stop delimiters (A, B, C, D)

### 2D Matrix Codes

10. **QR Code**
    - Category: 2D
    - Common Usage: Web links, mobile apps, contact cards (vCard), digital credentials
    - Character Set: Alphanumeric, binary data, Unicode UTF-8
    - Error Correction: Reed-Solomon levels L (7%), M (15%), Q (25%), H (30%)

### Roadmap (Future Formats)

The modular design includes architectural scaffolding for:
- CODE93
- GS1-128
- Data Matrix
- PDF417
- Aztec
- MSI Plessey
- Pharmacode
- ISBN / ISSN

---

## Architecture

The codebase follows a decoupled modular architecture separating UI components, validation pipelines, encoding engines, and export utilities:

```text
src/
├── types/
│   └── barcode.ts            # Type definitions, options, and interfaces
├── utils/
│   ├── checksum.ts           # GS1 Modulo-10 algorithm and UPC-E expansion
│   ├── formatMetadata.ts     # Metadata, specifications, and sample datasets
│   └── export.ts             # SVG download, scaled PNG rasterizer, print handler
├── validators/               # Format-specific validation modules
│   ├── common.ts
│   ├── code128.ts
│   ├── code39.ts
│   ├── ean.ts
│   ├── upc.ts
│   ├── itf.ts
│   ├── codabar.ts
│   ├── qr.ts
│   └── index.ts              # Validator registry and dispatcher
├── generators/               # Format-specific rendering engines
│   ├── types.ts
│   ├── jsbarcodeHelper.ts    # 1D SVG vector renderer and rotation wrapper
│   ├── code128.ts
│   ├── code39.ts
│   ├── ean13.ts
│   ├── ean8.ts
│   ├── upca.ts
│   ├── upce.ts
│   ├── itf.ts
│   ├── itf14.ts
│   ├── codabar.ts
│   ├── qr.ts                 # 2D QR Code vector SVG renderer
│   └── index.ts              # Generator registry and factory dispatcher
├── composables/
│   ├── useTheme.ts           # Light, dark, and system theme manager
│   ├── useHistory.ts         # Local storage barcode history and privacy controls
│   └── useBarcodeGenerator.ts # Reactive debounced generator workflow
├── components/
│   ├── layout/               # Navbar and Footer components
│   └── generator/            # FormatSelector, BarcodeConfigForm, BarcodePreview, ExportActions, BarcodeHistory
├── views/
│   ├── GeneratorView.vue     # Core generator studio
│   ├── FormatsView.vue       # Catalog of supported and roadmap formats
│   ├── FormatDetailView.vue  # Technical specification pages per format
│   └── AboutView.vue         # Privacy principles and offline PWA details
└── router/
    └── index.ts              # Route definitions
```

---

## Local Development

### Prerequisites

- Node.js >= 18.0.0 (Node 24 recommended)
- npm >= 9.0.0

### Installation

```bash
git clone <repository-url>
cd GeneratorBarcode
npm install
```

### Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Build

Compile and bundle production-ready static assets:

```bash
npm run build
```

The output files will be generated in the `dist/` directory, including precached PWA service worker files.

### Preview Production Build

```bash
npm run preview
```

### Run Tests

Execute unit test suites with Vitest:

```bash
npm test
```

---

## Deployment

Because this application operates 100% on the client side, it requires no Node server or backend runtime in production. You can deploy the `dist/` directory directly to any static web host:

- **GitHub Pages**: Deploy `dist/` using GitHub Actions or `gh-pages`.
- **Cloudflare Pages**: Connect your repository and set build command `npm run build` with output directory `dist`.
- **Netlify**: Connect your repository with publish directory set to `dist`.
- **Vercel**: Set Framework Preset to Vite with output directory `dist`.
- **Nginx / Apache**: Copy `dist/` contents directly to your static document root (`/var/www/html`).

---

## Privacy

- **Your barcode data stays in your browser.**
- **No Backend**: There are no API endpoints or microservices processing user data.
- **No Database**: Input values are never stored on any server.
- **No Analytics Tracking**: Input contents are never monitored or transmitted to third parties.
- **Offline Safe**: Once loaded, disconnect your network and generate barcodes securely offline.

