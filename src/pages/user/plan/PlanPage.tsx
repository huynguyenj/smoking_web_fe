import { useNavigate } from 'react-router-dom'
import { UserRoute } from '../../../const/pathList'
import CreatePlan from '../../../components/popup/CreatePlan'
import { useState, useEffect } from 'react'
import type { Plan, PageInfo } from '../../../model/user/planType'
import ApiPrivate from '../../../services/ApiPrivate'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
const PlanList = () => {
  const navigate = useNavigate()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [pageInfo, setPageInfo] = useState<PageInfo>({ page: 1, limit: 5, totalPage: 1 })

  const fetchPlans = async (page: number = 1, limit: number = 5) => {
    setLoading(true)
    try {
      const res = await ApiPrivate.getAllPlans(page, limit)
      setPlans(res.data.listData)
      setPageInfo(res.data.pageInfo)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi tải danh sách kế hoạch:', error)
      toast.error('❌ Không thể tải danh sách kế hoạch. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlans(pageInfo.page, pageInfo.limit)
  }, [pageInfo.page, pageInfo.limit])

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
    const confirm = window.confirm('Bạn có chắc chắn muốn xoá kế hoạch này?')
    if (!confirm) return

    try {
      await ApiPrivate.deletePlanById(id)
      toast.success('🗑️ Xoá kế hoạch thành công!')
      fetchPlans(pageInfo.page, pageInfo.limit)
    } catch (err) {
    // eslint-disable-next-line no-console
      console.error('Lỗi khi xoá kế hoạch:', err)
      toast.error('❌ Xoá kế hoạch thất bại. Vui lòng thử lại.')
    }
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Plan process</h1>
        <button
          onClick={handleCreatePlan}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create
        </button>
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
                className="bg-white p-4 rounded-lg shadow hover:shadow-md mb-5 transition"
              >
                <div className="mb-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span> {plan.process_stage}
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {plan.content.length > 55
                      ? plan.content.slice(0, 55) + '...'
                      : plan.content}
                  </p>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div
                    className={`
                      h-3 transition-all
                      ${plan.process_stage === 'start' ? 'bg-gray-400' : ''}
                      ${plan.process_stage === 'process' ? 'bg-blue-500 w-1/2' : ''}
                      ${plan.process_stage === 'finish' ? 'bg-green-500 w-full' : ''}
                      ${plan.process_stage === 'cancel' ? 'bg-red-500 w-full' : ''}
                    `}
                  ></div>
                </div>
                <p className="text-xs text-right text-gray-500 mt-1">
                  {plan.process_stage === 'start'
                    ? 'Start (0%)'
                    : plan.process_stage === 'process'
                      ? 'Process (50%)'
                      : plan.process_stage === 'finish'
                        ? 'Completed (100%)'
                        : plan.process_stage === 'cancel'
                          ? 'Cancel (0%)'
                          : ''}
                </p>
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
