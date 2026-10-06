<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BarcodeFormat, BarcodeOptions, BarcodeValidationResult } from '@/types/barcode'
import { getFormatMeta } from '@/utils/formatMetadata'
import { Sliders, AlertTriangle, RefreshCw } from 'lucide-vue-next'

const props = defineProps<{
  format: BarcodeFormat
  value: string
  options: BarcodeOptions
  validation: BarcodeValidationResult
}>()

const emit = defineEmits<{
  (e: 'update:value', val: string): void
  (e: 'apply-suggested'): void
  (e: 'reset-options'): void
}>()

const activeTab = ref<'dimensions' | 'colors' | 'text'>('dimensions')

const meta = computed(() => getFormatMeta(props.format))
const is1D = computed(() => meta.value.category === '1D')

const charCount = computed(() => props.value.length)

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:value', target.value)
}

function loadSample() {
  emit('update:value', meta.value.exampleValue)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Content Input Section -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label for="barcode-content-input" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Barcode Data Content
        </label>
        <button
          type="button"
          @click="loadSample"
          class="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium inline-flex items-center gap-1 focus:outline-none"
        >
          <RefreshCw class="w-3 h-3" />
          <span>Load Example</span>
        </button>
      </div>

      <div class="relative">
        <input
          id="barcode-content-input"
          type="text"
          :value="value"
          @input="onInput"
          class="w-full rounded-lg border px-3.5 py-2.5 text-sm font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          :class="!validation.isValid
            ? 'border-red-400 bg-red-50/20 text-red-950 focus:border-red-500 dark:border-red-500 dark:bg-red-950/20 dark:text-red-200'
            : 'border-slate-300 bg-white text-slate-900 focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white'"
          :placeholder="meta.exampleValue"
          autocomplete="off"
          spellcheck="false"
        />
        <div class="absolute right-3 top-3 text-[11px] font-mono text-slate-600 dark:text-slate-300 pointer-events-none">
          {{ charCount }} chars
        </div>
      </div>

      <!-- Character set help -->
      <p class="text-xs text-slate-700 dark:text-slate-300">
        {{ meta.characterSet }}
      </p>

      <!-- Suggested value alert / Quick fix button -->
      <div
        v-if="!validation.isValid && validation.suggestedValue"
        class="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800 flex items-center justify-between gap-2"
      >
        <div class="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
          <AlertTriangle class="w-4 h-4 flex-shrink-0 text-amber-600" />
          <span>Calculated value: <strong class="font-mono">{{ validation.suggestedValue }}</strong></span>
        </div>
        <button
          type="button"
          @click="emit('apply-suggested')"
          class="px-2.5 py-1 text-xs font-semibold rounded bg-amber-600 text-white hover:bg-amber-700 active:scale-95 transition-all shadow-sm flex-shrink-0"
        >
          Fix Checksum
        </button>
      </div>
    </div>

    <!-- Customization Options -->
    <div class="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          <Sliders class="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>Customization</span>
        </div>
        <button
          type="button"
          @click="emit('reset-options')"
          class="text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          Reset Defaults
        </button>
      </div>

      <!-- Options Tab Buttons -->
      <div class="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
        <button
          type="button"
          @click="activeTab = 'dimensions'"
          class="flex-1 rounded-md py-1.5 text-xs font-medium transition-colors"
          :class="activeTab === 'dimensions'
            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white font-semibold'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
        >
          Dimensions
        </button>
        <button
          type="button"
          @click="activeTab = 'colors'"
          class="flex-1 rounded-md py-1.5 text-xs font-medium transition-colors"
          :class="activeTab === 'colors'
            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white font-semibold'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
        >
          Colors
        </button>
        <button
          v-if="is1D"
          type="button"
          @click="activeTab = 'text'"
          class="flex-1 rounded-md py-1.5 text-xs font-medium transition-colors"
          :class="activeTab === 'text'
            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white font-semibold'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'"
        >
          Text
        </button>
      </div>

      <!-- TAB 1: Dimensions & Rotation -->
      <div v-show="activeTab === 'dimensions'" class="space-y-4 pt-1">
        <!-- Width (for 1D: bar width multiplier, for 2D: scale) -->
        <div v-if="is1D" class="space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <label for="input-bar-width" class="text-slate-700 dark:text-slate-300 font-medium">Bar Width</label>
            <span class="font-mono text-slate-700 dark:text-slate-300">{{ options.width }}x</span>
          </div>
          <input
            id="input-bar-width"
            type="range"
            min="1"
            max="4"
            step="1"
            v-model.number="options.width"
            class="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        <!-- Height -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <label for="input-barcode-height" class="text-slate-700 dark:text-slate-300 font-medium">
              {{ is1D ? 'Barcode Height' : 'QR Code Scale' }}
            </label>
            <span class="font-mono text-slate-700 dark:text-slate-300">{{ options.height }}px</span>
          </div>
          <input
            id="input-barcode-height"
            type="range"
            min="40"
            max="180"
            step="5"
            v-model.number="options.height"
            class="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        <!-- Quiet Zone Margin -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between text-xs">
            <label for="input-quiet-zone" class="text-slate-700 dark:text-slate-300 font-medium">Quiet Zone (Margin)</label>
            <span class="font-mono text-slate-700 dark:text-slate-300">{{ options.margin }}px</span>
          </div>
          <input
            id="input-quiet-zone"
            type="range"
            min="0"
            max="40"
            step="2"
            v-model.number="options.margin"
            class="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        <!-- Rotation -->
        <div class="space-y-1.5">
          <label class="block text-xs text-slate-700 dark:text-slate-300 font-medium">Orientation</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="deg in [0, 90, 180, 270]"
              :key="deg"
              type="button"
              @click="options.rotation = deg as 0 | 90 | 180 | 270"
              class="py-1.5 text-xs font-medium rounded border text-center transition-colors focus:outline-none focus:ring-1 focus:ring-brand-500"
              :class="options.rotation === deg
                ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-950 dark:text-brand-300 font-semibold'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'"
            >
              {{ deg }}°
            </button>
          </div>
        </div>

        <!-- QR Error Correction (if QR) -->
        <div v-if="!is1D" class="space-y-1.5">
          <label class="block text-xs text-slate-700 dark:text-slate-300 font-medium">Error Correction Level</label>
          <div class="grid grid-cols-4 gap-2">
            <button
              v-for="level in (['L', 'M', 'Q', 'H'] as const)"
              :key="level"
              type="button"
              @click="options.errorCorrectionLevel = level"
              class="py-1.5 text-xs font-medium rounded border text-center transition-colors focus:outline-none focus:ring-1 focus:ring-brand-500"
              :class="options.errorCorrectionLevel === level
                ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-950 dark:text-brand-300 font-semibold'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'"
            >
              {{ level }}
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: Colors -->
      <div v-show="activeTab === 'colors'" class="space-y-4 pt-1">
        <div class="grid grid-cols-2 gap-4">
          <!-- Foreground -->
          <div class="space-y-1.5">
            <label for="color-fg-text" class="block text-xs text-slate-700 dark:text-slate-300 font-medium">Bars / Foreground</label>
            <div class="flex items-center gap-2">
              <input
                id="color-fg-picker"
                type="color"
                v-model="options.foregroundColor"
                class="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-800"
                aria-label="Pick foreground color"
              />
              <input
                id="color-fg-text"
                type="text"
                v-model="options.foregroundColor"
                class="w-full text-xs font-mono rounded border border-slate-300 dark:border-slate-700 px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <!-- Background -->
          <div class="space-y-1.5">
            <label for="color-bg-text" class="block text-xs text-slate-700 dark:text-slate-300 font-medium">Background</label>
            <div class="flex items-center gap-2">
              <input
                id="color-bg-picker"
                type="color"
                v-model="options.backgroundColor"
                class="w-8 h-8 rounded border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-800"
                aria-label="Pick background color"
              />
              <input
                id="color-bg-text"
                type="text"
                v-model="options.backgroundColor"
                class="w-full text-xs font-mono rounded border border-slate-300 dark:border-slate-700 px-2 py-1.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <p class="text-[11px] text-slate-700 dark:text-slate-300 leading-normal">
          High optical contrast between bars and background is essential for reliable scanning with physical hardware sensors.
        </p>
      </div>

      <!-- TAB 3: Text Customization (1D only) -->
      <div v-show="activeTab === 'text' && is1D" class="space-y-4 pt-1">
        <!-- Display Text Toggle -->
        <div class="flex items-center justify-between">
          <label for="toggle-display-value" class="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
            Show Human Readable Text
          </label>
          <input
            id="toggle-display-value"
            type="checkbox"
            v-model="options.displayValue"
            class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 cursor-pointer"
          />
        </div>

        <template v-if="options.displayValue">
          <!-- Font Size -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs">
              <label for="input-font-size" class="text-slate-700 dark:text-slate-300 font-medium">Text Size</label>
              <span class="font-mono text-slate-700 dark:text-slate-300">{{ options.fontSize }}px</span>
            </div>
            <input
              id="input-font-size"
              type="range"
              min="10"
              max="24"
              step="1"
              v-model.number="options.fontSize"
              class="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          <!-- Alignment -->
          <div class="space-y-1.5">
            <label class="block text-xs text-slate-700 dark:text-slate-300 font-medium">Text Alignment</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="align in (['left', 'center', 'right'] as const)"
                :key="align"
                type="button"
                @click="options.textAlign = align"
                class="py-1.5 text-xs font-medium rounded border capitalize text-center transition-colors focus:outline-none focus:ring-1 focus:ring-brand-500"
                :class="options.textAlign === align
                  ? 'border-brand-600 bg-brand-50 text-brand-700 dark:border-brand-400 dark:bg-brand-950 dark:text-brand-300 font-semibold'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'"
              >
                {{ align }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
