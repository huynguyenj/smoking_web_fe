import { useEffect, useState } from 'react'
import UserTable from '../../components/user-table/UserTable'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import type { UserPaginationInfo } from '../../model/user/userType'

export default function UserManagementPage() {
  const [userList, setUserList] = useState<UserPaginationInfo[]>([])
  const [page, setPage] = useState<number>(0) // zero-based index
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [sortOrder, setSortOrder] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchUsers = async (pageNumber: number, limit: number, sort: number) => {
    setIsLoading(true)
    try {
      const response = await ApiAdminPrivate.getUserPagiantion({
        page: pageNumber + 1, // API uses 1-based index
        limit,
        sort
      })
      setUserList(response.data.listData)
      setTotalPage(response.data.pageInfo.totalPage)
    } catch (err) {
      console.error('error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(page, rowsPerPage, sortOrder)
  }, [page, rowsPerPage, sortOrder])

  const handlePageChange = (newPage: number, newRowsPerPage: number) => {
    setPage(newPage)
    setRowsPerPage(newRowsPerPage)
  }
  return (
    <div className=''>
      <FormControl sx={{ minWidth: 100, marginLeft: '85%' }}>
        <InputLabel id="sort-label">Sort by</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOrder}
          label="Sort by"
          onChange={(e) => setSortOrder(Number(e.target.value))}
        >
          <MenuItem value={-1}>Newest</MenuItem>
          <MenuItem value={1}>Oldest</MenuItem>
        </Select>
      </FormControl>

      <UserTable isLoading={isLoading} sortOrder={sortOrder} fetchUser={fetchUsers} users={userList} page={page} rowsPerPage={rowsPerPage} totalPage={totalPage} onPageChange={handlePageChange} />
    </div>

  )
}
