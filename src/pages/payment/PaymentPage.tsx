import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MembershipCard from '../../components/memberpackage/MembershipCard'
import privateApiService from '../../services/ApiPrivate'
import type { Membership } from '../../model/user/membershipType'
import type { PaymentRequestPayload } from '../../model/user/paymentType'

export default function PaymentPage() {
  const location = useLocation()
  const membershipId = location.state?.membershipId
  const [membership, setMembership] = useState<Membership | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const res = await privateApiService.getMemberships()
        const found = res.data.find((m: Membership) => m._id === membershipId)
        setMembership(found ?? null)
      } catch (err) {
        //eslint-disable-next-line no-console
        console.error('Lỗi lấy membership:', err)
      } finally {
        setLoading(false)
      }
    }

    if (membershipId) {
      fetchMembership()
    } else {
      setLoading(false)
    }
  }, [membershipId])

  // ✅ Gọi API thanh toán
  const handlePayment = async () => {
    try {
      if (!membership) return

      const data: PaymentRequestPayload = {
        price: membership.price,
        membershipTitle: membership.membership_title
      }

      const res = await privateApiService.getPaymentUrl(data)
      const paymentUrl = res.data.paymentURL

      // ✅ Chuyển hướng sang VNPay
      window.location.href = paymentUrl
    } catch (err) {
      alert('Không thể tạo link thanh toán')
      // eslint-disable-next-line no-console
      console.error('Lỗi tạo link thanh toán:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Xác nhận gói bạn đã chọn</h1>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : membership ? (
        <div className="max-w-xl mx-auto">
          <MembershipCard
            id={membership._id}
            name={membership.membership_title}
            price={
              membership.price === 0
                ? '0₫'
                : `${membership.price.toLocaleString()}₫ / month`
            }
            features={membership.feature}
            highlight={true}
            buttonLabel="Thanh toán"
            onSelect={handlePayment}
          />
        </div>
      ) : (
        <p className="text-center text-red-500">Không tìm thấy gói phù hợp.</p>
      )}
    </div>
  )
}
