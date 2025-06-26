import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function PaymentPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending')

  useEffect(() => {
    const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
    const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus')

    if (vnp_ResponseCode === '00' && vnp_TransactionStatus === '00') {
      setStatus('success')
    } else {
      setStatus('failed')
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      {status === 'pending' && <p>Đang xác minh thanh toán...</p>}
      {status === 'success' && (
        <div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Thanh toán thành công!</h1>
          <p>Cảm ơn bạn đã nâng cấp Premium. Chúc bạn trải nghiệm vui vẻ.</p>
        </div>
      )}
      {status === 'failed' && (
        <div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">❌ Thanh toán thất bại!</h1>
          <p>Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
        </div>
      )}
    </div>
  )
}
