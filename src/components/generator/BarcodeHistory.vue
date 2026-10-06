<script setup lang="ts">
import type { BarcodeHistoryItem } from '@/types/barcode'
import { History, Trash2, ArrowUpRight, Shield, ShieldOff } from 'lucide-vue-next'

defineProps<{
  items: BarcodeHistoryItem[]
  enabled: boolean
}>()

const emit = defineEmits<{
  (e: 'select-item', item: BarcodeHistoryItem): void
  (e: 'remove-item', id: string): void
  (e: 'clear-all'): void
  (e: 'toggle-enabled', val: boolean): void
}>()

function formatTimestamp(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="space-y-4">
    <!-- Header with clear and privacy controls -->
    <div class="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
      <div class="flex items-center gap-2">
        <History class="w-4 h-4 text-brand-600 dark:text-brand-400" />
        <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Recent Barcodes
        </h3>
        <span class="text-xs font-mono text-slate-400">({{ items.length }})</span>
      </div>

      <div class="flex items-center gap-3">
        <!-- Privacy Toggle -->
        <button
          type="button"
          @click="emit('toggle-enabled', !enabled)"
          class="inline-flex items-center gap-1 text-xs transition-colors"
          :class="enabled
            ? 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            : 'text-amber-600 dark:text-amber-400 font-medium'"
          :title="enabled ? 'Click to disable saving history' : 'History is paused (private mode)'"
        >
          <component :is="enabled ? Shield : ShieldOff" class="w-3.5 h-3.5" />
          <span class="text-[11px]">{{ enabled ? 'Save On' : 'Paused' }}</span>
        </button>

        <!-- Clear Button -->
        <button
          v-if="items.length > 0"
          type="button"
          @click="emit('clear-all')"
          class="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- History is Paused Notice -->
    <div
      v-if="!enabled"
      class="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 text-center"
    >
      History is currently paused. New barcodes will not be saved locally.
    </div>

    <!-- Empty State -->
    <div
      v-else-if="items.length === 0"
      class="py-6 text-center text-xs text-slate-400 dark:text-slate-500"
    >
      No generated barcodes yet. Generated codes will appear here for easy retrieval.
    </div>

    <!-- Items List -->
    <div v-else class="space-y-2 max-h-56 overflow-y-auto pr-1">
      <div
        v-for="item in items"
        :key="item.id"
        class="group flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 transition-all text-xs"
      >
        <div class="flex items-center gap-2.5 min-w-0 pr-2">
          <span class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300 flex-shrink-0">
            {{ item.format }}
          </span>
          <span class="font-mono text-slate-900 dark:text-white truncate font-medium">
            {{ item.value }}
          </span>
          <span class="text-[10px] text-slate-400 flex-shrink-0 hidden sm:inline">
            {{ formatTimestamp(item.createdAt) }}
          </span>
        </div>

        <div class="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            @click="emit('select-item', item)"
            class="px-2 py-1 rounded bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-950 dark:hover:text-brand-300 font-medium inline-flex items-center gap-0.5 transition-colors"
            title="Load back into generator"
          >
            <span>Load</span>
            <ArrowUpRight class="w-3 h-3" />
          </button>
          <button
            type="button"
            @click="emit('remove-item', item.id)"
            class="p-1 rounded text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete from history"
          >
            <Trash2 class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
