<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFormatMetaBySlug } from '@/utils/formatMetadata'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const format = computed(() => {
  const slug = String(route.params.slug || '')
  return getFormatMetaBySlug(slug)
})

function goToGenerator() {
  if (format.value) {
    router.push({
      path: '/generator',
      query: { format: format.value.id, value: format.value.exampleValue }
    })
  }
}
</script>

<template>
  <div class="py-8 sm:py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Back Link -->
      <div>
        <router-link
          to="/formats"
          class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>Back to All Formats</span>
        </router-link>
      </div>

      <div v-if="format" class="space-y-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                {{ format.label }}
              </span>
              <span class="text-xs text-slate-500 font-medium">{{ format.category }} Symbology</span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {{ format.name }}
            </h1>
          </div>

          <button
            type="button"
            @click="goToGenerator"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white shadow-sm active:scale-98 transition-all flex-shrink-0"
          >
            <span>Generate {{ format.label }}</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>

        <!-- Overview Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Description & Specs -->
          <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Technical Overview
            </h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ format.description }}
            </p>

            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div class="text-xs font-semibold text-slate-800 dark:text-slate-200">Encoding Specifications</div>
              <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-mono">
                {{ format.specs }}
              </p>
            </div>
          </div>

          <!-- Character Set & Example -->
          <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Character Set & Data Structure
            </h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ format.characterSet }}
            </p>

            <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div class="text-xs font-semibold text-slate-800 dark:text-slate-200">Standard Test Example</div>
              <div class="p-2.5 rounded bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-200 break-all select-all">
                {{ format.exampleValue }}
              </div>
            </div>
          </div>
        </div>

        <!-- Common Applications -->
        <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Industry Applications
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="app in format.commonUsage"
              :key="app"
              class="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <CheckCircle2 class="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{{ app }}</span>
            </div>
          </div>
        </div>

        <!-- Call to action button banner -->
        <div class="p-6 rounded-xl bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200/60 dark:border-brand-900/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-900 dark:text-white">
              Ready to generate a {{ format.name }} barcode?
            </h3>
            <p class="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Opens the real-time generator with verified test parameters prefilled.
            </p>
          </div>
          <button
            type="button"
            @click="goToGenerator"
            class="px-4 py-2 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 active:scale-98 transition-all flex-shrink-0"
          >
            Open in Generator
          </button>
        </div>
      </div>

      <div v-else class="text-center py-16 space-y-3">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white">Symbology Not Found</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400">The requested barcode format was not found in the specification catalog.</p>
        <router-link to="/formats" class="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
          Return to Formats
        </router-link>
      </div>
    </div>
  </div>
</template>
