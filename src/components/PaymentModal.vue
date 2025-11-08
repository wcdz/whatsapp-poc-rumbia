<template>
  <div v-if="showPaymentComponent" class="payment-sheet" :class="{ 'show': showPaymentComponent }">
    <div class="payment-handle"></div>
    
    <div class="payment-header">
      <button @click="handleBackClick" class="back-btn">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
      </button>
      <h3>{{ headerTitle }}</h3>
      <div class="header-spacer"></div>
    </div>
    
    <div class="payment-content">
      <!-- PASO 1: Datos de Tarjeta -->
      <PaymentCardForm
        v-if="paymentStep === 1"
        :card-data="cardData"
        @next="$emit('nextStep')"
      />

      <!-- PASO 2: Confirmación y Pago -->
      <PaymentConfirmation
        v-if="paymentStep === 2"
        :card-data="cardData"
        :is-payment-processing="isPaymentProcessing"
        :payment-completed="paymentCompleted"
        :paid-amount="paidAmount"
        :pin-filled-count="pinFilledCount"
        @process-payment="$emit('processPayment')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardData, PaymentStep } from '@/types'
import PaymentCardForm from './PaymentCardForm.vue'
import PaymentConfirmation from './PaymentConfirmation.vue'

interface Props {
  showPaymentComponent: boolean
  paymentStep: PaymentStep
  cardData: CardData
  isPaymentProcessing: boolean
  paymentCompleted: boolean
  paidAmount: number
  pinFilledCount: number
}

const props = defineProps<Props>()

const headerTitle = computed(() => {
  if (props.paymentStep === 1) return 'Datos de Tarjeta'
  if (props.isPaymentProcessing) return 'Procesando Pago'
  if (props.paymentCompleted) return 'Pago Exitoso'
  return 'Resumen de Compra'
})

const emit = defineEmits<{
  close: []
  prevStep: []
  nextStep: []
  processPayment: []
}>()

const handleBackClick = () => {
  if (props.paymentStep === 1) {
    emit('close')
  } else {
    emit('prevStep')
  }
}
</script>

<style scoped>
/* Payment Bottom Sheet Styles */
.payment-sheet {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  width: 100%;
  max-width: 500px;
  background: white;
  z-index: 1000;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
  height: auto;
  overflow-y: visible;
  border: none;
}

.payment-sheet.show {
  transform: translateX(-50%) translateY(0);
}

.payment-handle {
  width: 35px;
  height: 3px;
  background: #ccc;
  border-radius: 2px;
  margin: 8px auto 6px;
}

.payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px 8px;
  border-bottom: 0.5px solid #f0f0f0;
  background: white;
}

.back-btn {
  background: none;
  border: none;
  color: #007AFF;
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background: rgba(0, 122, 255, 0.1);
}

.payment-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #000;
}

.header-spacer {
  width: 40px;
}

.payment-content {
  background: white;
  padding: 0;
}
</style>
