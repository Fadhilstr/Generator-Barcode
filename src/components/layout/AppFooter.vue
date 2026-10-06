<script setup lang="ts">
import { Shield, Cpu, WifiOff } from 'lucide-vue-next'
</script>

<template>
  <footer class="mt-auto border-t border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 transition-colors py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <!-- Brand & Privacy Promise -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-900 dark:text-white">Barcode Generator</span>
            <span class="text-xs px-2 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-medium">Static PWA</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
            Generate barcodes instantly. No backend. No data upload. All generation logic runs 100% inside your client browser sandbox.
          </p>
        </div>

        <!-- Privacy Pillars -->
        <div class="space-y-2 md:justify-self-end">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">Guarantees</h4>
          <ul class="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <li class="flex items-center gap-2">
              <Shield class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>Zero telemetry or tracking on barcode content</span>
            </li>
            <li class="flex items-center gap-2">
              <Cpu class="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
              <span>Client-side JavaScript and vector rendering</span>
            </li>
            <li class="flex items-center gap-2">
              <WifiOff class="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
              <span>Full offline operation via Progressive Web App</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>Your barcode data stays in your browser.</p>
        <p>1D and 2D Symbology Engine</p>
      </div>
    </div>
  </footer>
</template>
