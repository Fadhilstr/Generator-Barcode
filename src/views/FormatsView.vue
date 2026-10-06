<script setup lang="ts">
import { computed } from 'vue'
import { SUPPORTED_FORMATS, FUTURE_FORMATS } from '@/utils/formatMetadata'
import { ArrowRight, QrCode, BarChart2, Clock } from 'lucide-vue-next'

const oneD = computed(() => SUPPORTED_FORMATS.filter(f => f.category === '1D'))
const twoD = computed(() => SUPPORTED_FORMATS.filter(f => f.category === '2D'))
</script>

<template>
  <div class="py-8 sm:py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <!-- Section Intro -->
      <div class="max-w-2xl">
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Supported Barcode Symbologies
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Comprehensive technical specifications for all 1D linear and 2D matrix formats rendered natively client-side in the browser.
        </p>
      </div>

      <!-- 1D Linear Barcodes Section -->
      <div class="space-y-6">
        <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div class="w-7 h-7 rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 flex items-center justify-center">
            <BarChart2 class="w-4 h-4" />
          </div>
          <h2 class="text-base font-semibold text-slate-900 dark:text-white">
            1D Linear Barcodes
          </h2>
          <span class="text-xs text-slate-400 font-mono">({{ oneD.length }} formats)</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="fmt in oneD"
            :key="fmt.id"
            class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-brand-700 dark:text-brand-300">
                  {{ fmt.label }}
                </span>
                <span class="text-[11px] text-slate-400 font-medium">1D Symbology</span>
              </div>

              <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ fmt.name }}
              </h3>

              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ fmt.description }}
              </p>

              <div class="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span class="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Key Applications</span>
                <ul class="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                  <li v-for="usage in fmt.commonUsage.slice(0, 2)" :key="usage" class="truncate">
                    • {{ usage }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <router-link
                :to="`/formats/${fmt.slug}`"
                class="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
              >
                Specifications
              </router-link>
              <router-link
                :to="`/generator?format=${fmt.id}`"
                class="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Generate</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- 2D Matrix Codes Section -->
      <div class="space-y-6">
        <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div class="w-7 h-7 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 flex items-center justify-center">
            <QrCode class="w-4 h-4" />
          </div>
          <h2 class="text-base font-semibold text-slate-900 dark:text-white">
            2D Matrix Codes
          </h2>
          <span class="text-xs text-slate-400 font-mono">({{ twoD.length }} format)</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="fmt in twoD"
            :key="fmt.id"
            class="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300">
                  {{ fmt.label }}
                </span>
                <span class="text-[11px] text-slate-400 font-medium">2D Matrix</span>
              </div>

              <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
                {{ fmt.name }}
              </h3>

              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {{ fmt.description }}
              </p>

              <div class="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span class="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Key Applications</span>
                <ul class="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                  <li v-for="usage in fmt.commonUsage.slice(0, 2)" :key="usage" class="truncate">
                    • {{ usage }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <router-link
                :to="`/formats/${fmt.slug}`"
                class="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
              >
                Specifications
              </router-link>
              <router-link
                :to="`/generator?format=${fmt.id}`"
                class="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Generate</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Roadmap / Future Formats Notice -->
      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 space-y-4">
        <div class="flex items-center gap-2">
          <Clock class="w-4 h-4 text-slate-500" />
          <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
            Symbology Roadmap & Extension Architecture
          </h3>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The modular architecture isolates generator engines behind the BarcodeGenerator interface. Future encoders will integrate without altering existing validation pipelines or UI components.
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div
            v-for="fut in FUTURE_FORMATS"
            :key="fut.name"
            class="p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">{{ fut.name }}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">{{ fut.status }}</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
              {{ fut.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
