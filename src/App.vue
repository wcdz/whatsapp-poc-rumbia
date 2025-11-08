<script setup lang="ts">
import { ref } from 'vue'
import interseguroLogo from './assets/interseguro_logo.jpeg'

const messages = ref([
  {
    id: 1,
    text: '¡Hola! Bienvenido a RumbIA',
    sender: 'rumbia',
    time: '10:30'
  },
  {
    id: 2,
    text: '¿Cómo puedo ayudarte hoy?',
    sender: 'rumbia',
    time: '10:31'
  }
])

const newMessage = ref('')
const showPaymentComponent = ref(false)
const showNotification = ref(false)
const notificationMessage = ref('')
const isPaymentProcessing = ref(false)
const paymentCompleted = ref(false)
const paidAmount = ref(0)
const paymentStep = ref(1) // 1: datos de tarjeta, 2: confirmación y pago
const pinFilledCount = ref(0) // Para animar el llenado del PIN

// Datos de la tarjeta
const cardData = ref({
  number: '4111 1111 1111 1111',
  holder: 'WILLIAM CHÁVEZ',
  expiry: '12/30',
  cvv: '123',
  email: 'cliente@gmail.com'
})

const sendMessage = () => {
  if (newMessage.value.trim()) {
    const messageText = newMessage.value.trim()
    messages.value.push({
      id: messages.value.length + 1,
      text: messageText,
      sender: 'user',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    })
    newMessage.value = ''
    
    // Detectar si el mensaje es "Pagar"
    if (messageText.toLowerCase() === 'pagar') {
      setTimeout(() => {
        showPaymentComponent.value = true
      }, 500)
    } else {
      // Respuesta automática de RumbIA
      setTimeout(() => {
        messages.value.push({
          id: messages.value.length + 1,
          text: 'Gracias por tu mensaje. RumbIA está aquí para ayudarte.',
          sender: 'rumbia',
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        })
      }, 1000)
    }
  }
}

const showNotificationMessage = (message: string) => {
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const processPayment = async () => {
  // Primero animar el llenado del PIN más lentamente
  const fillPin = () => {
    return new Promise((resolve) => {
      const fillInterval = setInterval(() => {
        pinFilledCount.value++
        if (pinFilledCount.value >= 4) {
          clearInterval(fillInterval)
          setTimeout(resolve, 500) // Pausa más larga después de completar
        }
      }, 300) // Llenar cada 300ms (más lento)
    })
  }
  
  // Llenar el PIN primero
  await fillPin()
  
  // Luego iniciar el loading
  isPaymentProcessing.value = true
  showNotificationMessage('Procesando pago...')
  
  // Simular procesamiento más largo
  setTimeout(() => {
    isPaymentProcessing.value = false
    paymentCompleted.value = true
    paidAmount.value = 150
    showNotificationMessage('¡Pago exitoso! S/ 150.00')
    
    // Cerrar componente de pago y mostrar mensaje final (más tiempo para ver el éxito)
    setTimeout(() => {
      showPaymentComponent.value = false
      paymentCompleted.value = false
      pinFilledCount.value = 0
      
      // Mensaje final de Interseguro
      messages.value.push({
        id: messages.value.length + 1,
        text: 'Estamos procesando tu póliza, bienvenido a Interseguro 🎉',
        sender: 'rumbia',
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      })
    }, 3500)
  }, 4000)
}

const closePayment = () => {
  showPaymentComponent.value = false
  paymentCompleted.value = false
  isPaymentProcessing.value = false
  paymentStep.value = 1
  pinFilledCount.value = 0
  // Restaurar datos de la tarjeta por defecto
  cardData.value = {
    number: '4111 1111 1111 1111',
    holder: 'WILLIAM CHÁVEZ',
    expiry: '12/30',
    cvv: '123',
    email: 'cliente@gmail.com'
  }
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

const formatCardNumber = (value: string) => {
  // Remover espacios y caracteres no numéricos
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  // Agregar espacios cada 4 dígitos
  const matches = v.match(/\d{4,16}/g)
  const match = matches && matches[0] || ''
  const parts = []
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  if (parts.length) {
    return parts.join(' ')
  } else {
    return v
  }
}

const updateCardNumber = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatCardNumber(target.value)
  cardData.value.number = formatted
  target.value = formatted
}

const formatExpiry = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '')
  }
  return v
}

const updateExpiry = (event: Event) => {
  const target = event.target as HTMLInputElement
  const formatted = formatExpiry(target.value)
  cardData.value.expiry = formatted
  target.value = formatted
}

const updateCVV = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '')
  cardData.value.cvv = value
  target.value = value
}
</script>

