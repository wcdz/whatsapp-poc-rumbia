<template>
  <div class="payment-confirmation">
    <div v-if="!isPaymentProcessing && !paymentCompleted" class="payment-info">
      <p class="payment-subtitle">Este es un espacio oficial de Interbank</p>
      <h2 class="contact-name">{{ cardData.holder || 'CLIENTE' }}</h2>
      <p class="contact-phone">(51) 999-999-999</p>
    </div>
    
    <div class="form-section">
      <!-- Payment Details - Only show when not processing/completed -->
      <div v-if="!isPaymentProcessing && !paymentCompleted">
        <h4>Detalle de pago</h4>
        
        <div class="form-group">
          <label>Monto</label>
          <div class="amount-input">S/ 150.00</div>
        </div>
        
        <div class="form-group">
          <label>Destino</label>
          <div class="destination-input">
            <span>Interseguro - Rumbo</span>
            <img :src="interseguroLogo" alt="Interseguro" class="interseguro-logo" />
          </div>
        </div>
        
        <div class="form-group">
          <label>Tarjeta</label>
          <div class="card-summary">
            <span class="card-number">•••• {{ cardData.number.replace(/\s/g, '').slice(-4) || '0000' }}</span>
            <span class="card-details">{{ cardData.expiry || '12/30' }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <div class="card-info">
            <span>{{ cardData.email || 'cliente@gmail.com' }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label>Token</label>
          <p class="clave-desc">Digita código de 4 dígitos de tu banco seleccionado</p>
          <div class="pin-input">
            <div class="pin-dots">
              <div class="pin-dot" :class="{ 'filled': pinFilledCount >= 1 }"></div>
              <div class="pin-dot" :class="{ 'filled': pinFilledCount >= 2 }"></div>
              <div class="pin-dot" :class="{ 'filled': pinFilledCount >= 3 }"></div>
              <div class="pin-dot" :class="{ 'filled': pinFilledCount >= 4 }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="isPaymentProcessing" class="payment-loading">
        <div class="loading-spinner"></div>
        <p class="loading-text">Procesando pago...</p>
      </div>

      <!-- Success State -->
      <div v-if="paymentCompleted" class="payment-success-simple">
        <img :src="interseguroLogo" alt="Interseguro" class="success-logo" />
        <p class="success-message">¡Pago exitoso!</p>
        <p class="success-amount">S/ {{ paidAmount }}.00</p>
      </div>
      
      <!-- Pay Button -->
      <button 
        v-if="!isPaymentProcessing && !paymentCompleted"
        @click="$emit('processPayment')"
        :disabled="pinFilledCount > 0 && pinFilledCount < 4"
        class="plinear-button"
      >
        <span v-if="pinFilledCount > 0 && pinFilledCount < 4">Ingresando PIN...</span>
        <span v-else>Pagar</span>
      </button>
      
      <p v-if="!isPaymentProcessing && !paymentCompleted" class="managed-by">
        🛡️ Managed by Interseguro. <span class="learn-more">Learn more</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardData } from '@/types'
import interseguroLogo from '@/assets/interseguro_logo.jpeg'

interface Props {
  cardData: CardData
  isPaymentProcessing: boolean
  paymentCompleted: boolean
  paidAmount: number
  pinFilledCount: number
}

defineProps<Props>()
defineEmits<{
  processPayment: []
}>()
</script>

<style scoped>
.payment-info {
  padding: 8px 16px;
  border-bottom: 0.5px solid #f5f5f5;
}

.payment-subtitle {
  font-size: 12px;
  color: #666;
  margin: 0 0 6px 0;
}

.contact-name {
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin: 0 0 2px 0;
}

.contact-phone {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.form-section {
  padding: 8px 16px 12px;
}

.form-section h4 {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #000;
  margin-bottom: 4px;
}

.amount-input {
  font-size: 20px;
  font-weight: 700;
  color: #000;
  padding: 2px 0;
}

.destination-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: #f8f8f8;
  border-radius: 6px;
  font-size: 13px;
  color: #000;
}

.interseguro-logo {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  object-fit: contain;
  background: white;
  padding: 2px;
}

.card-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #f8f8f8;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.card-number {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  letter-spacing: 0.5px;
}

.card-details {
  font-size: 12px;
  color: #666;
  font-weight: 400;
}

.card-info {
  padding: 8px 10px;
  background: #f8f8f8;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.card-info span {
  display: block;
  font-size: 13px;
  color: #333;
}

.clave-desc {
  font-size: 11px;
  color: #666;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.pin-input {
  margin: 6px 0;
}

.pin-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.pin-dot {
  width: 12px;
  height: 12px;
  border: 2px solid #ddd;
  border-radius: 50%;
  transition: all 0.4s ease;
  transform: scale(1);
}

.pin-dot.filled {
  background: #00C851;
  border-color: #00C851;
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(0, 200, 81, 0.3);
}

/* Loading Styles */
.payment-loading {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #00C851;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 12px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 14px;
  color: #666;
  margin: 0;
}

/* Simple Success Styles */
.payment-success-simple {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
}

.success-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: contain;
  background: white;
  padding: 4px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.success-message {
  font-size: 16px;
  font-weight: 600;
  color: #00C851;
  margin: 0 0 8px 0;
}

.success-amount {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.plinear-button {
  width: 100%;
  background: #00C851;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 8px 0;
}

.plinear-button:hover:not(:disabled) {
  background: #00A83F;
}

.plinear-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.managed-by {
  text-align: center;
  font-size: 10px;
  color: #666;
  margin: 4px 0 0 0;
}

.learn-more {
  color: #00C851;
  text-decoration: none;
  cursor: pointer;
}
</style>
