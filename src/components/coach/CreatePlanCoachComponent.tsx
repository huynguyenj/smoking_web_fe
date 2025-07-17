import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState, type FormEvent } from 'react'
import { getToday } from '../../utils/formDate'
import privateApiService from '../../services/ApiPrivate'
import type { CreatePlanPayload, HealthStatus } from '../../model/user/planType'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../loading/LoadingScreenBg'
import type { InitialState } from '../../model/initialType/initialType'
type Props = {
  userId?: string,
  toggle: () => void
}
export default function CreatePlanCoachComponent({ userId, toggle }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialState, setInitialState] = useState<InitialState[]>([])
  useEffect(() => {
    const getListInitialState = async () => {
      try {
        if (userId) {
          const response = await privateApiService.getAllInitialStateForCoach(userId)
          setInitialState(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getListInitialState()
  }, [])
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const startDateRaw = form.get('start-date')
    const content = form.get('content')
    const health_status = form.get('health-status')
    const initialCigaretteId = form.get('initial_cigarette_id')
    const correctStartDateForm = new Date(startDateRaw as string).getTime()
    const data: CreatePlanPayload = {
      user_id: userId as string,
      health_status: health_status as HealthStatus,
      content: content as string,
      start_date: correctStartDateForm as number,
      initial_cigarette_id: initialCigaretteId as string
    }
    try {
      setIsLoading(true)
      await privateApiService.createPlan(data)
      toast.success('Create successfully!')
      toggle()
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }
  if (isLoading) return <LoadingScreenBg/>
  return (
    <div className="relative w-200 py-10 rounded-2xl bg-white-fig z-50">
      <button onClick={toggle} className='absolute top-5 right-5 hover:text-red-500 cursor-pointer'><CloseIcon/>{''}</button>
      <h1 className='text-center text-[1.3rem] mt-10'>Create plan for user</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 px-5 mt-5'>
          <label htmlFor="content">🎨Plan content</label>
          <input id='content' name='content' placeholder='Enter plan content here...' type="text" className='border-2 w-full px-5 py-2 rounded-2xl mx-auto focus:border-green-500' />
        </div>
        <div className='flex flex-col gap-2 px-5 mt-5'>
          <label htmlFor="health-status">❤️‍🩹Health status</label>
          <select name="health-status" id="health-status" className='border-2 w-full px-5 py-2 rounded-2xl mx-auto focus:border-green-500'>
            <option value="good">Good</option>
            <option value="average">Normal</option>
            <option value="bad">Bad</option>
          </select>
        </div>
        <div className='flex flex-col gap-2 px-5 mt-5'>
          <label htmlFor="process-status">🔗Process</label>
          <select name="process-status" id="process-status" className='border-2 w-full px-5 py-2 rounded-2xl mx-auto focus:border-green-500'>
            <option value="start">Start</option>
            <option value="process">Process</option>
            <option value="finish">Complete</option>
            <option value="cancel">Cancel</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 px-5 mt-5">
          <label htmlFor='cigarette-status'>💌Cigarette state:</label>
          {initialState.length > 0 ?
            <select
              id='cigarette-status'
              // value={plan.initial_cigarette_id}
              name='initial_cigarette_id'
              className="border-2 w-full px-5 py-2 rounded-2xl mx-auto focus:border-green-500"
            >
              {initialState.map((item) => (
                <option value={item._id}>Initial nicotine: {item.nicotine_evaluation}</option>
              ))}
            </select>
            :
            <p>User have not created initial state yet.</p>
          }
        </div>
        <div className='flex flex-col gap-2 px-5 mt-5'>
          <label htmlFor="start-date">🗓️Start date</label>
          <input id='start-date' name='start-date' min={getToday()} defaultValue={getToday()} type="date" className='border-2 w-full px-5 py-2 rounded-2xl mx-auto' />
        </div>
        <div className='w-full flex items-center justify-end px-5 mt-5'>
          <button className='bg-blue-400 w-[20%] rounded-2xl py-2 text-white-fig cursor-pointer hover:opacity-80 active:opacity-90' type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}
