import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BlogCard from '../../components/blog/BlogCard'
import CreateBlogPopup from '../../components/popup/CreateBlog'
import type { Blog, PageInfo } from '../../model/user/blogType'
import privateApiService from '../../services/ApiPrivate'
import LoadingScreenBg from '../../components/loading/LoadingScreenBg'

const postsPerPage = 6

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, limit: postsPerPage, totalPage: 1 })
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showCreatePopup, setShowCreatePopup] = useState(false)

  const fetchBlogs = async (page = 1, limit = postsPerPage) => {
    setLoading(true)
    try {
      const res = await privateApiService.getAllBlogs(page, limit)
      setBlogs(res.data.listData)
      setPageInfo(res.data.pageInfo)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('❌ Lỗi khi tải blogs:', error)
      toast.error('Fail to load blogs. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs(pageInfo.page, pageInfo.limit)
  }, [pageInfo.page, pageInfo.limit])

  const handlePageChange = (newPage: number) => {
    if (newPage !== pageInfo.page && newPage >= 1 && newPage <= pageInfo.totalPage) {
      setPageInfo(prev => ({ ...prev, page: newPage }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleCreateSuccess = () => {
    setShowCreatePopup(false)
    fetchBlogs(1)
    setPageInfo(prev => ({ ...prev, page: 1 }))
  }

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-6 pt-6">
        <h1 className="text-3xl font-bold">List blogs</h1>
        <button
          onClick={() => setShowCreatePopup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create
        </button>
      </div>

      {showCreatePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
            <button
              onClick={() => setShowCreatePopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <CreateBlogPopup onClose={() => setShowCreatePopup(false)} onSuccess={handleCreateSuccess} />
          </div>
        </div>
      )}

      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search blog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/2"
          />
        </div>

        {loading ? (
          <LoadingScreenBg/>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-base">
            No blogs found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((post) => (
                <BlogCard
                  key={post._id}
                  post={{
                    id: post._id,
                    title: post.title,
                    imageUrl: post.image_url[0] || ''
                  }}
                />
              ))}
            </div>

            <div className="flex justify-center mt-10 gap-2">
              <button
                disabled={pageInfo.page === 1}
                onClick={() => handlePageChange(pageInfo.page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <span className="px-3 py-1">Page {pageInfo.page} / {pageInfo.totalPage}</span>
              <button
                disabled={pageInfo.page === pageInfo.totalPage}
                onClick={() => handlePageChange(pageInfo.page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
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

export default BlogList
