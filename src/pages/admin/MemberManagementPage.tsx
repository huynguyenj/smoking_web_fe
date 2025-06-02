import MemberShipBox from '../../components/memberShip-box/MemberShipBox'

export default function MemberManagementPage() {
  const memberShips = [
    { id: 1, memberShipTitle: 'Normal', profit: 9999 },
    { id: 2, memberShipTitle: 'Vip', profit: 9900 },
    { id: 3, memberShipTitle: 'Premium', profit: 199000 }
  ]
  return (
    <div className='flex justify-around p-5 flex-wrap'>
      {memberShips.map((m) => (
        <div key={m.id}>
          <MemberShipBox
            backgroundColor={
              m.memberShipTitle === 'Premium' ? 'bg-yellow-memberPackage' :
                m.memberShipTitle === 'Vip' ? 'bg-red-fig' :
                  'bg-blue-fig' // mặc định cho Normal hoặc các giá trị khác
            }
            memberShipTitle={m.memberShipTitle}
            profit={m.profit}
          />
        </div>
      ))}
    </div>

  )
}
