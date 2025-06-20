import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import privateApiService from '../../services/ApiPrivate'
import type { Blog } from '../../model/user/blogType'

interface Comment {
  id: number
  author: string
  content: string
}

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return
      try {
        const res = await privateApiService.getBlogDetail(id)
        setBlog(res.data)
      } catch (err) {
        console.error('Lỗi lấy blog:', err)
      }
    }

    fetchBlog()
  }, [id])

  const handleAddComment = () => {
    if (newComment.trim() === '') return
    const comment: Comment = {
      id: Date.now(),
      author: 'Anonymous',
      content: newComment
    }
    setComments((prev) => [comment, ...prev])
    setNewComment('')
  }

  if (!blog) {
    return <div className="p-10 text-red-600 font-semibold">Không tìm thấy bài viết</div>
  }

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white rounded shadow mb-10">
      {/* Hình ảnh đầu tiên nếu có */}
      {blog.image_url.length > 0 && (
        <img src={blog.image_url[0]} alt={blog.title} className="w-full h-60 object-cover rounded mb-6" />
      )}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 text-lg mb-10 whitespace-pre-line">{blog.content}</p>

      <hr className="my-6" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Bình luận</h2>

        <div className="mb-6">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="w-full border border-gray-300 rounded p-3 pr-12 resize-none min-h-[80px]"
            />
            <button
              onClick={handleAddComment}
              className="absolute right-1 text-blue-600 p-2 transition"
              title="Gửi bình luận"
            >
              <SendIcon />
            </button>
          </div>
        </div>
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="border border-gray-200 p-3 rounded">
                <p className="font-semibold text-gray-800">{c.author}</p>
                <p className="text-gray-700">{c.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BlogDetailPage
