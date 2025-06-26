import { useNavigate } from 'react-router-dom'
import { UserRoute } from '../../const/pathList'

interface BlogPost {
  id: string
  title: string
  imageUrl: string
}

interface Props {
  post: BlogPost
}

function BlogCard({ post }: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(UserRoute.BLOG_DETAIL_PATH.replace(':id', post.id.toString()))
  }

  return (
    <button
      onClick={handleClick}
      className="text-left bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition duration-300 w-full"
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-40 object-cover"
      />
      <hr className='mt-10'/>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-center">{post.title}</h2>
      </div>
    </button>
  )
}

export default BlogCard
