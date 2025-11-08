export interface Message {
  id: number
  text: string
  sender: 'user' | 'rumbia'
  time: string
}

export interface CardData {
  number: string
  holder: string
  expiry: string
  cvv: string
  email: string
}

export type PaymentStep = 1 | 2

export interface PaymentState {
  showPaymentComponent: boolean
  isPaymentProcessing: boolean
  paymentCompleted: boolean
  paidAmount: number
  paymentStep: PaymentStep
  pinFilledCount: number
}

export interface NotificationState {
  showNotification: boolean
  notificationMessage: string
}
