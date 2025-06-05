import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export default function useDebounce() {
  const [value, setValue] = useState<string>('')
  const [time, setTime] = useState<number>(0)
  const debounceSearch = debounce(async (value) => {
    setValue(value)
  }, time)
  useEffect(() => {
    return () => debounceSearch.cancel()
  }, [debounceSearch])
  return {
    value,
    setTime,
    debounceSearch
  }
}
