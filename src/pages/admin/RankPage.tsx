import { useEffect, useState } from 'react'
import RankTable from '../../components/ranking-table/RankTable'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import type { RankPaginationInfo } from '../../model/rank/rankType'

export default function RankPage() {
  const [rankData, setRankData] = useState<RankPaginationInfo[]>([])
  const [page, setPage] = useState<number>(0) // zero-based index
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [sortOrder, setSortOrder] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchRankData = async (pageNumber: number, limit: number, sort: number) => {
    setIsLoading(true)
    try {
      const response = await ApiAdminPrivate.getRankData({
        page: pageNumber + 1,
        limit,
        sort
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
    fetchRankData(page, rowsPerPage, sortOrder)
  }, [page, rowsPerPage, sortOrder])
  const handlePageChange = (newPage: number, newRowsPerPage: number) => {
    setPage(newPage)
    setRowsPerPage(newRowsPerPage)
  }
  return (
    <div>
      <RankTable isLoading={isLoading} onPageChange={handlePageChange} rank={rankData} rowsPerPage={rowsPerPage} totalPage={totalPage} page={page} />
    </div>
  )
}
