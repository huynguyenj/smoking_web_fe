import { Rating } from '@mui/material'

export interface RatingFbBoxProps {
  name: string;
  ratingStar: number;
  createDate: string;
  feedback: string;
}

function RatingFbBox({ name, ratingStar, createDate, feedback }: RatingFbBoxProps) {
  return (
    <div className="bg-white-fig rounded-[20px] w-[50%] p-5 border-[3px] border-black-fig/40">
      <div className="flex justify-between">
        <p className="font-bold text-[30px]">{name}</p>
        <p><Rating name="read-only" value={ratingStar} readOnly size="large" /></p>
      </div>
      <div>{createDate}</div>
      <br />
      <div>{feedback}</div>
    </div>
  )
}

export default RatingFbBox