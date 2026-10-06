import { ref, onMounted } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const currentTheme = ref<ThemeMode>('system')
const isDark = ref(false)

function applyTheme(mode: ThemeMode) {
  currentTheme.value = mode
  localStorage.setItem('barcode_theme', mode)

  let dark = false
  if (mode === 'dark') {
    dark = true
  } else if (mode === 'light') {
    dark = false
  } else {
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  isDark.value = dark
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function useTheme() {
  onMounted(() => {
    const saved = localStorage.getItem('barcode_theme') as ThemeMode | null
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      applyTheme(saved)
    } else {
      applyTheme('system')
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      if (currentTheme.value === 'system') {
        isDark.value = e.matches
        if (e.matches) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
    })
  })

  function setTheme(mode: ThemeMode) {
    applyTheme(mode)
  }

  return {
    theme: currentTheme,
    isDark,
    setTheme
  }
}
