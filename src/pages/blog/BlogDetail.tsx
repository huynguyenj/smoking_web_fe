import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

interface BlogPost {
  id: number
  title: string
  summary: string
  imageUrl: string
}

interface Comment {
  id: number
  author: string
  content: string
}

const mockBlogPosts: BlogPost[] = [
  { id: 1, title: 'Blog 1', summary: 'Summary 1', imageUrl: 'https://source.unsplash.com/random/300x200?sig=1' },
  { id: 2, title: 'Blog 2', summary: 'Summary 2', imageUrl: 'https://source.unsplash.com/random/300x200?sig=2' },
  { id: 3, title: 'Blog 3', summary: 'Summary 3', imageUrl: 'https://source.unsplash.com/random/300x200?sig=3' },
  { id: 4, title: 'Blog 4', summary: 'Summary 4', imageUrl: 'https://source.unsplash.com/random/300x200?sig=4' },
  { id: 5, title: 'Blog 5', summary: 'Summary 5', imageUrl: 'https://source.unsplash.com/random/300x200?sig=5' },
  { id: 6, title: 'Blog 6', summary: 'Summary 6', imageUrl: 'https://source.unsplash.com/random/300x200?sig=6' },
  { id: 7, title: 'Blog 7', summary: 'Summary 7', imageUrl: 'https://source.unsplash.com/random/300x200?sig=7' },
  { id: 8, title: 'Blog 8', summary: 'Summary 8', imageUrl: 'https://source.unsplash.com/random/300x200?sig=8' },
  { id: 9, title: 'Blog 9', summary: 'Summary 9', imageUrl: 'https://source.unsplash.com/random/300x200?sig=9' },
  { id: 10, title: 'Blog 10', summary: 'Summary 10', imageUrl: 'https://source.unsplash.com/random/300x200?sig=10' }
]

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>('')

  useEffect(() => {
    const found = mockBlogPosts.find((b) => b.id === Number(id))
    setBlog(found || null)
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
    return <div className="p-10 text-red-600 font-semibold">Blog not found</div>
  }

  return (
    <div className="p-10 max-w-3xl mx-auto bg-white rounded shadow mb-10">
      <img src={blog.imageUrl} alt={blog.title} className="w-full h-60 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700 text-lg mb-10">{blog.summary}</p>

      <hr className="my-6" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>

        <div className="mb-6">
          <div className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
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
          <p className="text-gray-500 italic">No comments yet.</p>
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

export default BlogDetail
