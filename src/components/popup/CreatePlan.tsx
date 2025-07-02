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
      <h2 className="text-2xl font-semibold mb-2">Create plan</h2>

      {message && (
        <p
          className={`text-sm ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}
        >
          {message}
        </p>
      )}

      <div className="space-y-1">
        <label className="block text-sm font-medium">Content</label>
        <input
          type="text"
          value={plan.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Plan content..."
        />
      </div>

      <div className="space-y-1">
        <label htmlFor='health-status' className="block text-sm font-medium">Health status:</label>
        <select
          id='health-status'
          value={plan.health_status}
          onChange={(e) => handleChange('health_status', e.target.value as HealthStatus)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="good">Good</option>
          <option value="average">Normal</option>
          <option value="bad">Bad</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor='stage' className="block text-sm font-medium">Stage:</label>
        <select
          id='stage'
          value={plan.process_stage}
          onChange={(e) => handleChange('process_stage', e.target.value as ProcessStage)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="start">Start</option>
          <option value="process">Process</option>
          <option value="finish">Complete</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor='start-date' className="block text-sm font-medium">Start date:</label>
        <input
          id='start-date'
          type="date"
          value={new Date(plan.start_date).toISOString().split('T')[0]}
          onChange={(e) => handleChange('start_date', new Date(e.target.value).getTime())}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor='end-date' className="block text-sm font-medium">Expect end date:</label>
        <input
          id='end-date'
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
        {loading ? 'Loading...' : 'Create'}
      </button>
    </div>
  )
}
