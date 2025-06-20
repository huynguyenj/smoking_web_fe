import React, { useState } from 'react'
import privateApiService from '../../services/ApiPrivate'
import { useTokenInfoStorage } from '../../store/authStore'
import { createBlogFormData } from '../../model/user/blogType' // ✅ dùng đúng hàm tạo FormData
import type { CreateBlogFormInput } from '../../model/user/blogType'

interface CreateBlogPopupProps {
  onClose: () => void
  onSuccess: () => void
}

const CreateBlog = ({ onClose, onSuccess }: CreateBlogPopupProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleCreate = async () => {
    if (!title || !content || image.length === 0) {
      alert('Vui lòng điền đầy đủ thông tin và chọn ảnh.')
      return
    }

    const user_id = useTokenInfoStorage.getState().userInfo?._id
    if (!user_id) {
      alert('❌ Bạn chưa đăng nhập!')
      return
    }

    try {
      setLoading(true)

      // ✅ Gộp tất cả vào FormData và gửi 1 lần
      const input: CreateBlogFormInput = {
        title,
        content,
        image
      }

      const formData = createBlogFormData(input)
      await privateApiService.createBlog(formData)

      alert('✅ Tạo blog thành công!')
      onSuccess()
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('❌ Lỗi tạo blog:', err)
      alert('Tạo blog thất bại.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tạo Blog Mới</h2>

      <input
        type="text"
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <textarea
        placeholder="Nội dung"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded mb-3 min-h-[120px]"
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="w-full border p-2 rounded mb-4"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
          disabled={loading}
        >
          Hủy
        </button>
        <button
          type="button"
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Đang tạo...' : 'Tạo'}
        </button>
      </div>
    </div>
  )
}

export default CreateBlog
