import { ref, onMounted } from 'vue'
import type { BarcodeFormat, BarcodeHistoryItem, BarcodeOptions } from '@/types/barcode'

const STORAGE_KEY = 'barcode_recent_history'
const STORAGE_ENABLED_KEY = 'barcode_history_enabled'

const historyItems = ref<BarcodeHistoryItem[]>([])
const historyEnabled = ref(true)

function loadHistory() {
  const enabledSetting = localStorage.getItem(STORAGE_ENABLED_KEY)
  if (enabledSetting !== null) {
    historyEnabled.value = enabledSetting === 'true'
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      historyItems.value = JSON.parse(raw)
    } catch {
      historyItems.value = []
    }
  }
}

function saveHistory() {
  if (!historyEnabled.value) {
    localStorage.removeItem(STORAGE_KEY)
    historyItems.value = []
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems.value))
}

export function useHistory() {
  onMounted(() => {
    loadHistory()
  })

  function addToHistory(format: BarcodeFormat, value: string, options: BarcodeOptions) {
    if (!historyEnabled.value || !value.trim()) return

    // Remove duplicates of same format and value
    historyItems.value = historyItems.value.filter(
      item => !(item.format === format && item.value === value)
    )

    const newItem: BarcodeHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      format,
      value,
      createdAt: Date.now(),
      optionsSummary: {
        width: options.width,
        height: options.height,
        margin: options.margin
      }
    }

    // Keep up to 20 most recent items
    historyItems.value.unshift(newItem)
    if (historyItems.value.length > 20) {
      historyItems.value = historyItems.value.slice(0, 20)
    }

    saveHistory()
  }

  function removeFromHistory(id: string) {
    historyItems.value = historyItems.value.filter(item => item.id !== id)
    saveHistory()
  }

  function clearHistory() {
    historyItems.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  function toggleHistoryEnabled(enabled: boolean) {
    historyEnabled.value = enabled
    localStorage.setItem(STORAGE_ENABLED_KEY, String(enabled))
    if (!enabled) {
      clearHistory()
    }
  }

  return {
    historyItems,
    historyEnabled,
    addToHistory,
    removeFromHistory,
    clearHistory,
    toggleHistoryEnabled
  }
}

