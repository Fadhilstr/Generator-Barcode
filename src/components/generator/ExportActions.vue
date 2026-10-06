<script setup lang="ts">
import { ref } from 'vue'
import type { BarcodeResult, PngScale } from '@/types/barcode'
import { downloadSvg, downloadPng, printBarcode } from '@/utils/export'
import { Download, Printer, Copy, Check, Image as ImageIcon, ChevronDown } from 'lucide-vue-next'

const props = defineProps<{
  result: BarcodeResult | null
  formatName: string
}>()

const selectedScale = ref<PngScale>(2)
const isExportingPng = ref(false)
const copied = ref(false)

function getBaseFilename() {
  const cleanVal = (props.result?.value || 'barcode').replace(/[^a-zA-Z0-9_-]/g, '_')
  const cleanFmt = (props.result?.format || 'barcode').toLowerCase()
  return `${cleanFmt}_${cleanVal}`
}

function handleDownloadSvg() {
  if (!props.result) return
  downloadSvg(props.result.svg, getBaseFilename())
}

async function handleDownloadPng() {
  if (!props.result || isExportingPng.value) return
  isExportingPng.value = true
  try {
    await downloadPng(props.result.svg, getBaseFilename(), selectedScale.value)
  } catch (err) {
    console.error('PNG export failed:', err)
  } finally {
    isExportingPng.value = false
  }
}

function handlePrint() {
  if (!props.result) return
  printBarcode(props.result.svg, props.formatName, props.result.value)
}

async function handleCopySvg() {
  if (!props.result) return
  try {
    await navigator.clipboard.writeText(props.result.svg)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Copy to clipboard failed:', err)
  }
}
</script>

<template>
  <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
    <!-- Download SVG Button -->
    <button
      type="button"
      @click="handleDownloadSvg"
      :disabled="!result"
      class="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      :class="result
        ? 'bg-brand-600 hover:bg-brand-700 text-white active:scale-[0.98]'
        : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'"
    >
      <Download class="w-4 h-4" />
      <span>Download SVG</span>
    </button>

    <!-- Download PNG Button with Scale Selector -->
    <div class="flex-1 flex rounded-lg shadow-sm">
      <button
        type="button"
        @click="handleDownloadPng"
        :disabled="!result || isExportingPng"
        class="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-l-lg text-sm font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        :class="result
          ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 active:scale-[0.98]'
          : 'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'"
      >
        <ImageIcon class="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <span>{{ isExportingPng ? 'Exporting...' : `Download PNG` }}</span>
      </button>

      <!-- Scale Dropdown Selector -->
      <div class="relative border-y border-r border-slate-300 dark:border-slate-700 rounded-r-lg bg-slate-50 dark:bg-slate-800/80">
        <label for="png-scale-select" class="sr-only">PNG Resolution Scale</label>
        <select
          id="png-scale-select"
          v-model.number="selectedScale"
          :disabled="!result"
          class="appearance-none h-full pl-2.5 pr-6 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-transparent rounded-r-lg focus:outline-none cursor-pointer disabled:cursor-not-allowed"
          title="PNG Resolution Multiplier"
        >
          <option :value="1" class="text-slate-900 dark:bg-slate-800 dark:text-white">1x</option>
          <option :value="2" class="text-slate-900 dark:bg-slate-800 dark:text-white">2x (Retina)</option>
          <option :value="3" class="text-slate-900 dark:bg-slate-800 dark:text-white">3x (High)</option>
          <option :value="4" class="text-slate-900 dark:bg-slate-800 dark:text-white">4x (Print)</option>
        </select>
        <ChevronDown class="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-1.5 top-3.5" />
      </div>
    </div>

    <!-- Print Button -->
    <button
      type="button"
      @click="handlePrint"
      :disabled="!result"
      class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      :class="{ 'opacity-50 cursor-not-allowed': !result }"
      title="Print Barcode with dedicated print layout"
    >
      <Printer class="w-4 h-4 text-slate-500 dark:text-slate-400" />
      <span class="hidden sm:inline">Print</span>
    </button>

    <!-- Copy SVG Markup Button -->
    <button
      type="button"
      @click="handleCopySvg"
      :disabled="!result"
      class="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      :class="{ 'opacity-50 cursor-not-allowed': !result }"
      :title="copied ? 'Copied SVG to clipboard!' : 'Copy raw SVG markup'"
    >
      <component :is="copied ? Check : Copy" class="w-4 h-4" :class="copied ? 'text-emerald-600' : 'text-slate-500 dark:text-slate-400'" />
      <span class="sr-only">Copy SVG</span>
    </button>
  </div>
</template>

