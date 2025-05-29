import { useParams } from 'react-router-dom'
import StatusPieChart from '../../../components/chart/StatusPieChart'

interface Plan {
  _id: string
  user_ID: string
  process_stage: string
  health_status: string
  content: string
  start_date: string
  expected_result_date: string
  create_by: string
  isDelete: boolean
}

const mockPlanData: Record<string, Plan> = {
  '1': {
    _id: '1',
    user_ID: 'u001',
    process_stage: 'in_progress',
    health_status: 'Ổn định',
    content: 'Bỏ thuốc trong 30 ngày',
    start_date: '2025-05-01T00:00:00Z',
    expected_result_date: '2025-05-30T00:00:00Z',
    create_by: 'u001',
    isDelete: false
  },
  '2': {
    _id: '2',
    user_ID: 'u002',
    process_stage: 'completed',
    health_status: 'Tốt',
    content: 'Giảm hút thuốc còn 1 điếu/ngày',
    start_date: '2025-04-01T00:00:00Z',
    expected_result_date: '2025-04-30T00:00:00Z',
    create_by: 'u002',
    isDelete: false
  },
  '3': {
    _id: '3',
    user_ID: 'u003',
    process_stage: 'not_started',
    health_status: 'Trung bình',
    content: 'Tập thể dục sáng 10 ngày',
    start_date: '2025-03-01T00:00:00Z',
    expected_result_date: '2025-03-30T00:00:00Z',
    create_by: 'u003',
    isDelete: false
  }
}

const PlanDetail = () => {
  const { id } = useParams<{ id: string }>()
  const plan = mockPlanData[id || '']

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
              <p className={`font-semibold mt-1 ${plan.isDelete ? 'text-red-600' : 'text-green-600'}`}>
                {plan.isDelete ? 'Đã xóa' : 'Chưa xóa'}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 font-medium">📝 Nội dung kế hoạch</p>
              <div className="bg-gray-50 border border-gray-300 p-4 rounded-md mt-1 text-gray-700 leading-relaxed whitespace-pre-line shadow-sm">
                {plan.content}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[160px]">
              <StatusPieChart status={plan.process_stage as 'not_started' | 'in_progress' | 'completed'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanDetail
