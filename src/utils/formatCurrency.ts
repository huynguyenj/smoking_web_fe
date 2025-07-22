export function formatCurrencyVND(value: number | null): string {
  if (value == null) return '₫0'
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  })
}