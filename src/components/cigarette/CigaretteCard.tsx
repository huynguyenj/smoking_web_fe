// components/card/CigaretteCard.tsx
import type { CigaretteRecord } from '../../model/user/cigarettesType'
import { UserRoute } from '../../const/pathList'
interface Props {
  item: CigaretteRecord
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void
  // eslint-disable-next-line no-unused-vars
  onUpdate: (item: CigaretteRecord) => void // ✅ Thêm prop onUpdate
}

export default function CigaretteCard({ item, onDelete, onUpdate }: Props) {

  const handleViewDetail = () => {
    window.location.href = UserRoute.SMOKING_PROCESS_DETAIL_PATH.replace(':id', item._id)
  }
  return (
    <li className="p-4 border rounded shadow">
      <p><strong>Lượng hút:</strong> {item.amount}</p>
      <p><strong>Số lần hút/ngày:</strong> {item.smoking_frequency_per_day}</p>
      <p><strong>Tiền tiêu/ngày:</strong> {item.money_consumption_per_day.toLocaleString()} VND</p>
      <p><strong>Đánh giá nicotine:</strong> {item.nicotine_evaluation}/10</p>
      <p><strong>Tiền tiết kiệm:</strong> {item.saving_money.toLocaleString()} VND</p>
      <p><strong>Ngày tạo:</strong> {new Date(item.create_date).toLocaleString()}</p>
      <p><strong>Ngày bỏ thuốc:</strong> {item.no_smoking_date ? new Date(item.no_smoking_date).toLocaleString() : 'Chưa có'}</p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={handleViewDetail}
          className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
        >
          Xem chi tiết
        </button>
        <button
          onClick={() => onUpdate(item)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          📝 Cập nhật
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑 Xoá
        </button>
      </div>
    </li>
  )
}
