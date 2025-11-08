# Arquitectura Modular - WhatsApp PoC

Este proyecto ha sido refactorizado siguiendo buenas prácticas de desarrollo y arquitectura modular para mejorar la mantenibilidad, escalabilidad y reutilización del código.

## 📁 Estructura de Directorios

```
src/
├── components/           # Componentes Vue reutilizables
│   ├── ChatContainer.vue      # Contenedor principal del chat
│   ├── PaymentModal.vue       # Modal de pago
│   ├── PaymentCardForm.vue    # Formulario de datos de tarjeta
│   ├── PaymentConfirmation.vue # Confirmación de pago
│   └── NotificationToast.vue  # Notificaciones toast
├── composables/          # Lógica de negocio reutilizable
│   ├── useMessages.ts         # Manejo de mensajes del chat
│   ├── usePayment.ts          # Lógica de pagos
│   └── useNotifications.ts    # Sistema de notificaciones
├── types/               # Definiciones TypeScript
│   └── index.ts              # Interfaces y tipos
├── constants/           # Constantes y configuración
│   └── index.ts              # Valores constantes
├── utils/               # Utilidades y helpers
│   └── cardFormatters.ts     # Formateo de datos de tarjeta
├── assets/              # Recursos estáticos
│   └── interseguro_logo.jpeg
└── App.vue              # Componente principal refactorizado
```

## 🧩 Componentes

### ChatContainer.vue
**Responsabilidad**: Interfaz del chat principal
- Renderiza la lista de mensajes
- Maneja la entrada de texto del usuario 
- Emite eventos para envío de mensajes
- **Estilos**: Header, mensajes, input, avatar (🎨 147 líneas CSS)

### PaymentModal.vue
**Responsabilidad**: Contenedor del flujo de pago
- Controla la navegación entre pasos
- Maneja el header dinámico
- Orquesta los sub-componentes de pago
- **Estilos**: Modal, header, botones de navegación (🎨 70 líneas CSS)

### PaymentCardForm.vue
**Responsabilidad**: Formulario de datos de tarjeta
- Validación de campos
- Formateo automático de inputs
- Manejo de estado del formulario
- **Estilos**: Formulario, inputs de tarjeta, botones (🎨 90 líneas CSS)

### PaymentConfirmation.vue
**Responsabilidad**: Confirmación y procesamiento de pago
- Muestra resumen de transacción
- Estados de loading y éxito
- Interfaz de ingreso de PIN
- **Estilos**: Confirmación, loading, success, PIN, animaciones (🎨 240 líneas CSS)

### NotificationToast.vue
**Responsabilidad**: Sistema de notificaciones
- Muestra mensajes temporales
- Animaciones de entrada/salida
- **Estilos**: Toast, animaciones slideDown (🎨 32 líneas CSS)

## 🎣 Composables

### useMessages()
**Propósito**: Manejo de mensajes del chat
```typescript
const { 
  messages, 
  newMessage, 
  sendMessage, 
  addAutoResponse, 
  addRumbiaMessage 
} = useMessages()
```

### usePayment()
**Propósito**: Lógica completa de pagos
```typescript
const { 
  showPaymentComponent, 
  paymentStep, 
  cardData,
  processPayment,
  openPayment,
  closePayment 
} = usePayment()
```

### useNotifications()
**Propósito**: Sistema de notificaciones
```typescript
const { 
  showNotification, 
  notificationMessage, 
  showNotificationMessage 
} = useNotifications()
```

## 📝 Tipos TypeScript

### Interfaces Principales
- `Message`: Estructura de mensajes del chat
- `CardData`: Datos de tarjeta de crédito
- `PaymentState`: Estado del sistema de pagos
- `PaymentStep`: Pasos del flujo de pago (1 | 2)

## 🔧 Utilidades

### cardFormatters.ts
**Funciones de formateo**:
- `formatCardNumber()`: Formatea número de tarjeta (XXXX XXXX XXXX XXXX)
- `formatExpiry()`: Formatea fecha de expiración (MM/AA)
- `formatCVV()`: Valida y formatea CVV
- Funciones de actualización para eventos de input

## 🎯 Constantes

### Valores Configurables
- `DEFAULT_CARD_DATA`: Datos precargados de tarjeta
- `INITIAL_MESSAGES`: Mensajes iniciales del chat
- `TIMING`: Configuración de tiempos y delays
- `PAYMENT_MESSAGES`: Mensajes del sistema de pagos

## ✅ Beneficios de la Refactorización

### 🔄 Reutilización
- Componentes independientes y reutilizables
- Composables que encapsulan lógica de negocio
- Utilidades que pueden usarse en otros proyectos

### 🧪 Testabilidad
- Lógica separada en composables fáciles de testear
- Componentes con responsabilidades únicas
- Funciones puras en utilidades

### 📈 Escalabilidad
- Estructura modular permite agregar nuevas funcionalidades
- Separación clara de responsabilidades
- Configuración centralizada en constantes

### 🛠️ Mantenibilidad
- Código organizado por funcionalidad
- TypeScript para mayor seguridad de tipos
- Documentación clara de cada módulo

### 👥 Trabajo en Equipo
- Estructura familiar para desarrolladores Vue/TypeScript
- Convenciones claras y consistentes
- Fácil onboarding para nuevos desarrolladores

## 🎨 Distribución de Estilos

### **Antes de la Refactorización**
- **App.vue**: 570 líneas de CSS mezcladas
- **Problema**: Estilos no relacionados en el mismo archivo
- **Mantenimiento**: Difícil localizar y modificar estilos específicos

### **Después de la Refactorización**
- **App.vue**: Solo 35 líneas (animaciones globales)
- **Componentes**: Estilos distribuidos por responsabilidad
- **Scoped**: Cada componente con sus estilos encapsulados

### **Distribución por Componente**
```
📊 Total CSS distribuido: 579 líneas

ChatContainer.vue      ████████████████████ 147 líneas (25%)
PaymentConfirmation.vue ████████████████████████████████████████ 240 líneas (41%)
PaymentCardForm.vue    ████████████████ 90 líneas (16%)
PaymentModal.vue       ████████████ 70 líneas (12%)
NotificationToast.vue  ████ 32 líneas (6%)
```

### **Beneficios de la Distribución**
- **🔍 Fácil localización**: Estilos junto a su componente
- **🛠️ Mantenimiento**: Cambios localizados
- **🔒 Encapsulación**: Scoped styles evitan conflictos
- **⚡ Performance**: CSS tree-shaking automático
- **👥 Trabajo en equipo**: Desarrolladores pueden trabajar en paralelo

## 🚀 Próximos Pasos

1. **Testing**: Agregar tests unitarios para componentes y composables
2. **Storybook**: Documentar componentes con Storybook  
3. **Performance**: Implementar lazy loading para componentes
4. **Accessibility**: Mejorar accesibilidad con ARIA labels
5. **Internacionalización**: Agregar soporte para múltiples idiomas
6. **CSS Variables**: Centralizar tokens de diseño (colores, espaciado)
