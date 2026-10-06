<script setup lang="ts">
import { computed } from 'vue'
import type { BarcodeFormat } from '@/types/barcode'
import { SUPPORTED_FORMATS } from '@/utils/formatMetadata'

defineProps<{
  modelValue: BarcodeFormat
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: BarcodeFormat): void
}>()

const oneDFormats = computed(() => SUPPORTED_FORMATS.filter(f => f.category === '1D'))
const twoDFormats = computed(() => SUPPORTED_FORMATS.filter(f => f.category === '2D'))

function selectFormat(id: BarcodeFormat) {
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <label for="format-select-native" class="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        Barcode Symbology
      </label>
      <router-link
        to="/formats"
        class="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
      >
        View Specs
      </router-link>
    </div>

    <!-- Native select for mobile view or keyboard quick access -->
    <div class="block lg:hidden">
      <select
        id="format-select-native"
        :value="modelValue"
        @change="selectFormat(($event.target as HTMLSelectElement).value as BarcodeFormat)"
        class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <optgroup label="1D Barcodes">
          <option v-for="fmt in oneDFormats" :key="fmt.id" :value="fmt.id">
            {{ fmt.label }} ({{ fmt.name }})
          </option>
        </optgroup>
        <optgroup label="2D Codes">
          <option v-for="fmt in twoDFormats" :key="fmt.id" :value="fmt.id">
            {{ fmt.label }} ({{ fmt.name }})
          </option>
        </optgroup>
      </select>
    </div>

    <!-- Categorized Grid Selector for Desktop & Tablet -->
    <div class="hidden lg:block space-y-4">
      <!-- 1D Formats -->
      <div>
        <div class="text-[11px] font-semibold tracking-wider text-slate-600 dark:text-slate-300 uppercase mb-2">
          1D Linear Barcodes
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="fmt in oneDFormats"
            :key="fmt.id"
            type="button"
            @click="selectFormat(fmt.id)"
            class="p-2.5 rounded-lg border text-left transition-all relative flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-brand-500"
            :class="modelValue === fmt.id
              ? 'border-brand-600 bg-brand-50/70 text-brand-950 dark:border-brand-400 dark:bg-brand-950/60 dark:text-brand-100 shadow-sm'
              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700'"
          >
            <div class="flex items-center justify-between w-full">
              <span class="text-xs font-bold">{{ fmt.label }}</span>
              <span
                v-if="modelValue === fmt.id"
                class="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400"
              />
            </div>
            <p class="text-[11px] text-slate-700 dark:text-slate-300 mt-1 line-clamp-1">
              {{ fmt.description.split('.')[0] }}
            </p>
          </button>
        </div>
      </div>

      <!-- 2D Formats -->
      <div>
        <div class="text-[11px] font-semibold tracking-wider text-slate-600 dark:text-slate-300 uppercase mb-2">
          2D Matrix Codes
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="fmt in twoDFormats"
            :key="fmt.id"
            type="button"
            @click="selectFormat(fmt.id)"
            class="p-2.5 rounded-lg border text-left transition-all relative flex flex-col justify-between group focus:outline-none focus:ring-2 focus:ring-brand-500"
            :class="modelValue === fmt.id
              ? 'border-brand-600 bg-brand-50/70 text-brand-950 dark:border-brand-400 dark:bg-brand-950/60 dark:text-brand-100 shadow-sm'
              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700'"
          >
            <div class="flex items-center justify-between w-full">
              <span class="text-xs font-bold">{{ fmt.label }}</span>
              <span
                v-if="modelValue === fmt.id"
                class="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400"
              />
            </div>
            <p class="text-[11px] text-slate-700 dark:text-slate-300 mt-1 line-clamp-1">
              {{ fmt.description.split('.')[0] }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
