<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { Sun, Moon, Monitor, ShieldCheck, QrCode } from 'lucide-vue-next'

const route = useRoute()
const { theme, setTheme } = useTheme()

const isCurrentRoute = (path: string) => {
  return route.path === path
}

const themeIcon = computed(() => {
  if (theme.value === 'dark') return Moon
  if (theme.value === 'light') return Sun
  return Monitor
})

function cycleTheme() {
  if (theme.value === 'system') {
    setTheme('light')
  } else if (theme.value === 'light') {
    setTheme('dark')
  } else {
    setTheme('system')
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/95 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo & Brand -->
      <router-link to="/generator" class="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1 -m-1">
        <div class="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-sm shadow-brand-500/20 group-hover:bg-brand-700 transition-colors">
          <QrCode class="w-5 h-5" />
        </div>
        <div class="flex flex-col">
          <span class="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">Barcode Generator</span>
          <span class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">100% Client-Side Engine</span>
        </div>
      </router-link>

      <!-- Nav Links -->
      <nav class="hidden md:flex items-center gap-1" aria-label="Main Navigation">
        <router-link
          to="/generator"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="isCurrentRoute('/generator') ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'"
        >
          Generator
        </router-link>
        <router-link
          to="/formats"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="isCurrentRoute('/formats') ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'"
        >
          Supported Formats
        </router-link>
        <router-link
          to="/about"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="isCurrentRoute('/about') ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'"
        >
          About & Privacy
        </router-link>
      </nav>

      <!-- Right Actions: Privacy Badge & Theme Toggle -->
      <div class="flex items-center gap-3">
        <!-- Privacy Badge -->
        <div class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
          <ShieldCheck class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Zero Data Upload</span>
        </div>

        <!-- Theme Toggle -->
        <button
          type="button"
          @click="cycleTheme"
          class="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          :title="`Theme: ${theme} (Click to switch)`"
          aria-label="Toggle theme mode"
        >
          <component :is="themeIcon" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </header>
</template>
