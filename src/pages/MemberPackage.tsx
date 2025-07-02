import { useEffect, useState } from 'react'
import MembershipCard from '../components/memberpackage/MembershipCard'
import type { Membership } from '../model/user/membershipType'
import privateApiService from '../services/ApiPrivate'

function MembershipList() {
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await privateApiService.getMemberships()
        const rawData = res.data

        const dataWithHighlight = rawData.map((pkg: Membership) => ({
          ...pkg,
          highlight: pkg.membership_title === 'Standard'
        }))

        setMemberships(dataWithHighlight)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ Lỗi khi tải membership:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMemberships()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Membership Packages</h1>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {memberships.map((pkg) => (
            <MembershipCard
              key={pkg._id}
              id={pkg._id}
              name={pkg.membership_title}
              price={pkg.price === 0 ? '0₫' : `${pkg.price.toLocaleString()}₫ / month`}
              features={pkg.feature}
              highlight={pkg.highlight}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MembershipList
