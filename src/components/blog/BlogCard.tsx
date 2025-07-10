import { useNavigate } from 'react-router-dom'
import { UserRoute } from '../../const/pathList'
import BlogCardMenu from './BlogCardMenu'

interface BlogPost {
  id: string
  title: string
  imageUrls: string[] // 👈 sửa lại thành mảng
}

interface Props {
  post: BlogPost
  onDelete: () => void
  onUpdate?: () => void
  showMyBlogs: boolean
}

function BlogCard({ post, onDelete, showMyBlogs, onUpdate }: Props) {
  const navigate = useNavigate()
  const { id, title, imageUrls } = post

  const handleClick = () => {
    navigate(UserRoute.BLOG_DETAIL_PATH.replace(':id', id))
  }

  return (
    <div className="flex flex-col md:flex-row bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition duration-300 w-full">
      <div className="relative w-full md:w-1/3 h-60 rounded-lg overflow-hidden">
        <img
          src={imageUrls[0]}
          alt={`${title}-0`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay nếu có nhiều ảnh */}
        {imageUrls.length > 1 && (
          <div className="absolute bottom-2 right-2 z-10 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-md">
            +{imageUrls.length - 1} more
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-4 flex-1">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{title}</h2>
          {showMyBlogs && <BlogCardMenu onDelete={onDelete} onUpdate={onUpdate} />}
        </div>

        {/* Dòng dưới: nút đọc tiếp */}
        <div className="mt-4">
          <button
            onClick={handleClick}
            className="text-yellow-600 font-bold uppercase tracking-wide hover:underline"
          >
            Continue Reading
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
