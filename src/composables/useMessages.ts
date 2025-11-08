import { ref } from 'vue'
import type { Message } from '@/types'
import { INITIAL_MESSAGES } from '@/constants'

export function useMessages() {
  const messages = ref<Message[]>([...INITIAL_MESSAGES])
  const newMessage = ref('')

  const addMessage = (text: string, sender: 'user' | 'rumbia' = 'user') => {
    const message: Message = {
      id: messages.value.length + 1,
      text,
      sender,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
    messages.value.push(message)
    return message
  }

  const addUserMessage = (text: string) => {
    return addMessage(text, 'user')
  }

  const addRumbiaMessage = (text: string) => {
    return addMessage(text, 'rumbia')
  }

  const sendMessage = () => {
    if (newMessage.value.trim()) {
      const messageText = newMessage.value.trim()
      addUserMessage(messageText)
      newMessage.value = ''
      return messageText
    }
    return null
  }

  const addAutoResponse = (delay: number = 1000) => {
    setTimeout(() => {
      addRumbiaMessage('Gracias por tu mensaje. RumbIA está aquí para ayudarte.')
    }, delay)
  }

  return {
    messages,
    newMessage,
    addMessage,
    addUserMessage,
    addRumbiaMessage,
    sendMessage,
    addAutoResponse
  }
}
