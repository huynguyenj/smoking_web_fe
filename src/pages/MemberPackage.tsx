import React from 'react'
import MembershipCard from '../components/memberpackage/MembershipCard'

interface MembershipPackage {
  name: string
  price: string
  features: string[]
  highlight?: boolean
}

const membershipPackages: MembershipPackage[] = [
  {
    name: 'Free',
    price: '0₫',
    features: ['Access blogs', 'Basic support', 'Limited tools'],
    highlight: false
  },
  {
    name: 'Standard',
    price: '99.000₫ / month',
    features: ['Everything in Free', 'Access to coach', 'Track progress', 'Email reminders'],
    highlight: true
  },
  {
    name: 'Premium',
    price: '199.000₫ / month',
    features: ['Everything in Standard', '1-on-1 coaching', 'Health reports', 'Priority support'],
    highlight: false
  }
]

function MembershipList() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10">Membership Packages</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {membershipPackages.map((pkg, index) => (
          <MembershipCard
            key={index}
            name={pkg.name}
            price={pkg.price}
            features={pkg.features}
            highlight={pkg.highlight}
          />
        ))}
      </div>
    </div>
  )
}

export default MembershipList
