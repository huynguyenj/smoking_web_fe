import { useState } from 'react'
import type {
  CigaretteRecord,
  UpdateCigarettePayload
} from '../../model/user/cigarettesType'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'

interface Props {
  initialData: CigaretteRecord;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateCigarettePopup({
  initialData,
  onClose,
  onSuccess
}: Props) {
  const [frequency, setFrequency] = useState(
    initialData.smoking_frequency_per_day
  )
  const [money, setMoney] = useState(initialData.money_consumption_per_day)
  const [savingMoney, setSavingMoney] = useState(initialData.saving_money)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    const payload: UpdateCigarettePayload = {
      smoking_frequency_per_day: frequency,
      money_consumption_per_day: money,
      saving_money: savingMoney
    }

    try {
      setLoading(true)
      await privateApiService.updateCigaretteById(initialData._id, payload)
      toast.success('Update successfully!')
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
        <h2 className="text-xl font-bold">Update cigarette information</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleUpdate()
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="times" className="block mb-1 font-medium">
              Smoking frequency per day
            </label>
            <input
              id="times"
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="money" className="block mb-1 font-medium">
              Money consumption per day
            </label>
            <input
              id="money"
              type="number"
              value={money}
              onChange={(e) => setMoney(+e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="money-saving" className="block mb-1 font-medium">
              Money saving
            </label>
            <input
              id="money-saving"
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
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
