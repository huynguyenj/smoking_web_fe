import { useState } from 'react'
import privateApiService from '../../services/ApiPrivate'
import NicotineQuizPopup from './NicotineQuiz'
import { toast } from 'react-toastify'

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateInitialPopup({ onClose, onSuccess }: Props) {
  const [amount, setAmount] = useState(0)
  const [frequency, setFrequency] = useState(0)
  const [money, setMoney] = useState(0)
  const [nicotine, setNicotine] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const handleCreate = async () => {
    if (nicotine === null) return
    setLoading(true)
    try {
      const payload = {
        amount_cigarettes: amount,
        smoking_frequency_per_day: frequency,
        money_each_cigarette: money,
        nicotine_evaluation: nicotine
      }

      await privateApiService.createInitialState(payload)
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
    <>
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
            <label htmlFor="amount" className="block font-medium mb-1">
              Number of cigarettes
            </label>
            <input
              id="amount"
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              required
              min={0}
            />
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
              Cost per cigarette (VND)
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
            <label className="block font-medium mb-1">
              Nicotine evaluation
            </label>
            {nicotine === null ? (
              <button
                type="button"
                onClick={() => setShowQuiz(true)}
                className="px-3 py-2 bg-purple-500 text-white rounded"
              >
                Do quiz
              </button>
            ) : (
              <p className="font-semibold text-green-600">
                Point: {nicotine}/10
              </p>
            )}
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
              disabled={loading || nicotine === null}
            >
              {loading ? 'Loading...' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      {/* Quiz popup hiển thị riêng dạng overlay */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white rounded-xl shadow-lg h-screen p-6 w-full max-w-lg overflow-y-auto">
            <NicotineQuizPopup
              onClose={() => setShowQuiz(false)}
              onSubmit={(score) => {
                setNicotine(score)
                setShowQuiz(false)
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}
