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

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      text: newMessage.value,
      sender: 'user',
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    })
    newMessage.value = ''
    
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
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  background: #f0f0f0;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
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
</style>
