import React from 'react'
import { MuiIcon } from '../muiIcon/MuiIcon'

export interface MemberShipBoxProps {
  memberShipTitle: string;
  profit: number;
  backgroundColor: string;
}

function MemberShipBox({ memberShipTitle, profit, backgroundColor }: MemberShipBoxProps) {
  const [showMore, setShowMore] = React.useState<boolean>(false)

  return (
    <div className={`${backgroundColor} w-[500px] rounded-[5px] pt-5 border-[1px] border-black-fig/50`}>
      <h1 className='ml-5 font-bold text-[40px] text-white-fig'>Profit: {profit.toLocaleString()} Vnd</h1>
      <br />
      <h2 className='ml-5 font-bold text-[30px] text-white-fig'>{memberShipTitle}</h2>
      <br />
      <div className={`${backgroundColor}/50 w-full p-2 cursor-pointer`}>
        <p className="block text-center gap-1 text-white-fig" onClick={() => setShowMore(!showMore)}>
          More info
          <MuiIcon.KeyboardArrowDown
            className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}
          />
        </p>
        {showMore && (
          <div className="mt-2 bg-white text-black p-3 rounded-[5px] border-[1px] border-black-fig/50">
            <p>- Detailed profit analysis</p>
            <p>- Membership benefits</p>
            <p>- Monthly trends</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default MemberShipBox