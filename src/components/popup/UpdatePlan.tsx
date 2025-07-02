import { useState } from 'react'
import type { Plan, HealthStatus, ProcessStage, CreatePlanPayload } from '../../model/user/planType'
import ApiPrivate from '../../services/ApiPrivate'

interface Props {
  plan: Plan
  onSuccessUpdate?: () => void
}

export default function UpdatePlan({ plan, onSuccessUpdate }: Props) {
  const [updatedPlan, setUpdatedPlan] = useState<Plan>({ ...plan })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (field: keyof Plan, value: string | number | boolean) => {
    setUpdatedPlan((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    try {
      const { content, health_status, process_stage, start_date, expected_result_date } = updatedPlan

      const payload: CreatePlanPayload = {
        content,
        health_status,
        process_stage,
        start_date,
        expected_result_date
      }

      await ApiPrivate.updatePlanById(updatedPlan._id, payload)
      setMessage('✅ Cập nhật kế hoạch thành công!')
      if (onSuccessUpdate) onSuccessUpdate()
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
      <h2 className="text-2xl font-semibold mb-2">Cập nhật kế hoạch</h2>

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
          value={updatedPlan.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Tình trạng sức khỏe:</label>
        <select
          value={updatedPlan.health_status}
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
          value={updatedPlan.process_stage}
          onChange={(e) => handleChange('process_stage', e.target.value as ProcessStage)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="start">Chưa bắt đầu</option>
          <option value="process">Đang thực hiện</option>
          <option value="finish">Hoàn thành</option>
          <option value="cancel">Đã huỷ</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Ngày bắt đầu:</label>
        <input
          type="date"
          value={new Date(updatedPlan.start_date).toISOString().split('T')[0]}
          onChange={(e) => handleChange('start_date', new Date(e.target.value).getTime())}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Ngày kết thúc:</label>
        <input
          type="date"
          value={new Date(updatedPlan.expected_result_date).toISOString().split('T')[0]}
          onChange={(e) => handleChange('expected_result_date', new Date(e.target.value).getTime())}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition"
      >
        {loading ? 'Đang cập nhật...' : 'Cập nhật kế hoạch'}
      </button>
    </div>
  )
}
