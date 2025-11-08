export const formatCardNumber = (value: string): string => {
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

export const formatExpiry = (value: string): string => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '')
  }
  return v
}

export const formatCVV = (value: string): string => {
  return value.replace(/[^0-9]/g, '')
}

export const updateCardNumber = (event: Event, cardData: any) => {
  const target = event.target as HTMLInputElement
  const formatted = formatCardNumber(target.value)
  cardData.value.number = formatted
  target.value = formatted
}

export const updateExpiry = (event: Event, cardData: any) => {
  const target = event.target as HTMLInputElement
  const formatted = formatExpiry(target.value)
  cardData.value.expiry = formatted
  target.value = formatted
}

export const updateCVV = (event: Event, cardData: any) => {
  const target = event.target as HTMLInputElement
  const value = formatCVV(target.value)
  cardData.value.cvv = value
  target.value = value
}
