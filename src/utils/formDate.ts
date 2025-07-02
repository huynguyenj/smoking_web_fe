export const formDate = (date: string | number) => {
  const convertToDate = new Date(date)
  return convertToDate.toLocaleDateString('en-GB')
}
export const getToday = () => {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0') // Months are 0-based
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
