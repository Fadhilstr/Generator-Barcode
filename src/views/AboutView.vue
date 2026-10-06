<script setup lang="ts">
import { ShieldCheck, WifiOff, Database, Server, EyeOff } from 'lucide-vue-next'
</script>

<template>
  <div class="py-8 sm:py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <!-- Header -->
      <div class="max-w-2xl space-y-2">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
          <ShieldCheck class="w-3.5 h-3.5" />
          <span>Zero-Telemetry Architecture</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Client-Side Security & Architectural Principles
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Your barcode data stays in your browser. This application runs entirely on your local machine with zero network transmission.
        </p>
      </div>

      <!-- Core Privacy Guarantees -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="p-6 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
            <Server class="w-5 h-5" />
          </div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">No Backend Processing</h2>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            There is no server-side API, no microservice, and no external endpoint processing your barcodes. The server only delivers static HTML, CSS, and JavaScript files upon initial request.
          </p>
        </div>

        <div class="p-6 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
            <Database class="w-5 h-5" />
          </div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">No Database Storage</h2>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            No remote databases exist to record your serial numbers, tracking identifiers, product codes, or URLs. All state lives exclusively inside your browser runtime memory.
          </p>
        </div>

        <div class="p-6 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
            <EyeOff class="w-5 h-5" />
          </div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">No Content Analytics</h2>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Zero behavioral tracking or content logging inspects your input values. You can safely generate sensitive enterprise inventory codes, private URLs, and internal serial numbers.
          </p>
        </div>

        <div class="p-6 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
            <WifiOff class="w-5 h-5" />
          </div>
          <h2 class="text-sm font-semibold text-slate-900 dark:text-white">Full Offline Capabilities</h2>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Powered by a Progressive Web App (PWA) Service Worker, all generation algorithms and resources cache in your browser. Once loaded, you can disconnect Wi-Fi and continue generating offline indefinitely.
          </p>
        </div>
      </div>

      <!-- Verification Section -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h2 class="text-base font-semibold text-slate-900 dark:text-white">
          How to Verify Network Privacy
        </h2>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          You can inspect this application's behavior independently through your browser developer tools:
        </p>

        <ol class="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
          <li>Open your browser Developer Tools (press <kbd class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[11px]">F12</kbd> or <kbd class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[11px]">Ctrl+Shift+I</kbd>).</li>
          <li>Navigate to the <strong>Network</strong> tab.</li>
          <li>Type any string or number into the generator input and adjust parameters.</li>
          <li>Observe that <strong>zero outbound HTTP requests</strong> or WebSocket connections occur during typing or generation.</li>
          <li>Turn on Airplane Mode or disconnect from the internet; the generator continues functioning seamlessly.</li>
        </ol>
      </div>

      <!-- Static Deployment Ready -->
      <div class="rounded-xl border border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 p-6 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <h3 class="font-semibold text-slate-900 dark:text-white text-sm">Static Hosting & Deployment Target</h3>
        <p class="leading-relaxed">
          Because the application requires no backend or Node.js runtime in production, it deploys directly as static assets to GitHub Pages, Cloudflare Pages, Netlify, Vercel, or custom Nginx hosts.
        </p>
      </div>
    </div>
  </div>
</template>
