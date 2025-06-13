import { Delete } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Rating } from '@mui/material'
import { useState } from 'react'

export interface RatingFbBoxProps {
  _id: string;
  user_name: string;
  star: number;
  create_feedback_date: string;
  feedback: string;
  handleDelete: (_id: string) => void; // eslint-disable-line no-unused-vars
}

function RatingFbBox({ _id, user_name, star, create_feedback_date, feedback, handleDelete }: RatingFbBoxProps) {
  const [openConfirm, setOpenConfirm] = useState(false)

  const handleOpenConfirm = () => setOpenConfirm(true)
  const handleCloseConfirm = () => setOpenConfirm(false)

  const handleConfirmDelete = async (id: string) => {
    handleDelete(id)// gọi hàm xóa thật
    handleCloseConfirm()
  }
  return (
    <div className="bg-white-fig rounded-[20px] w-[50%] p-5 border-[0px] hover:shadow-xl transition-shadow duration-300 ease-in-out border-black-fig/40">
      <div className='text-end text-green'>
        <IconButton color="error" onClick={handleOpenConfirm}>
          <Delete />
        </IconButton>
      </div>
      <div className="flex justify-between">
        <p className="font-bold text-[30px]">{user_name}</p>
        <p><Rating name="read-only" value={star} readOnly size="large" /></p>
      </div>
      <div>{create_feedback_date}</div>
      <br />
      <div>{feedback}</div>

      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa phản hồi của <strong>{user_name}</strong> không? Thao tác này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Hủy</Button>
          <Button onClick={() => handleConfirmDelete(_id)} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default RatingFbBox