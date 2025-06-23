import { useState } from 'react'

export default function useOpen() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  const toggle = () => {
    setIsOpen((prevState) => !prevState)
  }
  return { isOpen, handleOpen, handleClose, toggle }
}
