import { ref } from 'vue'
import type { CardData, PaymentStep } from '@/types'
import { DEFAULT_CARD_DATA, PAYMENT_AMOUNTS, TIMING, PAYMENT_MESSAGES } from '@/constants'

export function usePayment() {
  const showPaymentComponent = ref(false)
  const isPaymentProcessing = ref(false)
  const paymentCompleted = ref(false)
  const paidAmount = ref(0)
  const paymentStep = ref<PaymentStep>(1)
  const pinFilledCount = ref(0)
  
  const cardData = ref<CardData>({ ...DEFAULT_CARD_DATA })

  const openPayment = () => {
    showPaymentComponent.value = true
    paymentStep.value = 1
    pinFilledCount.value = 0
  }

  const closePayment = () => {
    showPaymentComponent.value = false
    paymentCompleted.value = false
    isPaymentProcessing.value = false
    paymentStep.value = 1
    pinFilledCount.value = 0
    cardData.value = { ...DEFAULT_CARD_DATA }
  }

  const goToNextStep = () => {
    if (paymentStep.value === 1) {
      paymentStep.value = 2
    }
  }

  const goToPrevStep = () => {
    if (paymentStep.value === 2) {
      paymentStep.value = 1
    }
  }

  const fillPin = (): Promise<void> => {
    return new Promise((resolve) => {
      const fillInterval = setInterval(() => {
        pinFilledCount.value++
        if (pinFilledCount.value >= 4) {
          clearInterval(fillInterval)
          setTimeout(resolve, TIMING.PIN_PAUSE_AFTER_COMPLETE)
        }
      }, TIMING.PIN_FILL_INTERVAL)
    })
  }

  const processPayment = async (
    showNotification: (message: string) => void,
    onSuccess: () => void
  ) => {
    // Llenar el PIN primero
    await fillPin()
    
    // Luego iniciar el loading
    isPaymentProcessing.value = true
    showNotification(PAYMENT_MESSAGES.PROCESSING)
    
    // Simular procesamiento
    setTimeout(() => {
      isPaymentProcessing.value = false
      paymentCompleted.value = true
      paidAmount.value = PAYMENT_AMOUNTS.DEFAULT
      showNotification(`${PAYMENT_MESSAGES.SUCCESS} S/ ${PAYMENT_AMOUNTS.DEFAULT}.00`)
      
      // Cerrar componente de pago y ejecutar callback de éxito
      setTimeout(() => {
        closePayment()
        onSuccess()
      }, TIMING.SUCCESS_DISPLAY)
    }, TIMING.PAYMENT_PROCESSING)
  }

  return {
    // State
    showPaymentComponent,
    isPaymentProcessing,
    paymentCompleted,
    paidAmount,
    paymentStep,
    pinFilledCount,
    cardData,
    
    // Actions
    openPayment,
    closePayment,
    goToNextStep,
    goToPrevStep,
    processPayment
  }
}
