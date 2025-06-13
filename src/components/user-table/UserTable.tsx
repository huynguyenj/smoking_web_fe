import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Delete, Visibility } from '@mui/icons-material'
import React, { useState } from 'react'
import dayjs from 'dayjs'

export interface User {
  _id: number;
  user_name: string;
  created_date: string;
  updated_date: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface UserTableProps {
  users: User[];
  totalPage: number
  rowsPerPage: number
  page: number
  onPageChange: (newPage: number, newRowsPerPage: number) => void // eslint-disable-line no-unused-vars
}

function UserTable({ users, page, totalPage, rowsPerPage, onPageChange }: UserTableProps) {
  const [openConfirm, setOpenConfirm] = useState(false)

  const handleOpenConfirm = () => setOpenConfirm(true)
  const handleCloseConfirm = () => setOpenConfirm(false)

  const handleConfirmChange = async (id: string) => {
    handleChangeStatus(id)
    handleCloseConfirm
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
              {users.map((user) => (
                <TableRow key={user._id} sx={{ '& td': { border: 'none', fontSize: '15px' } }}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.user_name}</TableCell>
                  <TableCell>{dayjs(user.created_date).format('DD-MM-YYYY')}</TableCell>
                  {/* <TableCell>{user.updated_date}</TableCell> */}
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div onClick={handleOpenConfirm} className={`${user.isActive ? 'bg-green-fig' : 'bg-red-fig'} p-[10px] rounded-[50px] text-white text-center, cursor-pointer`}>
                      {user.isActive ? 'Active' : 'Banned'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                    <Dialog open={openConfirm} onClose={handleCloseConfirm}>
                      <DialogTitle>Confirm</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Do you want to change status to {!user.isActive ? 'active' : 'banned'}?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseConfirm}>Cancel</Button>
                        <Button onClick={() => handleConfirmChange} color="error">Yes</Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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