import React from 'react'
import LoadingScreenBg from '../loading/LoadingScreenBg'
import { useNavigate } from 'react-router-dom'
import type { InitialState } from '../../model/initialType/initialType'
import { UserRoute } from '../../const/pathList'
import { formDate } from '../../utils/formDate'
import { formatCurrencyVND } from '../../utils/formatCurrency'

interface Props {
  item: InitialState;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (item: InitialState) => void;
}

export default function InitialCard({ item, onDelete, onUpdate }: Props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleViewDetail = () => {
    setIsLoading(true)
    navigate(UserRoute.INITIAl_STATE_DETAIL.replace(':id', item._id))
  };

  if (isLoading) return <LoadingScreenBg />

  return (
    <li className="p-5 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800">
        <p>
          <strong>🚬 Smoke Amount:</strong> {item.amount_cigarettes}
        </p>
        <p>
          <strong>📅 Amount/day:</strong> {item.smoking_frequency_per_day}
        </p>
        <p>
          <strong>💸 Money/cigarette:</strong>{' '}
          {formatCurrencyVND(item.money_each_cigarette)}
        </p>
        <p>
          <strong>🧪 Nicotine eval:</strong> {item.nicotine_evaluation}/10
        </p>
        <p className="sm:col-span-2">
          <strong>⏰ Created at:</strong>{' '}
          {formDate(item.create_date)}
        </p>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleViewDetail}
          className="text-sm text-blue-600 border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 transition"
        >
          🔍 Details
        </button>
        <button
          onClick={() => onUpdate(item)}
          className="text-sm px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          📝 Update
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="text-sm px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🗑 Delete
        </button>
      </div>
    </li>
  )
}
