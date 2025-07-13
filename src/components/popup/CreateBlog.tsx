import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import privateApiService from '../../services/ApiPrivate'
import { useTokenInfoStorage } from '../../store/authStore'
import { createBlogFormData } from '../../model/user/blogType'
import type { CreateBlogFormInput } from '../../model/user/blogType'
import { toast } from 'react-toastify'

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
      const selected = Array.from(e.target.files)
      setImages(prev => [...prev, ...selected])
    }
  }

  const handleCreate = async () => {
    if (!title || !content || image.length === 0) {
      toast.error('Please fill in all fields and upload at least one image.')
      return
    }

    const user_id = useTokenInfoStorage.getState().userInfo?._id
    if (!user_id) {
      toast.error('User ID not found. Please log in again.')
      return
    }

    try {
      setLoading(true)

      const input: CreateBlogFormInput = {
        title,
        content,
        image
      }

      const formData = createBlogFormData(input)
      await privateApiService.createBlog(formData)
      toast.success('✅ Create blog successfully!')
      onSuccess()
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('❌ Lỗi tạo blog:', err)
      toast.error('Create blog failed. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveExistingImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Tạo Blog Mới</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      {/* Rich text editor */}
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        placeholder="Enter blog content here..."
        className="bg-white mb-3"
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean']
          ]
        }}
      />

      {/* File Upload */}
      <div>
        <label
          htmlFor="imageUpload"
          className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded shadow hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 10.5L12 6m0 0l4.5 4.5M12 6v12"
            />
          </svg>
          <span>Upload image</span>
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Small Preview Thumbnails */}
        {image.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {image.map((file, index) => (
              <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-[100px] h-[100px] object-cover"
                />
                <button
                  onClick={() => handleRemoveExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-100"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create'}
        </button>
      </div>
    </div>
  )
}

export default CreateBlog
