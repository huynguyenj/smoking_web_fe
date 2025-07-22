import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import privateApiService from '../../../services/ApiPrivate'
import type { InitialState } from '../../../model/initialType/initialType'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
import axios from 'axios'
import { formatCurrencyVND } from '../../../utils/formatCurrency'
import { formDate } from '../../../utils/formDate'

export default function InitialStateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<InitialState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDetail = async () => {
    if (!id) return
    setLoading(true)
    try {
      const res = await privateApiService.getInitialStateDetailById(id)
      setData(res.data)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || err.message || 'Failed to fetch data.'
        )
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unknown error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [id])

  if (loading) return <LoadingScreenBg />

  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
        >
          ← Back
        </button>
      </div>
    )

  if (!data) return null

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-lg shadow-md">
      {/* 🧭 Header */}
      <div className="-mx-6 -mt-10 bg-gray-900 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium hover:underline"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold text-center flex-1">
          🚬 Initial State Detail
        </h1>
        <div className="w-12" /> {/* Giữ tiêu đề luôn ở giữa */}
      </div>

      {/* 📋 Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 mt-6">
        <div className="flex items-start space-x-2 p-4 border rounded shadow-sm bg-gray-50">
          <span className="text-blue-500">🚬</span>
          <div>
            <p className="text-sm text-gray-500">Smoke Amount</p>
            <p className="font-semibold text-lg">{data.amount_cigarettes}</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 p-4 border rounded shadow-sm bg-gray-50">
          <span className="text-blue-500">📅</span>
          <div>
            <p className="text-sm text-gray-500">Amount per day</p>
            <p className="font-semibold text-lg">
              {data.smoking_frequency_per_day}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 p-4 border rounded shadow-sm bg-gray-50">
          <span className="text-blue-500">💸</span>
          <div>
            <p className="text-sm text-gray-500">Money per cigarette</p>
            <p className="font-semibold text-lg">
              {formatCurrencyVND(data.money_each_cigarette)}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 p-4 border rounded shadow-sm bg-gray-50">
          <span className="text-blue-500">🧪</span>
          <div>
            <p className="text-sm text-gray-500">Nicotine evaluation</p>
            <p className="font-semibold text-lg">
              {data.nicotine_evaluation}/10
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-2 p-4 border rounded shadow-sm bg-gray-50 col-span-1 sm:col-span-2">
          <span className="text-blue-500">⏰</span>
          <div>
            <p className="text-sm text-gray-500">Created date</p>
            <p className="font-semibold text-lg">
              {formDate(data.create_date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
