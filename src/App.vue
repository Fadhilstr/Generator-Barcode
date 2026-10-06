<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white transition-colors duration-150">
    <AppNavbar />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style>
/* Print stylesheet overrides */
@media print {
  header, footer, nav, button, select, input {
    display: none !important;
  }
  body {
    background: #ffffff !important;
    color: #000000 !important;
  }
}
</style>

