
interface MembershipCardProps {
  name: string
  price: string
  features: string[]
  highlight?: boolean
}

function MembershipCard({ name, price, features, highlight }: MembershipCardProps) {
  return (
    <div
      className={`flex flex-col justify-between h-full min-h-[460px] w-full max-w-md mx-auto rounded-2xl shadow-xl p-8 bg-white transition-transform hover:scale-105 ${
        highlight ? 'border-4 border-blue-500' : 'border border-gray-200'
      }`}
    >
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{name}</h2>
        <p className="text-center text-3xl font-extrabold text-blue-600 mb-8">{price}</p>
        <ul className="space-y-3 px-4 text-lg mb-6">
          {features.map((feature, i) => (
            <li key={i} className="text-gray-700">
              ✅ {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center mt-6">
        <button
          className={`px-8 py-3 rounded-xl text-lg font-bold text-white transition-colors ${
            highlight ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          Choose Plan
        </button>
      </div>
    </div>
  )
}

export default MembershipCard
