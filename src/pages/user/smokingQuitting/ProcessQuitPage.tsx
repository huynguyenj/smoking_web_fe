import { useEffect, useState } from 'react'
import privateApiService from '../../../services/ApiPrivate'
import type { CigaretteRecord, CigarettePaginationResponse } from '../../../model/user/cigarettesType'
import CreateCigarettePopup from '../../../components/popup/CreateCigarette'
import UpdateCigarettePopup from '../../../components/popup/UpdateCigarette'
import CigaretteCard from '../../../components/cigarette/CigaretteCard'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'

export default function CigaretteList() {
  const [cigarettes, setCigarettes] = useState<CigaretteRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CigaretteRecord | null>(null) // ✅ phân biệt update

  const fetchCigarettes = async () => {
    setLoading(true)
    try {
      const res: CigarettePaginationResponse = await privateApiService.getCigarettesPagination(page, 5)
      setCigarettes(res.data.listData)
      setPage(res.data.pageInfo.page)
      setTotalPage(res.data.pageInfo.totalPage)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Lỗi lấy danh sách thuốc lá:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await privateApiService.deleteCigaretteById(id)
      fetchCigarettes()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Xoá thất bại:', err)
    }
  }

  const handleUpdate = (item: CigaretteRecord) => {
    setSelectedRecord(item)
    setShowPopup(true)
  }

  useEffect(() => {
    fetchCigarettes()
  }, [page])

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">List cigarettes process</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            setSelectedRecord(null)
            setShowPopup(true)
          }}
        >
          + Create
        </button>
      </div>

      {loading ? (
        <LoadingScreenBg/>
      ) : cigarettes.length === 0 ? (
        <p>No data</p>
      ) : (
        <ul className="space-y-4">
          {cigarettes.map((item) => (
            <CigaretteCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              onUpdate={() => handleUpdate(item)} // ✅ gọi cập nhật
            />
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="px-3 py-1">{page} / {totalPage}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          disabled={page >= totalPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Popup tạo hoặc cập nhật */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            {selectedRecord ? (
              <UpdateCigarettePopup
                initialData={selectedRecord}
                onClose={() => {
                  setShowPopup(false)
                  setSelectedRecord(null)
                }}
                onSuccess={() => {
                  fetchCigarettes()
                  setShowPopup(false)
                  setSelectedRecord(null)
                }}
              />
            ) : (
              <CreateCigarettePopup
                onClose={() => setShowPopup(false)}
                onSuccess={() => {
                  setPage(1)
                  fetchCigarettes()
                  setShowPopup(false)
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
