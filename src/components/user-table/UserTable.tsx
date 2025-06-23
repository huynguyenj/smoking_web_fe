import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Delete, Visibility } from '@mui/icons-material'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import type { UserDetail, UserPaginationInfo } from '../../model/user/userType'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import { toast } from 'react-toastify'
import type { MemberShipInfo } from '../../model/user/memberShipType'
import UserDetailDialog from '../userInfo-dialog/UserDetailDialog'

export interface UserTableProps {
  users: UserPaginationInfo[];
  totalPage: number
  rowsPerPage: number
  sortOrder: number
  isLoading: boolean
  page: number
  onPageChange: (newPage: number, newRowsPerPage: number) => void // eslint-disable-line no-unused-vars
  fetchUser: (page: number, rowsPerPage: number, sortOrder: number) => void // eslint-disable-line no-unused-vars
}

function UserTable({ isLoading, users, page, totalPage, sortOrder, rowsPerPage, onPageChange, fetchUser }: UserTableProps) {
  const [openConfirm, setOpenConfirm] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserPaginationInfo>()
  const [openDetail, setOpenDetail] = useState(false)
  const [userDetails, setUserDetails] = useState<UserDetail>()
  const [openMemberBox, setOpenMemberBox] = useState<boolean>(false)
  const [memberShipInfo, setMemeberShipInfo] = useState<MemberShipInfo>()

  const getUserDetail = async (id: string) => {
    try {
      const response = await ApiAdminPrivate.getUserDetail({ id })
      setUserDetails(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenDetail = (id: string) => {
    if (id) {
      getUserDetail(id)
      setOpenDetail(true)
    }
  }
  const getMemberShipById = async (id: string) => {
    try {
      const response = await ApiAdminPrivate.getMemberShipById({ id })
      setMemeberShipInfo(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleExpandMember = (id: string) => {
    if (id) {
      getMemberShipById(id)
      setOpenMemberBox(!openMemberBox)
    }
    console.log(id)

  }
  const handleOpenConfirm = (user: UserPaginationInfo) => {
    if (user) {
      setSelectedUser(user)
      setOpenConfirm(true)
    }
  }
  const handleCloseConfirm = () => setOpenConfirm(false)

  const handleChangeUserStatus = async (isActive: boolean) => {
    try {
      if (selectedUser) {
        const id = selectedUser._id
        await ApiAdminPrivate.changeUserStatus({ id, isActive })
        fetchUser(page, rowsPerPage, sortOrder)
        toast.success('Cập nhật trạng thái thành công')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirmChange = async (isActive: boolean) => {
    handleChangeUserStatus(isActive)
    handleCloseConfirm()
  }

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    onPageChange(0, newRowsPerPage)
  }

  return (
    <div className=' mt-6'>
      <div className='flex justify-center ml-10 mt-5'>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid #ddd',
            maxWidth: '100%',
            height: '380px'
          }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>ID</b></TableCell>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>User Name</b></TableCell>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Create date</b></TableCell>
                {/* <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Update date</b></TableCell> */}
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Email</b></TableCell>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Role</b></TableCell>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Active</b></TableCell>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <div className="flex items-center justify-center">
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id} sx={{ '& td': { border: 'none', fontSize: '15px' } }}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.user_name}</TableCell>
                    <TableCell>{dayjs(user.created_date).format('DD-MM-YYYY')}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <div
                        onClick={() => handleOpenConfirm(user)}
                        className={`${user.isActive ? 'bg-green-fig' : 'bg-red-fig'} p-[10px] rounded-[50px] text-white text-center cursor-pointer`}
                      >
                        {user.isActive ? 'Active' : 'Banned'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDetail(user._id)} color="primary">
                        <Visibility />
                      </IconButton>
                      <IconButton color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openConfirm} onClose={handleCloseConfirm}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to change status to {selectedUser?.isActive ? 'banned' : 'active'}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button onClick={() => handleConfirmChange(!selectedUser?.isActive)} color="error">Yes</Button>
          </DialogActions>
        </Dialog>

        <UserDetailDialog
          openDetail={openDetail}
          setOpenDetail={() => setOpenDetail(false)}
          setOpenMemberBox={() => setOpenMemberBox(false)}
          userDetails={userDetails}
          memberShipInfo={memberShipInfo}
          openMemberBox={openMemberBox}
          handleExpandMember={handleExpandMember} />

        {/* <Dialog open={openDetail} onClose={() => setOpenDetail(false)}>
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
              {userDetails?.profile?.address}
            </DialogContentText>
            <DialogContentText>
              <div className='flex'>
                <p className=''>Membership</p> <button className='cursor-pointer' onClick={() => handleExpandMember(userDetails.membership.membership_id)}>
                  <MuiIcon.KeyboardArrowDown className={`transition-transform duration-300 ${openMemberBox ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {openMemberBox && <div>
                <ul>
                  <li>{memberShipInfo?.membership_title}</li></ul></div>
              }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDetail(false)} color="success">Yes</Button>
          </DialogActions>
        </Dialog> */}
      </div>
      <div className='mt-10 mr-10'>
        <TablePagination
          sx={{
            '& .MuiTablePagination-toolbar': {
              fontSize: '20px'
            },
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '20px'
            },
            '& .MuiSelect-select': {
              fontSize: '20px'
            },
            '& .MuiTablePagination-actions button': {
              fontSize: '20px'
            }
          }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsPerPage * totalPage} //total page
          rowsPerPage={rowsPerPage} // limit
          page={page} // page
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}

export default UserTable