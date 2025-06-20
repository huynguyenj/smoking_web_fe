import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StatusPieChart from '../../../components/chart/StatusPieChart'
import UpdatePlan from '../../../components/popup/UpdatePlan'
import ApiPrivate from '../../../services/ApiPrivate'
import type { Plan } from '../../../model/user/planType'

const PlanDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await ApiPrivate.getPlanDetail(id!)
        setPlan(res.data)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Lỗi khi tải chi tiết kế hoạch:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPlan()
  }, [id])

  if (loading) return <div className="p-6">Đang tải chi tiết kế hoạch...</div>
  if (!plan) return <div className="p-6">Không tìm thấy kế hoạch</div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
        <div className="bg-black-fig px-8 py-6">
          <h1 className="text-3xl font-bold text-white tracking-wide">📋 Chi tiết kế hoạch</h1>
          <p className="text-sm text-blue-100 mt-1">Tổng quan và tiến trình thực hiện kế hoạch</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-gray-800">
            <div>
              <p className="text-sm text-gray-500 font-medium">👤 Người tạo</p>
              <p className="text-lg font-semibold text-blue-700 mt-1">{plan.create_by}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">❤️ Tình trạng sức khỏe</p>
              <p className="text-base font-semibold mt-1">{plan.health_status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">📅 Ngày bắt đầu</p>
              <p className="text-base font-medium mt-1">{new Date(plan.start_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">🏁 Ngày hoàn thành dự kiến</p>
              <p className="text-base font-medium mt-1">{new Date(plan.expected_result_date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">🗑️ Trạng thái xóa</p>
              <p className={`font-semibold mt-1 ${plan.isDeleted ? 'text-red-600' : 'text-green-600'}`}>
                {plan.isDeleted ? 'Đã xóa' : 'Chưa xóa'}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 font-medium">📝 Nội dung kế hoạch</p>
              <div className="bg-gray-50 border border-gray-300 p-4 rounded-md mt-1 text-gray-700 leading-relaxed whitespace-pre-line shadow-sm">
                {plan.content}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="w-full max-w-[160px]">
              <StatusPieChart status={plan.process_stage} />
            </div>
            {/* 👇 Nút Cập nhật kế hoạch */}
            <button
              onClick={() => setIsUpdateOpen(true)}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow mt-20"
            >
              ✏️ Cập nhật kế hoạch
            </button>
          </div>
        </div>
      </div>

      {/* 👇 Popup UpdatePlan */}
      {isUpdateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Nền mờ + tối */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Nội dung popup */}
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
            <button
              onClick={() => setIsUpdateOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>
            <UpdatePlan
              plan={plan}
              onSuccessUpdate={() => {
                setIsUpdateOpen(false)
                setLoading(true)
                ApiPrivate.getPlanDetail(id!).then(res => setPlan(res.data)).finally(() => setLoading(false))
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanDetail
