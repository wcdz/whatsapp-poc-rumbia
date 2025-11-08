<template>
  <div class="card-form">
    <div class="payment-info">
      <p class="payment-subtitle">Ingresa los datos de tu tarjeta</p>
      <h2 class="contact-name">PAGO SEGURO</h2>
      <p class="contact-phone">Interseguro - Rumbo</p>
    </div>
    
    <div class="form-section">
      <div class="form-group">
        <label>Número de Tarjeta</label>
        <input 
          type="text" 
          v-model="cardData.number"
          @input="updateCardNumber"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
          class="card-input"
        />
      </div>
      
      <div class="form-row">
        <div class="form-group form-group-half">
          <label>Fecha de Expiración</label>
          <input 
            type="text" 
            v-model="cardData.expiry"
            @input="updateExpiry"
            placeholder="MM/AA"
            maxlength="5"
            class="card-input"
          />
        </div>
        
        <div class="form-group form-group-half">
          <label>CVV</label>
          <input 
            type="text" 
            v-model="cardData.cvv"
            @input="updateCVV"
            placeholder="123"
            maxlength="4"
            class="card-input"
          />
        </div>
      </div>
      
      <div class="form-group">
        <label>Nombre del Titular</label>
        <input 
          type="text" 
          v-model="cardData.holder"
          placeholder="JUAN PÉREZ"
          class="card-input"
          style="text-transform: uppercase;"
        />
      </div>
      
      <div class="form-group">
        <label>Correo Electrónico</label>
        <input 
          type="email" 
          v-model="cardData.email"
          placeholder="cliente@gmail.com"
          class="card-input"
        />
      </div>
      
      <button 
        @click="$emit('next')" 
        :disabled="!isFormValid"
        class="plinear-button"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardData } from '@/types'
import { updateCardNumber as updateCardNumberUtil, updateExpiry as updateExpiryUtil, updateCVV as updateCVVUtil } from '@/utils/cardFormatters'

interface Props {
  cardData: CardData
}

const props = defineProps<Props>()
defineEmits<{
  next: []
}>()

const updateCardNumber = (event: Event) => {
  updateCardNumberUtil(event, { value: props.cardData })
}

const updateExpiry = (event: Event) => {
  updateExpiryUtil(event, { value: props.cardData })
}

const updateCVV = (event: Event) => {
  updateCVVUtil(event, { value: props.cardData })
}

const isFormValid = computed(() => {
  return props.cardData.number.length >= 19 && 
         props.cardData.holder.length > 0 && 
         props.cardData.email.length > 0 && 
         props.cardData.expiry.length >= 5 && 
         props.cardData.cvv.length >= 3
})
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

/* Card Form Styles */
.card-input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.card-input:focus {
  outline: none;
  border-color: #00C851;
}

.form-row {
  display: flex;
  gap: 8px;
}

.form-group-half {
  flex: 1;
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
</style>
