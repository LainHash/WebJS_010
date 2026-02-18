const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  maximumFractionDigits: 0,
})

export const formatCurrency = (value?: number) => {
  if (typeof value !== 'number') return 'Liên hệ'
  return formatter.format(value)
}

