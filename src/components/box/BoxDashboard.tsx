import type { SvgIconProps } from '@mui/material'
import type React from 'react'

interface SquareBox {
  icon: React.ElementType<SvgIconProps>;
  title: string;
  data: string;
}


function BoxDashboard({ icon: Icon, title, data }: SquareBox) {
  return (
    <div className="bg-white-fig w-[30%] rounded-[20px] pr-[20px] pt-[5px] pb-[5px] shadow-[10px_4px_0px_black] border-[1px] border-black-fig">
      <div className="flex justify-start gap-2 p-5">
        <Icon />
        <h2 className='font-bold'>{title}</h2>
      </div>
      <p className='pt-[1px] pl-5 text-[35px] font-bold'>{data}</p>
    </div>
  )
}

export default BoxDashboard