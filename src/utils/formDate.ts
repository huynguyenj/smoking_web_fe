export const formDate = (date: string | number) => {
  const convertToDate = new Date(date)
  return convertToDate.toLocaleDateString('en-GB')
}