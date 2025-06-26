import { useState } from 'react'
import type { CreatePlanPayload, HealthStatus, ProcessStage } from '../../model/user/planType'
import ApiPrivate from '../../services/ApiPrivate'
import { useTokenInfoStorage } from '../../store/authStore'

type Props = {
  onSuccessCreate?: () => void
}

export default function CreatePlan({ onSuccessCreate }: Props) {
  const [plan, setPlan] = useState<CreatePlanPayload>({
    process_stage: 'start',
    health_status: 'bad',
    content: '',
    start_date: Date.now(),
    expected_result_date: Date.now()
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (
    field: keyof CreatePlanPayload,
    value: string | number
  ) => {
    setPlan((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    try {
      const user_id = useTokenInfoStorage.getState().userInfo?._id

      if (!user_id) {
        setMessage('❌ Bạn chưa đăng nhập!')
        setLoading(false)
        return
      }
      const fullPayload = {
        ...plan,
        user_id
      }
      await ApiPrivate.createPlan(fullPayload)
      setMessage('✅ Tạo kế hoạch thành công!')

      // ✅ Gọi callback để đóng popup & reload list
      if (onSuccessCreate) onSuccessCreate()
    } catch (error: unknown) {
      const errMsg =
      error instanceof Error ? error.message : '❌ Có lỗi không xác định'
      setMessage(`❌ ${errMsg}`)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-2">Tạo kế hoạch mới</h2>

      {message && (
        <p
          className={`text-sm ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}
        >
          {message}
        </p>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium">Nội dung:</label>
        <input
          type="text"
          value={plan.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nội dung kế hoạch..."
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Tình trạng sức khỏe:</label>
        <select
          value={plan.health_status}
          onChange={(e) => handleChange('health_status', e.target.value as HealthStatus)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="good">Tốt</option>
          <option value="average">Trung bình</option>
          <option value="bad">Tệ</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Giai đoạn:</label>
        <select
          value={plan.process_stage}
          onChange={(e) => handleChange('process_stage', e.target.value as ProcessStage)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="start">Bắt đầu</option>
          <option value="process">Đang thực hiện</option>
          <option value="finish">Hoàn thành</option>
          <option value="cancel">Đã huỷ</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Ngày bắt đầu:</label>
        <input
          type="date"
          value={new Date(plan.start_date).toISOString().split('T')[0]}
          onChange={(e) => handleChange('start_date', new Date(e.target.value).getTime())}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Ngày kết thúc:</label>
        <input
          type="date"
          value={new Date(plan.expected_result_date).toISOString().split('T')[0]}
          onChange={(e) =>
            handleChange('expected_result_date', new Date(e.target.value).getTime())
          }
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
      >
        {loading ? 'Đang tạo...' : 'Tạo kế hoạch'}
      </button>
    </div>
  )
}
