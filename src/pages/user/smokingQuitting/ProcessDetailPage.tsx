import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // thêm useNavigate
import privateApiService from '../../../services/ApiPrivate'
import type { CigaretteRecord } from '../../../model/user/cigarettesType'

// MUI Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SavingsIcon from '@mui/icons-material/Savings'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
import { formDate } from '../../../utils/formDate'
import { formatCurrencyVND } from '../../../utils/formatCurrency'

export default function CigaretteDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate() // ✅
  const [record, setRecord] = useState<CigaretteRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return
      try {
        const res = await privateApiService.getCigaretteDetailById(id)
        setRecord(res.data)
      } catch (err) {
        toast.error(err as string)
        // eslint-disable-next-line no-console
        console.error('Lỗi lấy chi tiết thuốc lá:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id])

  if (loading) return <LoadingScreenBg />
  if (!record)
    return (
      <p className="text-center text-red-600 py-10">No data has been found</p>
    )

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-black text-white px-6 py-4">
          <h1 className="text-2xl font-bold text-center">📄Detail</h1>
        </div>

        {/* ✅ Nội dung chi tiết */}
        <div className="p-6 space-y-6">
          {/* Thông tin hút thuốc */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              🚬 Cigarette information
            </h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <AccessTimeIcon className="text-gray-600" />
                <strong>Smoking frequency per day:</strong>{' '}
                {record.smoking_frequency_per_day} times
              </p>
              <p className="flex items-center gap-2">
                <AttachMoneyIcon className="text-green-600" />
                <strong>Money consumption per day:</strong>{' '}
                {formatCurrencyVND(record.money_consumption_per_day)}
              </p>
              <p className="flex items-center gap-2">
                <SavingsIcon className="text-green-700" />
                <strong>Saving money:</strong>{' '}
                {formatCurrencyVND(record.saving_money)}
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              📅 Time
            </h2>
            <p className="flex items-center gap-2">
              <CalendarMonthIcon className="text-green-600" />
              <strong>Created date:</strong>{' '}
              {formDate(record.create_date)}
            </p>
          </div>

          {/* Trạng thái */}
          <div className="bg-red-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              📌 Status
            </h2>
            <p className="flex items-center gap-2 text-lg">
              {record.isDeleted ? (
                <>
                  <DeleteIcon className="text-red-600" />
                  <span className="text-red-600 font-medium">
                    ❌ Is deleted
                  </span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="text-green-600" />
                  <span className="text-green-600 font-medium">✅ Active</span>
                </>
              )}
            </p>
          </div>

          {/* 🔙 Nút quay lại */}
          <div className="pt-4 text-center">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              ← Back to list
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
