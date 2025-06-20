import React, { useState } from 'react'
import { MuiIcon } from '../muiIcon/MuiIcon'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import { DeleteForever, Edit } from '@mui/icons-material'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import { toast } from 'react-toastify'

export interface MemberShipBoxProps {
  _id: string;
  memberShipTitle: string;
  profit: number;
  backgroundColor: string;
  feature: string[];
  getMemberPackage: () => void
}

function MemberShipBox({ _id, memberShipTitle, profit, backgroundColor, feature, getMemberPackage }: MemberShipBoxProps) {
  const [showMore, setShowMore] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [editTitle, setEditTitle] = useState(memberShipTitle)
  const [editPrice, setEditPrice] = useState(profit)
  const [editFeatureInput, setEditFeatureInput] = useState(feature.join(', '))
  const [isLoading, setIsloading] = useState<boolean>(false)

  const handleDelete = async (id: string) => {
    setIsloading(true)
    try {
      await ApiAdminPrivate.deleteMemberPackage({ id })
      getMemberPackage()
      toast.success('Delete successfully!')
    } catch (error) {
      toast.error('Fail to delete!')
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  const handleUpdate = async () => {
    setIsloading(true)
    const featuresArray = editFeatureInput
      .split(',')
      .map(f => f.trim())
      .filter(f => f !== '')

    try {
      await ApiAdminPrivate.updateMemberPackage({
        id: _id,
        membership_title: editTitle,
        price: editPrice,
        feature: featuresArray
      })
      toast.success('Update successfully!')
      getMemberPackage()
    } catch (error) {
      toast.error('Fail to update!')
      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <div className={`${backgroundColor} hover:shadow-xl transition-shadow duration-300 ease-in-out w-[20rem] rounded-[5px] pt-5 border-black-fig/50`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <CircularProgress />
        </div>
      )}
      <div className='flex justify-end mt-[-1.5rem] bg-white/60'>
        <IconButton color="primary">
          <Edit onClick={() => {
            setEditTitle(memberShipTitle)
            setEditPrice(profit)
            setEditFeatureInput(feature.join(', '))
            setOpenEditDialog(true)
          }} />
        </IconButton>
        <div className='w-[3px] bg-white-fig mt-[0.6rem] mb-[0.6rem]'></div>
        <IconButton onClick={() => setOpenDialog(true)} color="error">
          <DeleteForever />
        </IconButton>
      </div>
      <h1 className='ml-5 font-bold text-[1.8rem] text-white-fig'> {memberShipTitle}</h1>
      <h2 className='ml-5 font-bold text-[1.5rem] text-white-fig'>Price: {profit.toLocaleString()} Vnd</h2>
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
            <ul>
              {feature.map((f) =>
                <li>- {f}</li>
              )}
            </ul>

          </div>
        )}

      </div>
      {/* Form xóa */}
      <Dialog open={openDialog} >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete member package {memberShipTitle}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={() => {
            handleDelete(_id)
            setOpenDialog(false)
          }} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>

      {/* Form update */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Chỉnh sửa gói thành viên</DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 mt-2">
            <input
              className="border px-3 py-2 rounded"
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Membership Title"
            />
            <input
              className="border px-3 py-2 rounded"
              type="number"
              value={editPrice}
              onChange={e => setEditPrice(Number(e.target.value))}
              placeholder="Price"
            />
            <textarea
              className="border px-3 py-2 rounded"
              rows={3}
              value={editFeatureInput}
              onChange={e => setEditFeatureInput(e.target.value)}
              placeholder="Features (comma separated)"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
          <Button variant="contained" onClick={() => {
            handleUpdate()
            setOpenEditDialog(false)
          }}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </div >
  )
}

export default MemberShipBox