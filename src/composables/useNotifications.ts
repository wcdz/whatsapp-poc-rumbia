import { ref } from 'vue'
import { TIMING } from '@/constants'

export function useNotifications() {
  const showNotification = ref(false)
  const notificationMessage = ref('')

  const showNotificationMessage = (message: string) => {
    notificationMessage.value = message
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, TIMING.NOTIFICATION_DURATION)
  }

  const hideNotification = () => {
    showNotification.value = false
  }

  return {
    showNotification,
    notificationMessage,
    showNotificationMessage,
    hideNotification
  }
}
