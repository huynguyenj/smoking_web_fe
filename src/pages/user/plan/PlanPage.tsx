import { useNavigate } from 'react-router-dom'
import { UserRoute } from '../../../const/pathList'
interface Plan {
  _id: string
  user_ID: string
  process_stage: 'not_started' | 'in_progress' | 'completed'
  health_status: string
  content: string
  start_date: string
  expected_result_date: string
  create_by: string
  isDelete: boolean
}

const plans: Plan[] = [
  {
    _id: '1',
    user_ID: 'u001',
    process_stage: 'in_progress',
    health_status: 'Ổn định',
    content: 'Kế hoạch bỏ thuốc 30 ngày',
    start_date: '2025-05-01T00:00:00Z',
    expected_result_date: '2025-05-30T00:00:00Z',
    create_by: 'u001',
    isDelete: false
  },
  {
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
  {
    _id: '3',
    user_ID: 'u003',
    process_stage: 'not_started',
    health_status: 'Trung bình',
    content: 'Tập thể dục sáng 10 ngày',
    start_date: '2025-06-01T00:00:00Z',
    expected_result_date: '2025-06-10T00:00:00Z',
    create_by: 'u003',
    isDelete: false
  }
]

const getProgressPercent = (stage: Plan['process_stage']) => {
  switch (stage) {
  case 'not_started':
    return 0
  case 'in_progress':
    return 50
  case 'completed':
    return 100
  default:
    return 0
  }
}

const PlanList = () => {
  const navigate = useNavigate()

  const handleViewDetail = (id: string) => {
    navigate(UserRoute.PLAN_DETAIL_PATH.replace(':id', id))
  }

  const handleCreatePlan = () => {
    navigate('/create-plan')
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Tiến độ các kế hoạch</h1>
        <button
          onClick={handleCreatePlan}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Tạo kế hoạch
        </button>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        {plans.map(plan => {
          const percent = getProgressPercent(plan.process_stage)
          return (
            <div
              key={plan._id}
              className="bg-white p-4 rounded shadow hover:shadow-md mb-5 transition"
            >
              <p className="text-sm text-gray-600 mb-1">
                <b>Trạng thái:</b> {plan.process_stage}
              </p>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                {plan.content}
              </p>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <p className="text-sm text-right text-gray-500 mt-1">{percent}%</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleViewDetail(plan._id)}
                  className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlanList
