<script setup lang="ts">
import { computed } from 'vue'
import type { BarcodeResult, BarcodeValidationResult, BarcodeFormat } from '@/types/barcode'
import { getFormatMeta } from '@/utils/formatMetadata'
import { AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-vue-next'

const props = defineProps<{
  format: BarcodeFormat
  value: string
  result: BarcodeResult | null
  validation: BarcodeValidationResult
  isGenerating: boolean
  generationError: string | null
}>()

const emit = defineEmits<{
  (e: 'load-example'): void
  (e: 'apply-suggested'): void
}>()

const meta = computed(() => getFormatMeta(props.format))

const errorTitle = computed(() => {
  if (props.generationError) return 'Encoding Specification Error'
  switch (props.validation.errorCategory) {
    case 'INVALID_FORMAT':
      return 'Format Structure Mismatch'
    case 'INVALID_LENGTH':
      return 'Invalid Character Length'
    case 'INVALID_CHARACTER':
      return 'Unsupported Character Detected'
    case 'INVALID_CHECKSUM':
      return 'Checksum Verification Failed'
    case 'UNSUPPORTED_FORMAT':
      return 'Symbology Unsupported'
    default:
      return 'Validation Notice'
  }
})

const errorMessage = computed(() => {
  if (!props.validation.isValid) {
    return props.validation.error || `Input does not meet requirements for ${meta.value.name}.`
  }
  if (props.generationError) {
    return props.generationError
  }
  return ''
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
          v-if="result && validation.isValid && !generationError"
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
      class="relative flex-1 min-h-[280px] sm:min-h-[340px] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900/60 p-6 flex flex-col items-center justify-center overflow-hidden transition-all"
    >
      <!-- Background subtle grid pattern for vector precision feel -->
      <div
        class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 16px 16px;"
      ></div>

      <!-- Valid Barcode Display -->
      <div
        v-if="result && validation.isValid && !generationError"
        class="relative max-w-full flex flex-col items-center justify-center p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-sm transition-transform"
      >
        <!-- Injected SVG -->
        <div
          v-html="result.svg"
          class="barcode-svg-container max-w-full overflow-x-auto flex items-center justify-center"
        ></div>
      </div>

      <!-- Comprehensive Error Handling Container -->
      <div
        v-else-if="!validation.isValid || generationError"
        class="max-w-md w-full p-5 rounded-xl border border-red-200 bg-red-50/95 dark:border-red-900/60 dark:bg-red-950/50 text-left space-y-4 z-10 shadow-sm"
      >
        <!-- Title and Icon -->
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/60 text-red-600 dark:text-red-300 flex items-center justify-center flex-shrink-0">
            <AlertCircle class="w-5 h-5" />
          </div>
          <div class="space-y-0.5">
            <h4 class="text-sm font-semibold text-red-900 dark:text-red-200">
              {{ errorTitle }}
            </h4>
            <p class="text-xs text-red-700 dark:text-red-300 leading-relaxed">
              {{ errorMessage }}
            </p>
          </div>
        </div>

        <!-- Format Requirements Guide -->
        <div class="p-3 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-red-100 dark:border-red-950 text-xs space-y-1.5">
          <div class="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>Syarat Format {{ meta.name }}:</span>
          </div>
          <div class="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
            <p><span class="font-medium text-slate-700 dark:text-slate-300">Karakter:</span> {{ meta.characterSet }}</p>
            <p><span class="font-medium text-slate-700 dark:text-slate-300">Panjang:</span> {{ meta.specs }}</p>
          </div>
        </div>

        <!-- Quick Recovery Action Buttons -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          <!-- Auto-fix checksum button if suggestion available -->
          <button
            v-if="validation.suggestedValue"
            type="button"
            @click="emit('apply-suggested')"
            class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-700 active:scale-98 text-white shadow-sm transition-all"
          >
            <CheckCircle2 class="w-3.5 h-3.5" />
            <span>Perbaiki Otomatis ({{ validation.suggestedValue }})</span>
          </button>

          <!-- Load Valid Working Example -->
          <button
            type="button"
            @click="emit('load-example')"
            class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 active:scale-98 shadow-sm transition-all"
          >
            <RefreshCw class="w-3.5 h-3.5" />
            <span>Gunakan Contoh Valid</span>
          </button>
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
