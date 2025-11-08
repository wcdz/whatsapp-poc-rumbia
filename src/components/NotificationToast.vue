<template>
  <div v-if="showNotification" class="notification-toast">
    <div class="toast-content">
      <span>{{ notificationMessage }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  showNotification: boolean
  notificationMessage: string
}

defineProps<Props>()
</script>

<style scoped>
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
</style>
