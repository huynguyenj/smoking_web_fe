import { useState } from 'react'
import type { Plan, HealthStatus, CreatePlanPayload } from '../../model/user/planType'
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
      const { content, health_status, start_date } = updatedPlan

      const payload: CreatePlanPayload = {
        content,
        health_status,
        start_date
      }

      await ApiPrivate.updatePlanById(updatedPlan._id, payload)
      setMessage('Update successfully!')
      if (onSuccessUpdate) onSuccessUpdate()
    } catch (error) {
      setMessage(error as string)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-2">Update plan</h2>

      {message && (
        <p
          className={`text-sm ${message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}`}
        >
          {message}
        </p>
      )}

      <div className="space-y-1">
        <label htmlFor='content' className="block text-sm font-medium">Content:</label>
        <input
          id='content'
          type="text"
          value={updatedPlan.content}
          onChange={(e) => handleChange('content', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor='health' className="block text-sm font-medium">Health status:</label>
        <select
          id='health'
          value={updatedPlan.health_status}
          onChange={(e) => handleChange('health_status', e.target.value as HealthStatus)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="good">Good</option>
          <option value="average">Normal</option>
          <option value="bad">Bad</option>
        </select>
      </div>

      <div className="space-y-1">
        <label htmlFor='start-date' className="block text-sm font-medium">Start date:</label>
        <input
          id='start-date'
          type="date"
          value={new Date(updatedPlan.start_date).toISOString().split('T')[0]}
          onChange={(e) => handleChange('start_date', new Date(e.target.value).getTime())}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition"
      >
        {loading ? 'Loading' : 'Update'}
      </button>
    </div>
  )
}
