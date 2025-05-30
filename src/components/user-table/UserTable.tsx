import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { Delete, Visibility } from '@mui/icons-material'
import React, { useState } from 'react'

export interface User {
  id: number;
  name: string;
  createDate: string;
  updateDate: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface UserTableProps {
  users: User[];
}

function UserTable({ users }: UserTableProps) {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className='p-5 mt-6'>
      <div className='flex justify-center ml-10 mt-5'>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid #ddd',
            width: '95%',
            height: '650px'
          }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '22px' }}><b>ID</b></TableCell>
                <TableCell sx={{ fontSize: '22px' }}><b>User Name</b></TableCell>
                <TableCell sx={{ fontSize: '22px' }}><b>Create date</b></TableCell>
                <TableCell sx={{ fontSize: '22px' }}><b>Update date</b></TableCell>
                <TableCell sx={{ fontSize: '22px' }}><b>Email</b></TableCell>
                <TableCell sx={{ fontSize: '22px' }}><b>Role</b></TableCell>
                <TableCell sx={{ fontSize: '22px' }}><b>Active</b></TableCell>
                <TableCell sx={{ fontSize: '22px' }}><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id} sx={{ '& td': { border: 'none', fontWeight: 'bold', fontSize: '19px' } }}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.createDate}</TableCell>
                  <TableCell>{user.updateDate}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className={`${user.isActive ? 'bg-green-fig' : 'bg-red-fig'} p-[10px] rounded-[50px] text-white text-center`}>
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
              fontSize: '20px' // chỉnh toàn bộ dòng
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}

export default UserTable