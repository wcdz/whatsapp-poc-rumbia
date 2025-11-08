<script setup lang="ts">
import { ref } from 'vue'

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
  isPaymentProcessing.value = true
  
  // Primera notificación
  showNotificationMessage('Procesando pago...')
  
  // Simular autocompletado de PIN
  setTimeout(() => {
    showNotificationMessage('PIN autocompletado: ****')
  }, 1500)
  
  // Simular procesamiento
  setTimeout(() => {
    isPaymentProcessing.value = false
    paymentCompleted.value = true
    paidAmount.value = 150
    showNotificationMessage('¡Pago exitoso! S/ 150.00')
    
    // Cerrar componente de pago y mostrar mensaje final
    setTimeout(() => {
      showPaymentComponent.value = false
      paymentCompleted.value = false
      
      // Mensaje final de Interseguro
      messages.value.push({
        id: messages.value.length + 1,
        text: 'Estamos procesando tu póliza, bienvenido a Interseguro 🎉',
        sender: 'rumbia',
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      })
    }, 2000)
  }, 3000)
}

const closePayment = () => {
  showPaymentComponent.value = false
  paymentCompleted.value = false
  isPaymentProcessing.value = false
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
        <button @click="closePayment" class="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <h3>Interseguro</h3>
        <div class="header-spacer"></div>
      </div>
      
      <div class="payment-content">
        <div class="payment-info">
          <p class="payment-subtitle">Este es un espacio oficial de Interseguro</p>
          <h2 class="contact-name">RUMBIA ASSISTANT</h2>
          <p class="contact-phone">(51) 999-999-999</p>
        </div>
        
        <div class="form-section">
          <h4>Completa los datos</h4>
          
          <div class="form-group">
            <label>Monto</label>
            <div class="amount-input">150</div>
          </div>
          
          <div class="form-group">
            <label>Destino</label>
            <div class="destination-input">
              <span>Interseguro - Póliza</span>
              <button class="clear-btn">×</button>
            </div>
          </div>
          
          <div class="form-group">
            <label>Clave Interseguro</label>
            <p class="clave-desc">Digita código de 4 dígitos que registraste en tu Interseguro App</p>
            <div class="pin-input">
              <div class="pin-dots">
                <div class="pin-dot" :class="{ 'filled': isPaymentProcessing || paymentCompleted }"></div>
                <div class="pin-dot" :class="{ 'filled': isPaymentProcessing || paymentCompleted }"></div>
                <div class="pin-dot" :class="{ 'filled': isPaymentProcessing || paymentCompleted }"></div>
                <div class="pin-dot" :class="{ 'filled': isPaymentProcessing || paymentCompleted }"></div>
              </div>
            </div>
          </div>
          
          <div v-if="paymentCompleted" class="payment-success">
            <div class="success-icon">✅</div>
            <p>¡Pago exitoso!</p>
            <p class="success-amount">Monto pagado: S/ {{ paidAmount }}.00</p>
          </div>
          
          <button 
            @click="processPayment" 
            :disabled="isPaymentProcessing || paymentCompleted"
            class="plinear-button"
          >
            <span v-if="isPaymentProcessing">Procesando...</span>
            <span v-else-if="paymentCompleted">Pago Completado ✅</span>
            <span v-else>Pagar</span>
          </button>
          
          <p class="managed-by">🛡️ Managed by Interseguro. <span class="learn-more">Learn more</span></p>
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
  max-height: 60vh;
  height: auto;
  overflow-y: auto;
  border: none;
}

.payment-sheet.show {
  transform: translateY(0);
}

.payment-handle {
  width: 40px;
  height: 4px;
  background: #ccc;
  border-radius: 2px;
  margin: 12px auto 8px;
}

.payment-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px 16px;
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
  font-size: 17px;
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
  padding: 20px 16px;
  border-bottom: 0.5px solid #f5f5f5;
}

.payment-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.contact-name {
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin: 0 0 4px 0;
}

.contact-phone {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.form-section {
  padding: 16px;
}

.form-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin: 0 0 20px 0;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin-bottom: 8px;
}

.amount-input {
  font-size: 32px;
  font-weight: 700;
  color: #000;
  padding: 8px 0;
}

.destination-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #f8f8f8;
  border-radius: 12px;
  font-size: 16px;
  color: #000;
}

.clear-btn {
  background: #ccc;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clave-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.pin-input {
  margin: 16px 0;
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
  transition: all 0.3s ease;
}

.pin-dot.filled {
  background: #00C851;
  border-color: #00C851;
}

.payment-success {
  text-align: center;
  margin: 20px 0;
  padding: 20px;
  background: #f0f8f0;
  border-radius: 12px;
  border: 1px solid #00C851;
}

.success-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.success-amount {
  font-size: 16px;
  font-weight: 600;
  color: #00C851;
  margin: 8px 0 0 0;
}

.plinear-button {
  width: 100%;
  background: #00C851;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 20px 0;
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
  font-size: 12px;
  color: #666;
  margin: 16px 0 0 0;
}

.learn-more {
  color: #00C851;
  text-decoration: none;
  cursor: pointer;
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
