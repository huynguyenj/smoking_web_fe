import { useEffect, useState } from 'react'
import RankTable from '../../components/ranking-table/RankTable'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import type { RankPaginationInfo } from '../../model/rank/rankType'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { toast } from 'react-toastify'

export default function RankPage() {
  const [rankData, setRankData] = useState<RankPaginationInfo[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [sortOrder, setSortOrder] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sortName, setSortName] = useState<string>('star_count')
  const [arrange, setArrange] = useState<string>('star_count')

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

  const configRank = async () => {
    setIsLoading(true)
    try {
      await ApiAdminPrivate.arrangeRank({ option_sort: arrange })
      await fetchRankData(page, rowsPerPage, sortOrder, sortName)
      toast.success('Arrange success')
    } catch (error) {
      toast.error(error as string)
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
    <div className="p-6">
      <div className="flex flex-col lg:flex-row justify-between items-center mt-[-50px] gap-4">
        <div className="text-end">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            LEADERBOARD
          </Typography>
          <Typography gutterBottom>
            Rank of users based on achievements
          </Typography>
        </div>

        <div className="flex flex-wrap gap-4 items-center justify-center">
          <FormControl className="min-w-[120px]">
            <InputLabel id="sort-label">Sort name</InputLabel>
            <Select
              labelId="sort-label"
              value={sortName}
              label="Sort name"
              onChange={(e) => setSortName(String(e.target.value))}
            >
              <MenuItem value={'star_count'}>Star</MenuItem>
              <MenuItem value={'total_achievements'}>Achievement</MenuItem>
              <MenuItem value={'position'}>Rank</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="min-w-[120px]">
            <InputLabel id="sort-order-label">Sort by</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              label="Sort by"
              onChange={(e) => setSortOrder(Number(e.target.value))}
            >
              <MenuItem value={1}>Increase</MenuItem>
              <MenuItem value={-1}>Decrease</MenuItem>
            </Select>
          </FormControl>

          <div className="flex items-center gap-2">
            <FormControl className="min-w-[120px]">
              <InputLabel id="arrange-label">Config rank</InputLabel>
              <Select
                labelId="arrange-label"
                value={arrange}
                label="Config rank"
                onChange={(e) => setArrange(String(e.target.value))}
              >
                <MenuItem value={'star_count'}>Star</MenuItem>
                <MenuItem value={'total_achievements'}>Achievements</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={configRank}>Change</Button>
          </div>
        </div>
      </div>

      <RankTable
        isLoading={isLoading}
        onPageChange={handlePageChange}
        rank={rankData}
        rowsPerPage={rowsPerPage}
        totalPage={totalPage}
        page={page}
      />
    </div>
  )
}
