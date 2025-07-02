// components/card/CigaretteCard.tsx
import type { CigaretteRecord } from '../../model/user/cigarettesType'
import { UserRoute } from '../../const/pathList'
import { useNavigate } from 'react-router-dom'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'
import { useState } from 'react'
import LoadingScreenBg from '../loading/LoadingScreenBg'
import useOpen from '../../hooks/openState/useOpen'
import { useMembershipStorage } from '../../store/authStore'
interface Props {
  item: CigaretteRecord
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void
  // eslint-disable-next-line no-unused-vars
  onUpdate: (item: CigaretteRecord) => void // ✅ Thêm prop onUpdate
}

export default function CigaretteCard({ item, onDelete, onUpdate }: Props) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [AIAdvice, setAIAdvice] = useState<string | null>(null)
  const { membershipInfo } = useMembershipStorage()
  const { toggle, isOpen } = useOpen()
  const handleViewDetail = () => {
    navigate(UserRoute.SMOKING_PROCESS_DETAIL_PATH.replace(':id', item._id))
  }
  const getRecommendationPlan = async () => {
    try {
      setIsLoading(true)
      await privateApiService.getRecommendPlan(item._id)
      toast.success('Get commend plan is successfully! Check you list plans again')
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  const getAdviceFromAI = async () => {
    try {
      setIsLoading(true)
      const response = await privateApiService.getAdviceFromAI(item._id)
      toggle()
      setAIAdvice(response.data)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }
  if (isLoading) return <LoadingScreenBg/>
  return (
    <li className="p-4 border rounded shadow">
      <p><strong>Smoke amounts:</strong> {item.amount}</p>
      <p><strong>Amount/1 day:</strong> {item.smoking_frequency_per_day}</p>
      <p><strong>Money/1 day:</strong> {item.money_consumption_per_day.toLocaleString()} VND</p>
      <p><strong>Nicotine evaluation:</strong> {item.nicotine_evaluation}/10</p>
      <p><strong>Money saving:</strong> {item.saving_money.toLocaleString()} VND</p>
      <p><strong>Created date:</strong> {new Date(item.create_date).toLocaleString()}</p>
      <p><strong>Day without smoking:</strong> {item.no_smoking_date ? new Date(item.no_smoking_date).toLocaleString() : 'No date'}</p>
      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={handleViewDetail}
          className="text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition cursor-pointer"
        >
          Details
        </button>
        <button
          onClick={() => onUpdate(item)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          📝 Update
        </button>
        <button
          onClick={getRecommendationPlan}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
        >
          🔧Get recommend plan
        </button>
        {membershipInfo?.membership_title.toLocaleLowerCase() === 'premium' &&
        <button
          onClick={getAdviceFromAI}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700 cursor-pointer"
        >
        🤖Get advice from AI
        </button>
        }
        <button
          onClick={() => onDelete(item._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
        >
          🗑 Delete
        </button>
        {AIAdvice && isOpen && (
          <div className="fixed over inset-0 z-50 flex items-center justify-center">
            <div className='absolute inset-0 backdrop-blur-2xl'></div>
            <div className="bg-white h-[90vh] overflow-y-auto w-[90%] max-w-xl p-6 rounded-2xl shadow-2xl animate-fadeIn z-10">
              <div className="flex justify-between items-center mb-4">
                <strong className="text-lg text-gray-800">AI Advice</strong>
                <button
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                  onClick={toggle}
                >
            &times;
                </button>
              </div>
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: AIAdvice.replace(/^```html/, '').replace(/```$/, '') }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}
