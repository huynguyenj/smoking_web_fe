import type React from 'react'
import type { RankPaginationInfo } from '../../model/rank/rankType'
import { Box, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { Visibility } from '@mui/icons-material'
import { useState } from 'react'
import type { UserDetail } from '../../model/user/userType'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import UserDetailDialog from '../userInfo-dialog/UserDetailDialog'
import type { MemberShipInfo } from '../../model/user/memberShipType'

export interface RankTableProp {
  rank: RankPaginationInfo[],
  rowsPerPage: number,
  totalPage: number,
  page: number,
  onPageChange: (newPage: number, newRowsPerPage: number) => void, // eslint-disable-line no-unused-vars
  isLoading: boolean
}

function RankTable({ rank, rowsPerPage, totalPage, page, onPageChange, isLoading }: RankTableProp) {
  const [userDetails, setUserDetails] = useState<UserDetail>()
  const [open, setOpen] = useState<boolean>(false)
  const [memberShipInfo, setMemberShipInfo] = useState<MemberShipInfo>()
  const [openMemberBox, setOpenMemberBox] = useState<boolean>(false)

  const getUserDetail = async (id: string) => {
    try {
      const response = await ApiAdminPrivate.getUserByRankId( { id } )
      setUserDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getMemberShipById = async (id: string) => {
    try {
      const response = await ApiAdminPrivate.getMemberShipById({ id })
      setMemberShipInfo(response.data)
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

  const handleOpen = (id: string) => {
    getUserDetail(id)
    setOpen(true)
  }

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    onPageChange(0, newRowsPerPage)
  }
  return (
    <Box sx={{ paddingLeft: 2, marginTop: -1 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        LEADERBOARD
      </Typography>
      <Typography align="center" gutterBottom>
        Rank of users based on achievements
      </Typography>

      <TableContainer component={Paper} elevation={3} sx={{
        borderRadius: 3, mt: 4, maxWidth: '100%',
        height: '380px'
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#000' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>STAR</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ACHIEVEMENTS</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>RANK</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTION</TableCell>
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
              rank.map((item, index) => (
                <TableRow
                  key={item._id}
                  sx={{ backgroundColor: index === 0 ? '#3f51b5' : index === 1 ? '#009688' : '#4caf50', color: 'white' }}
                >
                  <TableCell sx={{ fontSize: 20, color: 'white' }}>{item.star_count}</TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {item.achievements.map((a, i) => (
                      <Typography key={i}>{a}</Typography>
                    ))}
                  </TableCell>
                  <TableCell sx={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                    {(index + 1).toString().padStart(3, '0')}
                  </TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                    <IconButton onClick={() => handleOpen(item._id)} sx={{ backgroundColor: 'black', borderRadius: 2 }} color="primary">
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="flex-end">
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
      </Box>
      <UserDetailDialog
        handleExpandMember={handleExpandMember}
        openDetail={open}
        setOpenDetail={() => setOpen(false)}
        setOpenMemberBox={() => setOpenMemberBox(false)}
        openMemberBox={openMemberBox}
        userDetails={userDetails}
        memberShipInfo={memberShipInfo}
      />
    </Box>
  )
}

export default RankTable