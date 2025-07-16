import { useEffect, useState } from 'react'
import type { RankData } from '../../../model/user/rankType'
import privateApiService from '../../../services/ApiPrivate'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
import StarIcon from '@mui/icons-material/Star'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
type Props = {
   active: boolean
}
export default function AchievementPage({ active }: Props ) {
  const [rankInfo, setRankInfo] = useState<RankData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleGetAchievement = async () => {
    try {
      setIsLoading(true)
      const response = await privateApiService.getUserCurrentRank()
      setRankInfo(response.data)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (active) {
      handleGetAchievement()
    }
  }, [active])
  if (isLoading) return <LoadingScreenBg/>
  return (
    <div>
      {rankInfo ?
        <div>
          <div className='flex gap-5'>
            <div className='bg-yellow-500 text-amber-200 font-bold w-20 aspect-square rounded-full flex flex-col items-center justify-center'>
              <StarIcon/>
              <p>{rankInfo.star_count}</p>
            </div>
            <div className='bg-blue-50 font-bold w-fit rounded-2xl px-5 py-5 flex items-center justify-center'>
              <MilitaryTechIcon/>
              <p>Position: {rankInfo.position}</p>
            </div>
            <div className='bg-green-500 text-green-200 font-bold w-fit rounded-2xl px-5 py-5 flex items-center justify-center'>
              <MilitaryTechIcon/>
              <p>Total achievements: {rankInfo.total_achievements}</p>
            </div>
          </div>
          <div className='flex flex-col gap-3 mt-4'>
            <label htmlFor="achievement">Achievements: </label>
            {rankInfo.achievements ?
              <select name="" id="achievement" className='border-2 p-5'>
                {rankInfo.achievements.map((item) => (
                  <option value="">{item}</option>
                ))}
              </select>
              : <p>No achievements</p>
            }
          </div>
        </div>
        :
        <p>No achievement</p>
      }
    </div>
  )
}
