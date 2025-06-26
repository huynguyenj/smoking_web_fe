import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import privateApiService from '../../services/ApiPrivate'
import type { Blog } from '../../model/user/blogType'
import type {
  Comment as BlogComment,
  CreateCommentInput,
  TemporaryComment
} from '../../model/user/commentType'

const COMMENTS_PER_PAGE = 5

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  // Lấy bài viết
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return
      try {
        const res = await privateApiService.getBlogDetail(id)
        setBlog(res.data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Lỗi lấy blog:', err)
      }
    }
    fetchBlog()
  }, [id])

  // Lấy bình luận (theo trang + sắp xếp)
  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return
      try {
        const res = await privateApiService.getCommentsByBlogId(
          id,
          currentPage,
          COMMENTS_PER_PAGE,
          sortOrder
        )
        const validComments = res.data.listData.filter(
          (c) => c && typeof c.content === 'string'
        )
        setComments(validComments)
        setTotalPages(res.data.pageInfo.totalPage || 1)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Lỗi lấy bình luận:', err)
      }
    }

    fetchComments()
  }, [id, currentPage, sortOrder])

  const handleAddComment = async () => {
    if (!newComment.trim() || !id) return
    try {
      const payload: CreateCommentInput = { content: newComment }
      await privateApiService.createComment(id, payload)

      const newDisplayedComment: TemporaryComment = {
        _id: Date.now().toString(),
        blog_id: id,
        content: newComment,
        user_id: '',
        created_date: Date.now(),
        isDeleted: false,
        isTemporary: true
      }

      setComments((prev) => [newDisplayedComment, ...prev])
      setNewComment('')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Lỗi tạo bình luận:', err)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1)
  }

  if (!blog) {
    return (
      <div className="p-10 text-red-600 font-semibold">
        Không tìm thấy bài viết
      </div>
    )
  }

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white rounded shadow mb-10">
      {/* Hình ảnh */}
      {Array.isArray(blog.image_url) && blog.image_url.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {blog.image_url.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`${blog.title} ${idx + 1}`}
              className="w-full h-60 object-cover rounded"
            />
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div
        className="text-gray-700 text-lg mb-10 quill-html"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <hr className="my-6" />

      {/* Bình luận */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Bình luận</h2>

        {/* Sắp xếp */}
        <div className="flex justify-end mb-4">
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value === 'oldest' ? 'oldest' : 'newest')
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
        </div>

        {/* Nhập bình luận */}
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

        {/* Danh sách bình luận */}
        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Chưa có bình luận nào.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {comments.map((c, idx) =>
                c && typeof c.content === 'string' ? (
                  <li key={c._id ?? idx} className="border border-gray-200 p-3 rounded">
                    <p className="font-semibold text-gray-800">Người dùng ẩn danh</p>
                    <p className="text-gray-700">{c.content}</p>
                  </li>
                ) : null
              )}
            </ul>

            {/* Nút phân trang */}
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Trước
              </button>
              <span className="text-sm font-medium mt-2">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Tiếp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BlogDetailPage
