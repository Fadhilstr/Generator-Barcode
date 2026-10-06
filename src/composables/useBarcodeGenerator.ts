import { ref, reactive, watch } from 'vue'
import type { BarcodeFormat, BarcodeOptions, BarcodeResult, BarcodeValidationResult } from '@/types/barcode'
import { validateBarcode } from '@/validators'
import { generateBarcode } from '@/generators'
import { getFormatMeta } from '@/utils/formatMetadata'

const defaultOptions: BarcodeOptions = {
  width: 2,
  height: 90,
  margin: 10,
  rotation: 0,
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
  displayValue: true,
  fontSize: 16,
  textAlign: 'center',
  textMargin: 2,
  errorCorrectionLevel: 'M'
}

export function useBarcodeGenerator() {
  const selectedFormat = ref<BarcodeFormat>('CODE128')
  const inputValue = ref<string>('ITEM-987452')
  const options = reactive<BarcodeOptions>({ ...defaultOptions })

  const validationResult = ref<BarcodeValidationResult>({ isValid: true })
  const barcodeResult = ref<BarcodeResult | null>(null)
  const isGenerating = ref(false)
  const generationError = ref<string | null>(null)

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  async function performGeneration() {
    // 1. Validate
    const validation = validateBarcode(selectedFormat.value, inputValue.value)
    validationResult.value = validation

    if (!validation.isValid) {
      barcodeResult.value = null
      generationError.value = null
      return
    }

    // 2. Generate
    isGenerating.value = true
    generationError.value = null

    try {
      const targetValue = validation.normalizedValue || inputValue.value
      const result = await generateBarcode(selectedFormat.value, targetValue, { ...options })
      barcodeResult.value = result
    } catch (err: unknown) {
      barcodeResult.value = null
      const meta = getFormatMeta(selectedFormat.value)
      const rawMsg = err instanceof Error ? err.message : ''
      generationError.value = rawMsg || `Unable to encode ${meta.name} barcode. Please verify format specifications.`
    } finally {
      isGenerating.value = false
    }
  }

  function triggerGenerationDebounced() {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      performGeneration()
    }, 150)
  }

  // React to any change in inputs or options
  watch(
    [
      selectedFormat,
      inputValue,
      () => options.width,
      () => options.height,
      () => options.margin,
      () => options.rotation,
      () => options.foregroundColor,
      () => options.backgroundColor,
      () => options.displayValue,
      () => options.fontSize,
      () => options.textAlign,
      () => options.textMargin,
      () => options.errorCorrectionLevel
    ],
    () => {
      triggerGenerationDebounced()
    },
    { immediate: true }
  )

  function setFormat(format: BarcodeFormat) {
    if (selectedFormat.value === format) return
    selectedFormat.value = format

    // Check if current input is valid for new format; if not, populate with valid example
    const meta = getFormatMeta(format)
    const testValidation = validateBarcode(format, inputValue.value)
    if (!testValidation.isValid) {
      inputValue.value = meta.exampleValue
    }
  }

  function applySuggestedValue() {
    if (validationResult.value.suggestedValue) {
      inputValue.value = validationResult.value.suggestedValue
    }
  }

  function loadExampleValue() {
    const meta = getFormatMeta(selectedFormat.value)
    inputValue.value = meta.exampleValue
  }

  function resetOptions() {
    Object.assign(options, defaultOptions)
  }

  return {
    selectedFormat,
    inputValue,
    options,
    validationResult,
    barcodeResult,
    isGenerating,
    generationError,
    setFormat,
    applySuggestedValue,
    loadExampleValue,
    resetOptions,
    performGeneration
  }
}
