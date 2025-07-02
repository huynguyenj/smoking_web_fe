import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import type { AnnoucementPaginationInfo } from '../../model/announcement/announcementType'
import { Delete, Edit } from '@mui/icons-material'
import React, { useState } from 'react'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import { toast } from 'react-toastify'
import useOpen from '../../hooks/openState/useOpen'

export interface AnnouncementTableProp {
  items: AnnoucementPaginationInfo[],
  page: number,
  totalPage: number,
  rowsPerPage: number,
  isLoading: boolean,
  onPageChange: (newPage: number, newRowsPerPage: number) => void // eslint-disable-line no-unused-vars
  fetchAnnouncement: (page: number, rowsPerPage: number) => void // eslint-disable-line no-unused-vars
}
function AnnouncementTable({ items, page, totalPage, rowsPerPage, isLoading, onPageChange, fetchAnnouncement }: AnnouncementTableProp) {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [selectedItem, setSeletedItem] = useState<AnnoucementPaginationInfo | undefined>()
  const { handleClose, handleOpen, isOpen } = useOpen()
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    onPageChange(0, newRowsPerPage)
  }

  const handleOpenConfirm = (item: AnnoucementPaginationInfo) => {
    setSeletedItem(item)
    setOpenConfirm(true)
  }

  const handleOpenEdit = (item: AnnoucementPaginationInfo) => {
    setSeletedItem(item)
    handleOpen()
  }

  const handleUpdate = async () => {
    try {
      await ApiAdminPrivate.updateAnnouncement({
        id: selectedItem?._id,
        title,
        content
      })
      fetchAnnouncement(page, rowsPerPage)
      handleClose()
      toast.success('Update successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAnnouncement = async (id: string | undefined) => {
    try {
      await ApiAdminPrivate.deleteAnnouncement({ id })
      fetchAnnouncement(page, rowsPerPage)
      toast.success('Delete successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = (id: string | undefined) => {
    deleteAnnouncement(id)
    setOpenConfirm(false)
  }
  return (
    <div className=' mt-6'>
      <div className='flex justify-center ml-10 mt-5'>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: 'none',
            borderBottom: '1px solid #ddd',
            width: '90%',
            height: '380px'
          }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 10, fontSize: '15px', textAlign: 'center' }}><b>Id</b></TableCell>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Title</b></TableCell>
                <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}><b>Content</b></TableCell>
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
                items.map((item) => (
                  <TableRow key={item._id} sx={{ '& td': { border: 'none', fontSize: '15px' } }}>
                    <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}>{item._id}</TableCell>
                    <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}>{item.title}</TableCell>
                    <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}>{item.content}</TableCell>
                    <TableCell sx={{ fontSize: '15px', textAlign: 'center' }}>
                      <IconButton onClick={() => {
                        handleOpenEdit(item)
                        setContent(item.content)
                        setTitle(item.title)
                      }} color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleOpenConfirm(item)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle>Delete confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Do you want to delete <b>{selectedItem?.title}</b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setOpenConfirm(false)
              setSeletedItem(undefined)
            }}>Cancel</Button>
            <Button onClick={() => handleDelete(selectedItem?._id)} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        {/* form update */}
        <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Create package</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              type='text'
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type='text'
              label="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdate} >Send</Button>
          </DialogActions>
        </Dialog>

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

export default AnnouncementTable