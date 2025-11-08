<script setup lang="ts">
import ChatContainer from '@/components/ChatContainer.vue'
import PaymentModal from '@/components/PaymentModal.vue'
import NotificationToast from '@/components/NotificationToast.vue'
import { useMessages } from '@/composables/useMessages'
import { usePayment } from '@/composables/usePayment'
import { useNotifications } from '@/composables/useNotifications'
import { PAYMENT_MESSAGES } from '@/constants'

// Composables
const { messages, newMessage, sendMessage, addAutoResponse, addRumbiaMessage } = useMessages()
const { 
  showPaymentComponent, 
  isPaymentProcessing, 
  paymentCompleted, 
  paidAmount, 
  paymentStep, 
  pinFilledCount, 
  cardData,
  openPayment,
  closePayment,
  goToNextStep,
  goToPrevStep,
  processPayment
} = usePayment()
const { showNotification, notificationMessage, showNotificationMessage } = useNotifications()

// Handle message sending
const handleSendMessage = () => {
  const messageText = sendMessage()
  
  if (messageText) {
    // Detectar si el mensaje es "Pagar"
    if (messageText.toLowerCase() === 'pagar') {
      setTimeout(() => {
        openPayment()
      }, 500)
    } else {
      // Respuesta automática de RumbIA
      addAutoResponse()
    }
  }
}

// Handle payment processing
const handleProcessPayment = async () => {
  await processPayment(
    showNotificationMessage,
    () => {
      // Success callback
      addRumbiaMessage(PAYMENT_MESSAGES.FINAL_MESSAGE)
    }
  )
}
</script>

<template>
  <ChatContainer 
    :messages="messages" 
    v-model:new-message="newMessage" 
    @send-message="handleSendMessage"
  />

  <PaymentModal
    :show-payment-component="showPaymentComponent"
    :payment-step="paymentStep"
    :card-data="cardData"
    :is-payment-processing="isPaymentProcessing"
    :payment-completed="paymentCompleted"
    :paid-amount="paidAmount"
    :pin-filled-count="pinFilledCount"
    @close="closePayment"
    @prev-step="goToPrevStep"
    @next-step="goToNextStep"
    @process-payment="handleProcessPayment"
  />

  <NotificationToast
    :show-notification="showNotification"
    :notification-message="notificationMessage"
  />
</template>

<style scoped>
/* Global Animations */
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

/* Responsive Global Styles */
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
