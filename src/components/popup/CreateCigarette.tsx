import { useEffect, useState } from 'react'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

interface Plan {
  _id: string;
  content: string;
}

export default function CreateCigarettePopup({ onClose, onSuccess }: Props) {
  const [frequency, setFrequency] = useState(0)
  const [money, setMoney] = useState(0)
  const [savingMoney, setSavingMoney] = useState(0)
  const [planId, setPlanId] = useState('')
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await privateApiService.getAllPlanOfUser()
        setPlans(res.data)
      } catch (err) {
        toast.error(err as string)
      }
    }
    fetchPlans()
  }, [])

  const handleCreate = async () => {
    if (!planId) {
      toast.error('Please select a plan')
      return
    }

    setLoading(true)
    try {
      const payload = {
        smoking_frequency_per_day: frequency,
        money_consumption_per_day: money,
        saving_money: savingMoney,
        plan_id: planId // ✅ gửi plan_id
      }

      await privateApiService.createCigarette(payload)
      toast.success('Create successfully!')
      onSuccess()
      onClose()
    } catch (err) {
      toast.error(err as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Create new cigarette process</h2>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          handleCreate()
        }}
      >
        <div>
          <label htmlFor="planId" className="block font-medium mb-1">Plan</label>
          <select
            id="planId"
            className="w-full border px-3 py-2 rounded"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
            required
          >
            <option value="">-- Select plan --</option>
            {plans.map((plan) => (
              <option key={plan._id} value={plan._id}>
                {plan.content}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="frequency" className="block font-medium mb-1">
            Smoking frequency per day
          </label>
          <input
            id="frequency"
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={frequency}
            onChange={(e) => setFrequency(+e.target.value)}
            required
            min={0}
          />
        </div>

        <div>
          <label htmlFor="money" className="block font-medium mb-1">
            Money consumption per day
          </label>
          <input
            id="money"
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={money}
            onChange={(e) => setMoney(+e.target.value)}
            required
            min={0}
          />
        </div>

        <div>
          <label htmlFor="savingMoney" className="block font-medium mb-1">
            Saving money
          </label>
          <input
            id="savingMoney"
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={savingMoney}
            onChange={(e) => setSavingMoney(+e.target.value)}
            required
            min={0}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
