<script setup lang="ts">
import { computed } from 'vue'
import type { BarcodeResult, BarcodeValidationResult, BarcodeFormat } from '@/types/barcode'
import { AlertCircle, ShieldAlert } from 'lucide-vue-next'

const props = defineProps<{
  format: BarcodeFormat
  value: string
  result: BarcodeResult | null
  validation: BarcodeValidationResult
  isGenerating: boolean
  generationError: string | null
}>()

const errorTitle = computed(() => {
  if (props.generationError) return 'Rendering Engine Error'
  switch (props.validation.errorCategory) {
    case 'INVALID_FORMAT':
      return 'Format Mismatch'
    case 'INVALID_LENGTH':
      return 'Invalid Length'
    case 'INVALID_CHARACTER':
      return 'Unsupported Character'
    case 'INVALID_CHECKSUM':
      return 'Checksum Verification Failed'
    case 'UNSUPPORTED_FORMAT':
      return 'Symbology Unsupported'
    default:
      return 'Validation Notice'
  }
})
</script>

<template>
  <div class="flex flex-col h-full space-y-4">
    <!-- Header of preview card -->
    <div class="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
      <div class="flex items-center gap-2">
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Live Vector Preview
        </h3>
        <span
          v-if="result"
          class="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          {{ result.width }} × {{ result.height }}px
        </span>
      </div>

      <div class="text-xs text-slate-700 dark:text-slate-300 font-mono">
        {{ format }}
      </div>
    </div>

    <!-- Main Canvas Viewport -->
    <div
      class="relative flex-1 min-h-[260px] sm:min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 p-6 flex flex-col items-center justify-center overflow-hidden transition-all"
    >
      <!-- Background subtle grid pattern for vector precision feel -->
      <div
        class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 16px 16px;"
      ></div>

      <!-- Valid Barcode Display -->
      <div
        v-if="result && validation.isValid"
        class="relative max-w-full flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm transition-transform"
      >
        <!-- Injected SVG -->
        <div
          v-html="result.svg"
          class="barcode-svg-container max-w-full overflow-x-auto flex items-center justify-center"
        ></div>
      </div>

      <!-- Validation Error Notice -->
      <div
        v-else-if="!validation.isValid"
        class="max-w-md w-full p-5 rounded-xl border border-red-200 bg-red-50/90 dark:border-red-900/60 dark:bg-red-950/40 text-center space-y-2.5 z-10"
      >
        <div class="w-10 h-10 mx-auto rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center">
          <AlertCircle class="w-5 h-5" />
        </div>
        <div>
          <h4 class="text-sm font-semibold text-red-900 dark:text-red-200">
            {{ errorTitle }}
          </h4>
          <p class="text-xs text-red-700 dark:text-red-300 mt-1 leading-relaxed">
            {{ validation.error }}
          </p>
        </div>
      </div>

      <!-- Generation Engine Error -->
      <div
        v-else-if="generationError"
        class="max-w-md w-full p-5 rounded-xl border border-amber-200 bg-amber-50/90 dark:border-amber-900/60 dark:bg-amber-950/40 text-center space-y-2.5 z-10"
      >
        <div class="w-10 h-10 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <ShieldAlert class="w-5 h-5" />
        </div>
        <div>
          <h4 class="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Barcode Rendering Notice
          </h4>
          <p class="text-xs text-amber-700 dark:text-amber-300 mt-1 leading-relaxed">
            {{ generationError }}
          </p>
        </div>
      </div>

      <!-- Loading Placeholder -->
      <div v-else-if="isGenerating" class="text-xs text-slate-700 dark:text-slate-300 animate-pulse">
        Rendering vector barcode...
      </div>
    </div>
  </div>
</template>

<style scoped>
.barcode-svg-container :deep(svg) {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
