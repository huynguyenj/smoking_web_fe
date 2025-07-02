import { useState } from 'react'
import type { CigaretteRecord, CreateCigarettePayload } from '../../model/user/cigarettesType'
import privateApiService from '../../services/ApiPrivate'
import NicotineQuizPopup from './NicotineQuiz'

interface Props {
  initialData: CigaretteRecord
  onClose: () => void
  onSuccess: () => void
}

export default function UpdateCigarettePopup({ initialData, onClose, onSuccess }: Props) {
  const [amount, setAmount] = useState(initialData.amount)
  const [frequency, setFrequency] = useState(initialData.smoking_frequency_per_day)
  const [money, setMoney] = useState(initialData.money_consumption_per_day)
  const [nicotine, setNicotine] = useState(initialData.nicotine_evaluation)
  const [savingMoney, setSavingMoney] = useState(initialData.saving_money)
  const [loading, setLoading] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)

  const handleUpdate = async () => {
    const payload: CreateCigarettePayload = {
      amount,
      smoking_frequency_per_day: frequency,
      money_consumption_per_day: money,
      nicotine_evaluation: nicotine,
      saving_money: savingMoney
    }

    try {
      setLoading(true)
      await privateApiService.updateCigaretteById(initialData._id, payload)
      onSuccess()
      onClose()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Lỗi cập nhật thuốc lá:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Cập nhật thông tin thuốc lá</h2>

        <form onSubmit={(e) => { e.preventDefault(); handleUpdate() }} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Lượng hút</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Số lần hút/ngày</label>
            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Tiền tiêu/ngày</label>
            <input
              type="number"
              value={money}
              onChange={(e) => setMoney(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Đánh giá nicotine</label>
            {nicotine === null ? (
              <button
                type="button"
                onClick={() => setShowQuiz(true)}
                className="px-3 py-2 bg-purple-500 text-white rounded"
              >
                Làm bài đánh giá
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <p className="font-semibold text-green-600">
                  ✅ Điểm đánh giá: {nicotine}/10
                </p>
                <button
                  type="button"
                  onClick={() => setShowQuiz(true)}
                  className="ml-4 text-sm text-blue-500 underline"
                >
                  Đánh giá lại
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Tiền tiết kiệm</label>
            <input
              type="number"
              value={savingMoney}
              onChange={(e) => setSavingMoney(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading || nicotine === null}
            >
              {loading ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>

      {/* Quiz popup hiển thị dạng overlay riêng */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
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
