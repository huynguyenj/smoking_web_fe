import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import privateApiService from '../../services/ApiPrivate'
import Avatar from '../../assets/avatar.jpg'
import type { Blog } from '../../model/user/blogType'
import type {
  Comment as BlogComment,
  CreateCommentInput,
  TemporaryComment
} from '../../model/user/commentType'
import LoadingScreenBg from '../../components/loading/LoadingScreenBg'
import { UserRoute } from '../../const/pathList'
import { formDate } from '../../utils/formDate'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ImageGalleryPopup from '../../components/popup/ImageGalleryPopup'
const COMMENTS_PER_PAGE = 5

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [newComment, setNewComment] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const navigate = useNavigate()
  // Lấy bài viết
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return
      try {
        setIsLoading(true)
        const res = await privateApiService.getBlogDetail(id)
        setBlog(res.data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Lỗi lấy blog:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlog()
  }, [id])

  // Lấy bình luận (theo trang + sắp xếp)
  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return
      try {
        setIsLoading(true)
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
      } finally {
        setIsLoading(false)
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

  if (isLoading) return <LoadingScreenBg/>
  if (!blog) {
    return (
      <div className="p-10 text-red-600 font-semibold">
        No blog found
      </div>
    )
  }

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white rounded shadow mb-10">
      <button
        onClick={() => navigate(UserRoute.BLOGS_PATH)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
      >
        <ArrowBackIcon fontSize="small" />
        <span>Back</span>
      </button>
      {Array.isArray(blog.image_url) && blog.image_url.length > 0 && (
        <div
          className={`grid gap-4 mb-6 ${
            blog.image_url.length === 1
              ? 'grid-cols-1'
              : blog.image_url.length === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
          }`}
        >
          {blog.image_url.slice(0, 3).map((url, idx) => (
            <div
              key={idx}
              className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-md border border-gray-200 cursor-pointer"
              onClick={() => {
                setStartIndex(idx)
                setShowImageModal(true)
              }}
            >
              <img
                src={url}
                alt={`${blog.title} ${idx + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay trên ảnh thứ 3 nếu còn ảnh */}
              {idx === 2 && blog.image_url.length > 3 && (
                <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center text-black text-xl font-semibold">
                    +{blog.image_url.length - 3} more
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showImageModal && (
        <ImageGalleryPopup
          images={blog.image_url}
          startIndex={startIndex}
          onClose={() => setShowImageModal(false)}
        />
      )}


      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div
        className="text-gray-700 text-lg mb-10 quill-html"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <hr className="my-6" />

      {/* Bình luận */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        {/* Sắp xếp */}
        <div className="flex justify-end mb-4 items-center gap-3">
          <label htmlFor="sort">Sort</label>
          <select
            id='sort'
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value === 'oldest' ? 'oldest' : 'newest')
            }
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Nhập bình luận */}
        <div className="mb-6">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comment here..."
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
          <p className="text-gray-500 italic">No have any comments</p>
        ) : (
          <>
            <ul className="space-y-4">
              {comments.map((c, idx) =>
                c && typeof c.content === 'string' ? (
                  <li key={c._id ?? idx} className="border border-gray-200 p-3 rounded flex gap-5 items-center">
                    <img src={c.userInfo?.image_url ? c.userInfo.image_url : Avatar} alt="profile-image" className='w-10 aspect-square rounded-full' />
                    <div>
                      <div className='flex items-center gap-5'>
                        <p className="font-semibold text-gray-800">{c.userInfo?.user_name ? c.userInfo.user_name : 'Anonymous'}</p>
                        <p>{formDate(c.created_date)}</p>
                      </div>
                      <p className="text-gray-700">{c.content}</p>
                    </div>
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
                Previous
              </button>
              <span className="text-sm font-medium mt-2">
                Page {currentPage} / {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BlogDetailPage
