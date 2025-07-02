import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UserRoute } from '../../const/pathList'

export default function PaymentPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<string | null>('')
  const navigate = useNavigate()
  useEffect(() => {
    if (searchParams.get('status')) {
      setStatus(searchParams.get('status'))
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {status === 'success' && (
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Payment successfully!</h1>
          <p>Thank you for your payment. Have a good experience</p>
        </div>
      )}
      {status === 'failed' && (
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">❌ Payment fail!</h1>
          <p>Please try again.</p>
        </div>
      )}
      <button className='p-4 bg-blue-400 rounded-2xl text-white font-bold mt-5 cursor-pointer hover:opacity-70' onClick={() => navigate(UserRoute.HOME_PATH)}>Back home</button>
    </div>
  )
}
