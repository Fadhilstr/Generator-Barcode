<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBarcodeGenerator } from '@/composables/useBarcodeGenerator'
import { useHistory } from '@/composables/useHistory'
import { getFormatMeta, SUPPORTED_FORMATS } from '@/utils/formatMetadata'
import type { BarcodeHistoryItem } from '@/types/barcode'

import FormatSelector from '@/components/generator/FormatSelector.vue'
import BarcodeConfigForm from '@/components/generator/BarcodeConfigForm.vue'
import BarcodePreview from '@/components/generator/BarcodePreview.vue'
import ExportActions from '@/components/generator/ExportActions.vue'
import BarcodeHistory from '@/components/generator/BarcodeHistory.vue'

const route = useRoute()
const {
  selectedFormat,
  inputValue,
  options,
  validationResult,
  barcodeResult,
  isGenerating,
  generationError,
  setFormat,
  applySuggestedValue,
  resetOptions
} = useBarcodeGenerator()

const {
  historyItems,
  historyEnabled,
  addToHistory,
  removeFromHistory,
  clearHistory,
  toggleHistoryEnabled
} = useHistory()

// Check route query param on mount
onMounted(() => {
  if (route.query.format) {
    const queryFmt = String(route.query.format).toUpperCase()
    const match = SUPPORTED_FORMATS.find(
      f => f.id === queryFmt || f.slug.toLowerCase() === queryFmt.toLowerCase()
    )
    if (match) {
      setFormat(match.id)
    }
  }
  if (route.query.value) {
    inputValue.value = String(route.query.value)
  }
})

// Auto record to history when valid barcode is generated
watch(barcodeResult, (res) => {
  if (res && validationResult.value.isValid) {
    addToHistory(res.format, res.value, options)
  }
})

function onSelectHistoryItem(item: BarcodeHistoryItem) {
  setFormat(item.format)
  inputValue.value = item.value
}
</script>

<template>
  <div class="py-6 sm:py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <!-- Concise Header (Focused, not oversized) -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Client-Side Barcode Generator
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Generate barcodes instantly. No backend. No data upload.
          </p>
        </div>

        <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>100% In-Browser Execution</span>
        </div>
      </div>

      <!-- Main Generator Workspace Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- LEFT COLUMN: Configuration (Width: 5 cols on desktop) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <!-- Format Selector -->
            <FormatSelector
              :model-value="selectedFormat"
              @update:model-value="setFormat"
            />

            <!-- Configuration Form -->
            <BarcodeConfigForm
              :format="selectedFormat"
              :value="inputValue"
              :options="options"
              :validation="validationResult"
              @update:value="inputValue = $event"
              @apply-suggested="applySuggestedValue"
              @reset-options="resetOptions"
            />
          </div>
        </div>

        <!-- RIGHT COLUMN: Preview & Actions & History (Width: 7 cols on desktop) -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Preview & Export Card -->
          <div class="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <BarcodePreview
              :format="selectedFormat"
              :value="inputValue"
              :result="barcodeResult"
              :validation="validationResult"
              :is-generating="isGenerating"
              :generation-error="generationError"
            />

            <ExportActions
              :result="barcodeResult"
              :format-name="getFormatMeta(selectedFormat).name"
            />
          </div>

          <!-- Recent Barcode History Card -->
          <div class="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <BarcodeHistory
              :items="historyItems"
              :enabled="historyEnabled"
              @select-item="onSelectHistoryItem"
              @remove-item="removeFromHistory"
              @clear-all="clearHistory"
              @toggle-enabled="toggleHistoryEnabled"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
