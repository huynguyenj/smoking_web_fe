import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import type { UserDetail } from '../../model/user/userType'
import dayjs from 'dayjs'
import { KeyboardArrowDown } from '@mui/icons-material'
import type { MemberShipInfo } from '../../model/user/memberShipType'

export interface UserDetailDialogProps {
    openDetail: boolean,
    setOpenDetail: (open: boolean) => void,
    memberShipInfo: MemberShipInfo | undefined
    openMemberBox: boolean,
    handleExpandMember: (id: string) => void,
    userDetails: UserDetail,
    setOpenMemberBox: (open: boolean) => void
}
function UserDetailDialog({ openDetail, setOpenDetail, userDetails, memberShipInfo, openMemberBox, handleExpandMember, setOpenMemberBox }: UserDetailDialogProps) {
  return (
    <Dialog open={openDetail} onClose={() => setOpenDetail(false)}>
      <DialogTitle sx={{ textAlign: 'center' }}>User Detail</DialogTitle>
      <DialogContent sx={{ width: 600 }}>
        <DialogContentText>
          <b>Full Name: </b>
          {userDetails.full_name}
        </DialogContentText>
        <DialogContentText>
          <b>User Name: </b>
          {userDetails.user_name}
        </DialogContentText>
        <DialogContentText>
          <b>Email: </b>
          {userDetails.email}
        </DialogContentText>
        <DialogContentText>
          <b>Create Date: </b>
          {dayjs(userDetails.created_date).format('DD-MM-YYYY')}
        </DialogContentText>
        <DialogContentText>
          <b>Address: </b>
          {userDetails?.profile?.address || 'N/A'}
        </DialogContentText>
        <DialogContentText>
          <div className='flex items-center gap-2'>
            <span>Membership</span>
            <button
              className='cursor-pointer'
              onClick={() => handleExpandMember(userDetails.membership.membership_id)}
            >
              <KeyboardArrowDown
                className={`transition-transform duration-300 ${openMemberBox ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
          {openMemberBox && (
            <div>
              <ul>
                <li>{memberShipInfo?.membership_title || 'No Membership Info'}</li>
              </ul>
            </div>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setOpenDetail(false)
          setOpenMemberBox(false)
        }} color="success">
                    Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UserDetailDialog