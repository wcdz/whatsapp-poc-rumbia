import type { CardData, Message } from '@/types'

export const DEFAULT_CARD_DATA: CardData = {
  number: '4111 1111 1111 1111',
  holder: 'WILLIAM CHÁVEZ',
  expiry: '12/30',
  cvv: '123',
  email: 'cliente@gmail.com'
}

export const INITIAL_MESSAGES: Message[] = [
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
]

export const PAYMENT_AMOUNTS = {
  DEFAULT: 150
}

export const TIMING = {
  PIN_FILL_INTERVAL: 300,
  PIN_PAUSE_AFTER_COMPLETE: 500,
  PAYMENT_PROCESSING: 4000,
  SUCCESS_DISPLAY: 3500,
  NOTIFICATION_DURATION: 3000
}

export const PAYMENT_MESSAGES = {
  PROCESSING: 'Procesando pago...',
  SUCCESS: '¡Pago exitoso!',
  FINAL_MESSAGE: 'Estamos procesando tu póliza, bienvenido a Interseguro 🎉'
}
