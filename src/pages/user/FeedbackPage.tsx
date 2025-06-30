import { Rating } from '@mui/material'
import { useState, type ChangeEvent } from 'react'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../../components/loading/LoadingScreenBg'

export default function FeedbackPage() {
  const [ratingValue, setRatingValue] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value)
  }
  const handleSendFeedback = async () => {
    try {
      setIsLoading(true)
      await privateApiService.feedback({ content: feedback, star: ratingValue })
      toast.success('Feedback successfully!')
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false
      )
    }
  }
  if (isLoading) return <LoadingScreenBg/>
  return (
    <div className="w-180 h-120 p-5 shadow-[0px_0px_15px_rgba(0,0,0,0.4)] mx-auto rounded-2xl my-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Feedback</h1>
      <p className="text-center">Please give me your opinions to helps us learn and improve about service more</p>
      <div className='bg-[#f2f2f2] p-5 h-50 flex flex-col rounded-2xl shadow-[0px_5px_5px_rgba(0,0,0,0.4)] mt-5'>
        <label htmlFor="feedback" className='text-center font-bold text-[1.2rem]'>Your opinion</label>
        <input id='feedback' value={feedback} onChange={handleChange} className='text-2xl rounded-2xl focus:border-none focus: outline-none p-2'/>
      </div>
      <div className='mt-5 mx-auto flex items-center gap-3'>
        <p className='text-2xl'>Rating</p>
        <Rating name="rating" value={ratingValue} onChange={(_, value) => setRatingValue(value || 0)}/>
      </div>
      <button className='bg-blue-400 px-10 py-2 rounded-2xl w-full hover:bg-blue-500 active:bg-blue-700 cursor-pointer mt-5' onClick={handleSendFeedback}>Send</button>
    </div>
  )
}
