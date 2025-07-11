import { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  onDelete: () => void
  onUpdate?: () => void // 👈 thêm optional prop
}

export default function BlogCardMenu({ onDelete, onUpdate }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Nút 3 chấm */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 hover:text-gray-700 text-xl"
      >
        <MoreVertIcon />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute top-full right-0 mt-2 w-28 bg-white border rounded shadow z-50 translate-x-[-0.5rem]">
          {/* ✅ Nút Update */}
          <button
            onClick={() => {
              onUpdate?.()
              setOpen(false)
            }}
            className="block w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-100"
          >
            Update
          </button>

          {/* ✅ Nút Delete */}
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}
