import { useEffect, useState } from 'react'
import RankTable from '../../components/ranking-table/RankTable'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import type { RankPaginationInfo } from '../../model/rank/rankType'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

export default function RankPage() {
  const [rankData, setRankData] = useState<RankPaginationInfo[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [sortOrder] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sortName, setSortName] = useState<string>('star_count')

  const fetchRankData = async (pageNumber: number, limit: number, sort: number, sortName: string) => {
    setIsLoading(true)
    try {
      const response = await ApiAdminPrivate.getRankData({
        page: pageNumber + 1,
        limit,
        sort,
        sortName
      })
      setRankData(response.data.listData)
      setTotalPage(response.data.pageInfo.totalPage)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRankData(page, rowsPerPage, sortOrder, sortName)
  }, [page, rowsPerPage, sortOrder, sortName])
  const handlePageChange = (newPage: number, newRowsPerPage: number) => {
    setPage(newPage)
    setRowsPerPage(newRowsPerPage)
  }
  return (
    <div>
      <div className='flex mt-[-1px] justify-end'>
        <div>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            LEADERBOARD
          </Typography>
          <Typography align="center" gutterBottom>
            Rank of users based on achievements
          </Typography>
        </div>
        <FormControl sx={{ marginLeft: 30, marginRight: 10, minWidth: 100 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            value={sortName}
            label="Sort by"
            onChange={(e) => setSortName(String(e.target.value))}
          >
            <MenuItem value={'star_count'}>Star</MenuItem>
            <MenuItem value={'total_achievements'}>Achievement</MenuItem>
            <MenuItem value={'position'}>Rank</MenuItem>
          </Select>
        </FormControl>

      </div>
      <RankTable isLoading={isLoading} onPageChange={handlePageChange} rank={rankData} rowsPerPage={rowsPerPage} totalPage={totalPage} page={page} />
    </div>
  )
}
