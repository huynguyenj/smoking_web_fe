import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // thêm useNavigate
import privateApiService from '../../../services/ApiPrivate'
import type { CigaretteRecord } from '../../../model/user/cigarettesType'

// MUI Icons
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SavingsIcon from '@mui/icons-material/Savings'
import ScoreIcon from '@mui/icons-material/Score'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

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
        // eslint-disable-next-line no-console
        console.error('Lỗi lấy chi tiết thuốc lá:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [id])

  if (loading) return <p className="text-center py-10">Đang tải dữ liệu...</p>
  if (!record) return <p className="text-center text-red-600 py-10">Không tìm thấy bản ghi</p>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        {/* ✅ Header màu trong thẻ */}
        <div className="bg-black text-white px-6 py-4">
          <h1 className="text-2xl font-bold text-center">📄 Chi tiết bản ghi thuốc lá</h1>
        </div>

        {/* ✅ Nội dung chi tiết */}
        <div className="p-6 space-y-6">
          {/* Thông tin hút thuốc */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">🚬 Thông tin hút thuốc</h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <LocalFireDepartmentIcon className="text-red-600" />
                <strong>Lượng hút:</strong> {record.amount} điếu
              </p>
              <p className="flex items-center gap-2">
                <AccessTimeIcon className="text-gray-600" />
                <strong>Số lần hút/ngày:</strong> {record.smoking_frequency_per_day} lần
              </p>
              <p className="flex items-center gap-2">
                <AttachMoneyIcon className="text-green-600" />
                <strong>Tiền tiêu/ngày:</strong> {record.money_consumption_per_day.toLocaleString()} VND
              </p>
              <p className="flex items-center gap-2">
                <SavingsIcon className="text-green-700" />
                <strong>Tiền tiết kiệm:</strong> {record.saving_money.toLocaleString()} VND
              </p>
            </div>
          </div>

          {/* Đánh giá nicotine */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">🧪 Đánh giá nicotine</h2>
            <p className="text-purple-800 font-bold text-lg flex items-center gap-2">
              <ScoreIcon className="text-purple-600" />
              Điểm đánh giá: {record.nicotine_evaluation}/10
            </p>
          </div>

          {/* Thời gian */}
          <div className="bg-green-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-3">📅 Thời gian</h2>
            <p className="flex items-center gap-2">
              <CalendarMonthIcon className="text-green-600" />
              <strong>Ngày tạo:</strong> {new Date(record.create_date).toLocaleString()}
            </p>
            <p className="flex items-center gap-2">
              <CalendarMonthIcon className="text-green-600" />
              <strong>Ngày bỏ thuốc:</strong>{' '}
              {record.no_smoking_date
                ? new Date(record.no_smoking_date).toLocaleString()
                : 'Chưa có'}
            </p>
          </div>

          {/* Trạng thái */}
          <div className="bg-red-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-red-700 mb-3">📌 Trạng thái bản ghi</h2>
            <p className="flex items-center gap-2 text-lg">
              {record.isDeleted ? (
                <>
                  <DeleteIcon className="text-red-600" />
                  <span className="text-red-600 font-medium">❌ Đã xóa</span>
                </>
              ) : (
                <>
                  <CheckCircleIcon className="text-green-600" />
                  <span className="text-green-600 font-medium">✅ Hoạt động</span>
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
              ← Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
