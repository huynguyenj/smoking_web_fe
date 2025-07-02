import { useEffect, useState } from 'react'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import type { AnnoucementPaginationInfo } from '../../model/announcement/announcementType'
import AnnouncementTable from '../../components/announcement-table/AnnouncementTable'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import useOpen from '../../hooks/openState/useOpen'
import { toast } from 'react-toastify'

export default function AnnouncementPage() {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [dataList, setDataList] = useState<AnnoucementPaginationInfo[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const { toggle, isOpen, handleClose } = useOpen()

  const getAnnouncement = async (pageNumber: number, limit: number) => {
    setIsLoading(true)
    try {
      const response = await ApiAdminPrivate.getAnnoucementPagination({
        page: pageNumber + 1,
        limit
      })
      setDataList(response.data.listData)
      setTotalPage(response.data.pageInfo.totalPage)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const createAnnouncement = async () => {
    try {
      await ApiAdminPrivate.createAnnouncement({
        title: title,
        content: content
      })
      getAnnouncement(page, rowsPerPage)
      handleClose()
      toast.success('Create Successfully')
      setTitle('')
      setContent('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAnnouncement(page, rowsPerPage)
  }, [page, rowsPerPage])

  const handlePageChange = (newPage: number, newRowsPerPage: number) => {
    setPage(newPage)
    setRowsPerPage(newRowsPerPage)
  }
  return (
    <div>
      <div className='flex justify-end mr-5 mb-10'>
        <Button onClick={toggle} variant='contained'>Create</Button>
      </div>
      <AnnouncementTable
        fetchAnnouncement={getAnnouncement}
        totalPage={totalPage}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        items={dataList} />

      <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create package</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            fullWidth
            margin="normal"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handleClose()
            setContent('')
            setTitle('')
          }}>Cancel</Button>
          <Button variant="contained" onClick={createAnnouncement} >Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
