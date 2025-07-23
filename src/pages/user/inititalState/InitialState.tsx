import privateApiService from '../../../services/ApiPrivate'
import React, { useEffect, useState } from 'react'
import {
  type FilterInitial,
  type InitialState,
  type InitialStatePaginationData,
  type PageInfo
} from '../../../model/initialType/initialType'
import InitialCard from '../../../components/initialState/InitialCard'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
import CreateInitialPopup from '../../../components/popup/CreateInitialPopup'
import UpdateInitialPopup from '../../../components/popup/UpdateInitialPopup'
import { toast } from 'react-toastify'

export default function InitialStatePage() {
  const [initialStates, setInitialStates] = useState<InitialState[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(-1)
  const [filterByDate, setFilterByDate] = useState<FilterInitial>()
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    limit: 5,
    totalPage: 1
  })
  const [showPopup, setShowPopup] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<InitialState | null>(
    null
  )

  const fetchInitialStates = async () => {
    setLoading(true)
    try {
      const res: InitialStatePaginationData =
        await privateApiService.getInitialStatePagination(
          pageInfo.page,
          pageInfo.limit,
          sort,
          filterByDate
        )
      setInitialStates(res.data.listData)
      setPageInfo(res.data.pageInfo)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await privateApiService.deleteInitialState(id)
      fetchInitialStates()
    } catch (error) {
      toast.error(error as string)
    }
  }
  const handleUpdate = (item: InitialState) => {
    setSelectedRecord(item)
    setShowPopup(true)
  }

  useEffect(() => {
    fetchInitialStates()
  }, [pageInfo.page, pageInfo.limit, sort, filterByDate])

  const handlePageChange = (newPage: number) => {
    if (
      newPage !== pageInfo.page &&
      newPage >= 1 &&
      newPage <= pageInfo.totalPage
    ) {
      setPageInfo((prev) => ({ ...prev, page: newPage }))
    }
  }
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      setSort(Number(value))
    }
  }
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      const timestamp = new Date(value).getTime()
      const newFilter = { date: { start_time: timestamp } }
      setFilterByDate(newFilter)
    }
  }
  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Initial States</h1>
        <div className='flex gap-5 items-center'>
          <button
            onClick={() => {
              setSelectedRecord(null)
              setShowPopup(true)
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            + Create Initial State
          </button>
          <div className='flex gap-2 items-center'>
            <label htmlFor="sort">Sort by date</label>
            <select className='bg-gray-300 rounded-2xl p-2' value={sort} name="" id="sort" onChange={handleSort}>
              <option value={-1}>Newest</option>
              <option value={1}>Oldest</option>
            </select>
          </div>
          <div className='flex gap-2 items-center'>
            <label htmlFor="date">Filter by date</label>
            <input className='bg-amber-200 rounded-2xl p-2' id='date' type="date" onChange={handleFilter}/>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingScreenBg />
      ) : initialStates.length === 0 ? (
        <p className="text-center text-gray-500">No initial states found.</p>
      ) : (
        <ul className="space-y-4">
          {initialStates.map((item) => (
            <InitialCard
              key={item._id}
              item={item}
              onUpdate={() => handleUpdate(item)}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => handlePageChange(pageInfo.page - 1)}
          disabled={pageInfo.page <= 1}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {pageInfo.page} of {pageInfo.totalPage}
        </span>
        <button
          onClick={() => handlePageChange(pageInfo.page + 1)}
          disabled={pageInfo.page >= pageInfo.totalPage}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            {selectedRecord ? (
              <UpdateInitialPopup
                initialData={selectedRecord}
                onClose={() => {
                  setShowPopup(false)
                  setSelectedRecord(null)
                }}
                onSuccess={() => {
                  fetchInitialStates()
                  setShowPopup(false)
                  setSelectedRecord(null)
                }}
              />
            ) : (
              <CreateInitialPopup
                onClose={() => setShowPopup(false)}
                onSuccess={() => {
                  setPageInfo((prev) => ({ ...prev, page: 1 }))
                  fetchInitialStates() // ✅ sửa đúng tên
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