<template>
  <div class="whatsapp-container">
    <!-- Header -->
    <div class="chat-header">
      <div class="contact-info">
        <div class="avatar">R</div>
        <div class="contact-details">
          <h3>RumbIA</h3>
          <span class="status">En línea</span>
        </div>
      </div>
      <div class="header-actions">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="messages-container">
      <div 
        v-for="message in messages" 
        :key="message.id" 
        :class="['message', message.sender === 'user' ? 'sent' : 'received']"
      >
        <div class="message-content">
          <p>{{ message.text }}</p>
          <span class="message-time">{{ message.time }}</span>
        </div>
      </div>
    </div>

    <!-- Payment Bottom Sheet -->
    <div v-if="showPaymentComponent" class="payment-sheet" :class="{ 'show': showPaymentComponent }">
      <div class="payment-handle"></div>
      
      <div class="payment-header">
        <button @click="paymentStep === 1 ? closePayment() : goToPrevStep()" class="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <h3>
          {{ paymentStep === 1 ? 'Datos de Tarjeta' : 
             isPaymentProcessing ? 'Procesando Pago' : 
             paymentCompleted ? 'Pago Exitoso' : 'Resumen de Compra' }}
        </h3>
        <div class="header-spacer"></div>
      </div>
      
      <div class="payment-content">
        <!-- PASO 1: Datos de Tarjeta -->
        <div v-if="paymentStep === 1" class="card-form">
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
              @click="goToNextStep" 
              :disabled="cardData.number.length < 19 || !cardData.holder || !cardData.email || cardData.expiry.length < 5 || cardData.cvv.length < 3"
              class="plinear-button"
            >
              Siguiente
            </button>
          </div>
        </div>

        <!-- PASO 2: Confirmación y Pago -->
        <div v-if="paymentStep === 2" class="payment-confirmation">
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
              @click="processPayment"
              :disabled="pinFilledCount > 0 && pinFilledCount < 4"
              class="plinear-button"
            >
              <span v-if="pinFilledCount > 0 && pinFilledCount < 4">Ingresando PIN...</span>
              <span v-else>Pagar</span>
            </button>
            
            <p v-if="!isPaymentProcessing && !paymentCompleted" class="managed-by">🛡️ Managed by Interseguro. <span class="learn-more">Learn more</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div v-if="showNotification" class="notification-toast">
      <div class="toast-content">
        <span>{{ notificationMessage }}</span>
      </div>
    </div>

    <!-- Input Area -->
    <div class="input-container">
      <div class="input-wrapper">
        <input 
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text" 
          placeholder="Escribe un mensaje..."
          class="message-input"
        />
        <button @click="sendMessage" class="send-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.whatsapp-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 500px;
  width: 95%;
  margin: 0 auto;
  background: #f0f0f0;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: initial;
  position: relative;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #075e54;
  color: white;
}

.contact-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.contact-details h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.status {
  font-size: 12px;
  opacity: 0.8;
}

.header-actions svg {
  width: 20px;
  height: 20px;
  opacity: 0.8;
  cursor: pointer;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #e5ddd5;
  background-image: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(255,255,255,0.1) 10px,
      rgba(255,255,255,0.1) 20px
    );
}

.message {
  margin-bottom: 12px;
  display: flex;
}

.message.sent {
  justify-content: flex-end;
}

.message.received {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 8px;
  position: relative;
}

.message.sent .message-content {
  background: #dcf8c6;
  border-bottom-right-radius: 3px;
}

.message.received .message-content {
  background: white;
  border-bottom-left-radius: 3px;
}

.message-content p {
  margin: 0 0 4px 0;
  font-size: 14px;
  line-height: 1.4;
}

.message-time {
  font-size: 11px;
  color: #666;
  float: right;
  margin-top: 2px;
}

.input-container {
  padding: 12px;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 20px;
  background: white;
  font-size: 14px;
  outline: none;
}

.send-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #25d366;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.send-button:hover {
  background: #1fa851;
}

.send-button svg {
  width: 20px;
  height: 20px;
}

/* Payment Bottom Sheet Styles */
.payment-sheet {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  z-index: 1000;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.04);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  height: auto;
  overflow-y: visible;
  border: none;
}

.payment-sheet.show {
  transform: translateY(0);
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

.card-holder {
  font-size: 11px !important;
  color: #666 !important;
  margin-top: 2px;
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

/* Notification Toast */
.notification-toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  animation: slideDown 0.3s ease;
}

.toast-content {
  background: #333;
  color: white;
  padding: 15px 25px;
  border-radius: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  font-weight: 500;
  white-space: nowrap;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .payment-modal {
    width: 95%;
    margin: 10px;
  }
  
  .payment-content {
    padding: 20px;
  }
  
  .amount {
    font-size: 28px;
  }
  
  .card-number {
    font-size: 16px;
  }
}
</style>
