import { useEffect, useState } from 'react'
import privateApiService from '../../services/ApiPrivate'
import type { RankingItem } from '../../model/user/rankingType'

const CLIENT_PAGE_SIZE = 5

const Leaderboard = () => {
  const [allData, setAllData] = useState<RankingItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  // Gọi tất cả các trang từ API rồi gộp lại
  const fetchAllRanking = async () => {
    setLoading(true)
    try {
      const firstRes = await privateApiService.getRankingList(1, 5)
      const totalPages = firstRes.data.pageInfo.totalPage

      let combined: RankingItem[] = [...firstRes.data.listData]

      const requests = []
      for (let i = 2; i <= totalPages; i++) {
        requests.push(privateApiService.getRankingList(i, 5))
      }

      const results = await Promise.all(requests)
      results.forEach((res) => {
        combined = combined.concat(res.data.listData)
      })

      // Sort theo position tăng dần
      combined.sort((a, b) => a.position - b.position)
      setAllData(combined)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading all rankings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllRanking()
  }, [])

  // Phân trang phía FE
  const startIndex = (currentPage - 1) * CLIENT_PAGE_SIZE
  const currentItems = allData.slice(startIndex, startIndex + CLIENT_PAGE_SIZE)
  const totalClientPages = Math.ceil(allData.length / CLIENT_PAGE_SIZE)

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalClientPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">🏆 Leaderboard</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {currentItems.map((user) => (
              <div
                key={user._id}
                className={`flex items-center justify-between px-4 py-3 rounded-lg mb-3 ${
                  user.position === 1
                    ? 'bg-yellow-100 font-bold'
                    : user.position === 2
                      ? 'bg-gray-100'
                      : user.position === 3
                        ? 'bg-orange-100'
                        : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold w-6 text-right">{user.position}</span>
                  <img
                    src={`https://i.pravatar.cc/100?u=${user.users._id}`}
                    alt={user.users.user_name || user.users.email}
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                  <span className="text-lg">
                    {user.users.user_name || user.users.email}
                  </span>
                </div>
                <span className="text-blue-600 font-semibold text-lg">
                  {user.star_count} ⭐
                </span>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                ← Prev
              </button>
              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalClientPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalClientPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Leaderboard
