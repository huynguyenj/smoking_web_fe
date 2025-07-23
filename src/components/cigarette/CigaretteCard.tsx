import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CigaretteRecord } from '../../model/user/cigarettesType'
import { UserRoute } from '../../const/pathList'
import LoadingScreenBg from '../loading/LoadingScreenBg'
import { useMembershipStorage } from '../../store/authStore'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'
import CustomModal from '../modal/CustomModal'
import useOpen from '../../hooks/openState/useOpen'
import { formatCurrencyVND } from '../../utils/formatCurrency'
import { formDate } from '../../utils/formDate'

interface Props {
  item: CigaretteRecord;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (item: CigaretteRecord) => void;
}

export default function CigaretteCard({ item, onDelete, onUpdate }: Props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const membership = useMembershipStorage.getState().membershipInfo
  const { isOpen, toggle } = useOpen()
  const [recommend, setRecommend] = useState<string>()
  const handleViewDetail = () => {
    navigate(UserRoute.SMOKING_PROCESS_DETAIL_PATH.replace(':id', item._id))
  }

  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      await onUpdate(item)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await onDelete(item._id)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetRecommend = async () => {
    try {
      setIsLoading(true)
      const response = await privateApiService.getAdviceFromAI(item._id)
      setRecommend(response.data)
      toggle()
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }
  if (isLoading) return <LoadingScreenBg />

  return (
    <div className="bg-white p-5 rounded-2xl shadow-[0px_0px_15px_rgba(0,0,0,0.2)]  mb-5 transition">
      <p>
        <strong>Smoking frequency per day:</strong>{' '}
        {item.smoking_frequency_per_day}
      </p>
      <p>
        <strong>Money consumption per day:</strong>{' '}
        {formatCurrencyVND(item.money_consumption_per_day)}
      </p>
      <p>
        <strong>Money saving:</strong> {formatCurrencyVND(item.saving_money)}
      </p>
      <p>
        <strong>Created date:</strong>{' '}
        {formDate(item.create_date)}
      </p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={handleViewDetail}
          className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition cursor-pointer"
        >
          Details
        </button>
        <button
          onClick={handleUpdate}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          📝 Update
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          🗑 Delete
        </button>
        {membership?.membership_title === 'Premium' &&
        <button
          onClick={handleGetRecommend}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-400 cursor-pointer"
        >
          🚀 Get recommend by AI
        </button>
        }
      </div>
      {recommend && isOpen ?
        <CustomModal>
          <div className='bg-white z-10 p-10 overflow-y-auto rounded-2xl relative w-150 h-150'>
            <div className='absolute w-7 h-7 flex justify-center items-center top-2 left-5 bg-black-fig rounded-full text-white font-bold cursor-pointer hover:opacity-70' onClick={toggle}>x</div>
            <p className='text-2xl text-center bg-green-300 rounded-2xl py-2 mb-3'>AI recommendation</p>
            <div
              className="text-gray-700 text-lg mb-10 quill-html"
              dangerouslySetInnerHTML={{ __html: recommend as string }}
            />

          </div>
        </CustomModal>
        :
        <></>
      }
    </div>
  )
}
