import React, { useEffect, useState } from 'react'
import privateApiService from '../../services/ApiPrivate'
import type { RankingItem } from '../../model/user/rankingType'

const Leaderboard = () => {
  const [allData, setAllData] = useState<RankingItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [sortChoice, setSortChoice] = useState<number>(1)
  const fetchAllRanking = async () => {
    setLoading(true)
    try {
      const response = await privateApiService.getRankingList(currentPage, 5, sortChoice)
      setCurrentPage(response.data.pageInfo.page)
      setTotalPage(response.data.pageInfo.totalPage)
      setAllData(response.data.listData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading all rankings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllRanking()
  }, [currentPage, sortChoice])


  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1)
  }
  const handleChoice = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSortChoice(parseInt(e.target.value))
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">🏆 Leaderboard</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            <div className='bg-black w-40 p-2 rounded-2xl text-white-fig flex items-center justify-center gap-5 m-auto mb-2'>
              <label htmlFor="sort">Sort: </label>
              <select id='sort' className='border-white border-2 rounded-2xl px-2 py-1' onChange={(e) => handleChoice(e)} value={sortChoice}>
                <option value="1" className='bg-black'>Highest</option>
                <option value="-1" className='bg-black'>Lowest</option>
              </select>

            </div>
            {allData.map((user) => (
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
                Page {currentPage} of {totalPage}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPage}
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
