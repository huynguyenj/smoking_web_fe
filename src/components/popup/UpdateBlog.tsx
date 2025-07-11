import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import privateApiService from '../../services/ApiPrivate'
import { createBlogFormData } from '../../model/user/blogType'
import type { CreateBlogFormInput, Blog } from '../../model/user/blogType'
import { toast } from 'react-toastify'

interface UpdateBlogProps {
  blogId: string
  onClose: () => void
  onSuccess: () => void
}

const UpdateBlog = ({ blogId, onClose, onSuccess }: UpdateBlogProps) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([]) // NEW
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await privateApiService.getBlogDetail(blogId)
        const blog: Blog = res.data
        setTitle(blog.title)
        setContent(blog.content)
        setExistingImages(blog.image_url) // Load ảnh cũ từ URL
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('❌ Lỗi lấy blog:', err)
        toast.error('Failed to load blog. Please try again.')
      }
    }

    fetchBlog()
  }, [blogId])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files)
      setImages(prev => {
        const existingNames = new Set(prev.map(file => file.name))
        const nonDuplicate = selected.filter(file => !existingNames.has(file.name))
        const duplicateCount = selected.length - nonDuplicate.length

        if (duplicateCount > 0) {
          toast.warning(`⚠️ ${duplicateCount} ảnh đã tồn tại và sẽ không được thêm vào.`)
        }

        return [...prev, ...nonDuplicate]
      })
    }
  }


  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpdate = async () => {
    if (!title || !content) {
      toast.error('Please fill in all fields.')
      return
    }

    try {
      setLoading(true)
      const input: CreateBlogFormInput = {
        title,
        content,
        image,
        keep_images: existingImages // Gửi ảnh cũ còn giữ lại
      }

      const formData = createBlogFormData(input)
      await privateApiService.updateBlog(blogId, formData)
      toast.success('✅ Blog updated successfully!')
      onSuccess()
      onClose()
    } catch (err) {
    // eslint-disable-next-line no-console
      console.error('❌ Lỗi cập nhật blog:', err)
      toast.error('Update blog failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Cập nhật Blog</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        placeholder="Update blog content..."
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

        {/* Hiển thị ảnh đã có (URL) */}
        {existingImages.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {existingImages.map((url, index) => (
              <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                <img
                  src={url}
                  alt={`existing-${index}`}
                  className="w-full h-full object-cover"
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

        {/* Hiển thị ảnh mới upload */}
        {image.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {image.map((file, index) => (
              <div key={index} className="w-24 h-24 border rounded overflow-hidden">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
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
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </div>
    </div>
  )
}

export default UpdateBlog
