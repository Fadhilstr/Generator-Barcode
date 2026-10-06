<script setup lang="ts">
import { Shield, Cpu, WifiOff } from 'lucide-vue-next'
</script>

<template>
  <footer class="mt-auto border-t border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 transition-colors py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <!-- Brand & Privacy Promise -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-900 dark:text-white">Barcode Generator</span>
            <span class="text-xs px-2 py-0.5 rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 font-medium">Static PWA</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Generate barcodes instantly. No backend. No data upload. All generation logic runs 100% inside your client browser sandbox.
          </p>
        </div>

        <!-- Privacy Pillars -->
        <div class="space-y-2">
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

        <!-- Quick Links -->
        <div class="space-y-2">
          <h4 class="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">Navigation</h4>
          <div class="flex flex-col space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <router-link to="/generator" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Barcode Generator
            </router-link>
            <router-link to="/formats" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Supported Barcode Formats
            </router-link>
            <router-link to="/about" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              Architecture and Privacy Guarantee
            </router-link>
          </div>
        </div>
      </div>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>Your barcode data stays in your browser.</p>
        <p>1D and 2D Symbology Engine</p>
      </div>
    </div>
  </footer>
</template>

