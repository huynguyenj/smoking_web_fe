import { useNavigate } from 'react-router-dom'
import { UserRoute } from '../../../const/pathList'
import CreatePlan from '../../../components/popup/CreatePlan'
import React, { useState, useEffect } from 'react'
import { type Plan, type PageInfo, type PlanFilter } from '../../../model/user/planType'
import ApiPrivate from '../../../services/ApiPrivate'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
import { formDate } from '../../../utils/formDate'
import PlanFilterPopup from './PlanFilterPopup'
import type { InitialState } from '../../../model/initialType/initialType'
const PlanList = () => {
  const navigate = useNavigate()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(-1)
  const [filter, setFilter] = useState<PlanFilter>()
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, limit: 5, totalPage: 1 })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [initialCigarettes, setInitialCigarettes] = useState<InitialState[]>()
  const fetchPlans = async (page: number = 1, limit: number = 5) => {
    setLoading(true)
    try {
      const res = await ApiPrivate.getAllPlans(page, limit, sort, filter)
      setPlans(res.data.listData)
      setPageInfo(res.data.pageInfo)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi tải danh sách kế hoạch:', error)
      toast.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchAllInitialCigarettes = async () => {
      try {
        const response = await ApiPrivate.getAllInitialState()
        setInitialCigarettes(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllInitialCigarettes()
    fetchPlans(pageInfo.page, pageInfo.limit)
  }, [pageInfo.page, pageInfo.limit, sort, filter])

  const handleViewDetail = (id: string) => {
    navigate(UserRoute.PLAN_DETAIL_PATH.replace(':id', id))
  }

  const handleCreatePlan = () => {
    setIsPopupOpen(true)
  }

  const handleCreateSuccess = () => {
    setIsPopupOpen(false)
    fetchPlans(pageInfo.page, pageInfo.limit)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage !== pageInfo.page && newPage >= 1 && newPage <= pageInfo.totalPage) {
      setPageInfo(prev => ({ ...prev, page: newPage }))
    }
  }

  const handleDeletePlan = async (id: string) => {
    const confirm = window.confirm('Do you want to delete this plan ?')
    if (!confirm) return

    try {
      await ApiPrivate.deletePlanById(id)
      toast.success('🗑️ Delete successfully!')
      fetchPlans(pageInfo.page, pageInfo.limit)
    } catch (err) {
    // eslint-disable-next-line no-console
      console.error('Lỗi khi xoá kế hoạch:', err)
      toast.error(err as string)
    }
  }
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value) {
      setSort(Number(value))
    }
  }
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-5">Plan process</h1>
      <div className="flex justify-center items-center max-w-6xl mx-auto ">
        <div className='relative flex gap-5 items-center'>
          <button
            onClick={handleCreatePlan}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
          + Create
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
                {filter?.initial_cigarette_id &&
                <div className='bg-gray-200 w-55 px-3 rounded-2xl py-2 flex justify-between text-[0.8rem]'>
                  <p>
                    Initial state nicotine: {initialCigarettes?.find(item => item._id === filter.initial_cigarette_id)?.nicotine_evaluation}
                  </p>
                  <button className='bg-red-400 rounded-2xl w-5 aspect-square text-white hover:opacity-70 cursor-pointer' onClick={() => setFilter(prev => ({ ...prev, initial_cigarette_id: undefined }))}>x</button>
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
              <PlanFilterPopup setIsOpen={setIsFilterOpen} setFilter={setFilter}/>
            </div>
          }
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay: nền mờ + tối */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Popup nội dung */}
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <CreatePlan onSuccessCreate={handleCreateSuccess} />
          </div>
        </div>
      )}

      <div className="p-6 max-w-5xl mx-auto">
        {loading ? (
          <LoadingScreenBg/>
        ) : plans.length === 0 ? (
          <div className="text-center text-gray-400 py-10 text-base">
              No plans found. Please create a new plan.
          </div>
        ) : (
          <>
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-white p-5 rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.2)]  mb-5 transition"
              >
                <div className="mb-2">
                  <p className='text-2xl'>❤️‍🩹{plan.content}</p>
                  <div className='flex gap-10 items-center mt-5'>
                    <p className='text-[#ddeedf] bg-[#42b883] w-fit px-20 py-1 rounded-2xl font-bold'>Start time: {formDate(plan.start_date)}</p>
                    <p className=''>Total stages: {plan.process_stage.length}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    onClick={() => handleViewDetail(plan._id)}
                    className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
                  >
                      Detail
                  </button>
                  <button
                    onClick={() => handleDeletePlan(plan._id)}
                    className="text-sm text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
                  >
                      Delete
                  </button>
                </div>

              </div>
            ))}
            {/* Pagination Controls */}
            <div className="flex justify-center mt-8 gap-2">
              <button
                disabled={pageInfo.page === 1}
                onClick={() => handlePageChange(pageInfo.page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">Trang {pageInfo.page} / {pageInfo.totalPage}</span>
              <button
                disabled={pageInfo.page === pageInfo.totalPage}
                onClick={() => handlePageChange(pageInfo.page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
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

export default PlanList
