import React, { useEffect, useState } from 'react'
import privateApiService from '../../../services/ApiPrivate'
import type { CigaretteRecord, CigarettePaginationResponse, ProcessFilter } from '../../../model/user/cigarettesType'
import CreateCigarettePopup from '../../../components/popup/CreateCigarette'
import UpdateCigarettePopup from '../../../components/popup/UpdateCigarette'
import CigaretteCard from '../../../components/cigarette/CigaretteCard'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
import type { Plan } from '../../../model/user/planType'
import { formDate } from '../../../utils/formDate'
import ProcessFilterPopup from './ProcessFilterPopup'

export default function CigaretteList() {
  const [cigarettes, setCigarettes] = useState<CigaretteRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<CigaretteRecord | null>(null) // ✅ phân biệt update
  const [sort, setSort] = useState(-1)
  const [filter, setFilter] = useState<ProcessFilter>()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [plans, setPlans] = useState<Plan[]>()
  const fetchCigarettes = async () => {
    setLoading(true)
    try {
      const res: CigarettePaginationResponse = await privateApiService.getCigarettesPagination(page, 5, sort, filter)
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
    const fetchAllPlan = async () => {
      try {
        const response = await privateApiService.getAllPlanOfUser()
        setPlans(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllPlan()
    fetchCigarettes()
  }, [page, sort, filter])
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      setSort(Number(value))
    }
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-5">List cigarettes process</h1>
      <div className="flex justify-center items-center max-w-6xl mx-auto mb-5">
        <div className='relative flex gap-5 items-center'>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer"
            onClick={() => {
              setSelectedRecord(null) // ✅ tạo mới thì không có selectedRecord
              setShowPopup(true)
            }}
          >
            ➕ Create
          </button>
          <div className='flex gap-2 items-center'>
            <label htmlFor="sort">Sort by date</label>
            <select className='bg-gray-300 rounded-2xl p-2' value={sort} name="" id="sort" onChange={handleSort}>
              <option value={-1}>Newest</option>
              <option value={1}>Oldest</option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <button className='px-3 py-2 hover:opacity-70 cursor-pointer bg-amber-200 rounded-2xl' onClick={() => setIsFilterOpen(true)}>Filter</button>
            {filter &&
                      <div className='flex gap-5'>
                        <div>
                          {filter?.planId &&
                          <div className='bg-gray-200 w-55 px-3 rounded-2xl py-2 flex justify-between text-[0.8rem]'>
                            <p>
                              Plan: {plans?.find(item => item._id === filter.planId)?.content}
                            </p>
                            <button className='bg-red-400 rounded-2xl w-5 aspect-square text-white hover:opacity-70 cursor-pointer' onClick={() => setFilter(prev => ({ ...prev, planId: undefined }))}>x</button>
                          </div>}
                        </div>
                        {filter?.date &&
                          <div className='bg-gray-200 text-[0.8rem] rounded-2xl w-70 px-5 py-2 flex items-center justify-between'>
                            {filter.date.start_time && filter.date.end_time &&
                              <p>
                                Time: {formDate(filter.date.start_time)} ➡️ {formDate(filter.date.end_time)}
                              </p>
                            }
                            <button className='bg-red-400 rounded-2xl w-5 aspect-square text-white hover:opacity-70 cursor-pointer' onClick={() => setFilter(prev => ({ ...prev, date: undefined }))}>x</button>
                          </div>
                        }
                      </div>
            }
          </div>
          {isFilterOpen &&
                      <div className='absolute -right-75 top-15'>
                        <ProcessFilterPopup setIsOpen={setIsFilterOpen} setFilter={setFilter}/>
                      </div>
          }
        </div>
      </div>

      {loading ? (
        <LoadingScreenBg/>
      ) : cigarettes.length === 0 ? (
        <p className='text-center'>No data</p>
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
