import { useNavigate } from 'react-router-dom'
import { PublicRoute } from '../../const/pathList'

interface MembershipCardProps {
  id: string
  name: string
  price: string
  features: string[]
  highlight?: boolean
  buttonLabel?: string
  onSelect?: () => void
}

const MembershipCard = ({
  id,
  name,
  price,
  features,
  highlight,
  buttonLabel = 'Chose this plan',
  onSelect
}: MembershipCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onSelect) {
      onSelect()
    } else {
      navigate(PublicRoute.PAYMENT_PATH, {
        state: { membershipId: id }
      })
    }
  }

  return (
    <div className={`rounded-xl shadow-md p-6 bg-white border ${highlight ? 'border-blue-600' : ''}`}>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-700 mb-4">{price}</p>
      <ul className="mb-4 list-disc list-inside">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      {name.toLocaleLowerCase() === 'free' ? <></> :
        <button
          onClick={handleClick}
          className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {buttonLabel}
        </button>
      }
    </div>
  )
}

export default MembershipCard
