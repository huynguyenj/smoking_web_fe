import { useState } from 'react'
import BlogCard from '../../components/blog/BlogCard'

interface BlogPost {
  id: number
  title: string
  summary: string
  imageUrl: string
}

const blogPosts: BlogPost[] = [
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

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const totalPages = Math.ceil(blogPosts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll lên khi chuyển trang
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Blog List</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 mx-1 rounded border text-sm font-medium ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

export default BlogList
