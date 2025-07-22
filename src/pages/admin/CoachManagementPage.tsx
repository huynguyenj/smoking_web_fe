import React, { useEffect, useState } from 'react'
import type { CoachPagination } from '../../model/coach/coachType'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { Visibility } from '@mui/icons-material'
import type { Salary } from '../../model/salary/salaryType'
import { toast } from 'react-toastify'

export default function CoachManagementPage() {
  const [coachs, setCoachs] = useState<CoachPagination[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [sort] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [salaryDetail, setSalaryDetail] = useState<Salary>({})
  const [openDetail, setOpenDetail] = useState(false)
  const [salary, setSalary] = useState<number>(0)
  const [payPeriod, setPayPeriod] = useState<string>('')
  const [qrCode, setQrCode] = useState<string>()
  const [newQrCode, setNewQrCode] = useState<File | null>(null)
  const [newQrCodePreview, setNewQrCodePreview] = useState<string | null>(null)
  const [oldQrCodeFile, setOldQrCodeFile] = useState<File | null>(null)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [selectedSalaryId, setSelectedSalaryId] = useState<string>('')
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [coachId, setCoachId] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [full_name, setFull_name] = useState<string>('')
  const [user_name, setUser_name] = useState<string>('')
  const [role] = useState('coach')
  const [openCreateCoach, setOpenCreateCoach] = useState<boolean>(false)

  const fetchCoach = async (pageNum: number, limit: number, sort: number) => {
    setLoading(true)
    try {
      const response = await ApiAdminPrivate.getCoachList({
        page: pageNum + 1,
        limit,
        sort
      })
      setCoachs(response.data.listData)
      setTotalPage(response.data.pageInfo.totalPage)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSalaryDetail = async (id: string) => {
    try {
      const response = await ApiAdminPrivate.getSalaryDetail({ id })
      const data = response.data

      setIsEdit(true)

      setSalaryDetail(data)
      setSalary(data.salary)
      setPayPeriod(data.pay_period)
      setQrCode(data.qr_code_image)

      // Fetch file từ URL ảnh cũ
      const res = await fetch(data.qr_code_image)
      const blob = await res.blob()
      const file = new File([blob], 'old_qr.png', { type: blob.type })
      setOldQrCodeFile(file)

      setOpenDetail(true)
    } catch (error) {
      toast.error(error as string)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('salary', String(salary))
      formData.append('pay_period', payPeriod)
      if (newQrCode) {
        formData.append('qr_code_image', newQrCode)
      } else if (oldQrCodeFile !== null) {
        formData.append('qr_code_image', oldQrCodeFile)
      }

      await ApiAdminPrivate.updateSalary({
        id: salaryDetail._id,
        data: formData
      })
      handleClose()
      toast.success('Updated successfully')
      setOpenDetail(false)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('salary', String(salary))
      formData.append('pay_period', payPeriod)
      if (newQrCode) {
        formData.append('qr_code_image', newQrCode)
      }

      await ApiAdminPrivate.createSalary({
        id: coachId,
        data: formData
      })
      handleClose()
      toast.success('Create successfully')
      setOpenDetail(false)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSalary = async (id: string) => {
    try {
      await ApiAdminPrivate.deleteSalary({ id })
      setOpenDelete(false)
      toast.success('Delete success')
    } catch (error) {
      toast.error(error as string)
    }
  }

  const handleCreateCoach = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      await ApiAdminPrivate.createCoachAcc({ email, user_name, full_name, password, role })

      setEmail('')
      setUser_name('')
      setFull_name('')
      setPassword('')

      setOpenCreateCoach(false)
      fetchCoach(page, rowsPerPage, sort)
      toast.success('Create successfully')
    } catch (error) {
      toast.error(error as string)
    }
  }


  useEffect(() => {
    fetchCoach(page, rowsPerPage, sort)
  }, [page, rowsPerPage, sort])

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClose = () => {
    setOpenDetail(false)
    setNewQrCode(null)
    setNewQrCodePreview(null)
    setOldQrCodeFile(null)
    setIsEdit(false)
    setQrCode('')
    setSalary(0)
    setPayPeriod('')
  }

  return (
    <div>
      <div className='flex justify-end mb-5 mr-2'>
        <Button onClick={() => setOpenCreateCoach(true)} type="button" variant="contained" color="primary">
          Create account for coach
        </Button>
      </div>

      {/* Coach table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>View salary</TableCell>
                <TableCell>Create salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <div className="flex items-center justify-center">
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                coachs.map((coach) => (
                  <TableRow key={coach._id}>
                    <TableCell>
                      <Avatar src={coach.image_url} alt={coach.full_name} />
                    </TableCell>
                    <TableCell>{coach.full_name}</TableCell>
                    <TableCell>{coach.user_name}</TableCell>
                    <TableCell>{coach.profile?.experience}</TableCell>
                    <TableCell>{coach.role}</TableCell>
                    <TableCell>{coach.profile?.age}</TableCell>
                    <TableCell>{coach.profile?.address}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => fetchSalaryDetail(coach._id)} color="primary">
                        <Visibility />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => {
                        setOpenDetail(true)
                        setCoachId(coach._id)
                      }} type="button" variant="contained" color="primary">
                        Create
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}

            </TableBody>
          </Table>
        </TableContainer>

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
          count={rowsPerPage * totalPage}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Salary detail */}
      <Dialog open={openDetail} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>{isEdit ? 'Salary detail' : 'Create'}</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <Box onSubmit={isEdit ? handleUpdate : handleCreate} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* {isEdit ? (<DialogContentText><b>User id: </b>
              {salaryDetail?.user_id}
            </DialogContentText>) : null} */}
            <TextField
              label="Salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              required
            />
            <TextField
              label="Pay period (months)"
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
              required
            />

            <Box>
              <b>Current QR code:</b><br />
              {qrCode && (
                <img
                  src={qrCode}
                  alt="Current QR"
                  style={{ width: 120, marginTop: 8, cursor: 'pointer' }}
                  onClick={() => setPreviewImage(qrCode)}
                />
              )}
            </Box>

            {newQrCodePreview && (
              <Box>
                <b>New QR code preview:</b><br />
                <img
                  src={newQrCodePreview}
                  alt="New QR"
                  style={{ width: 120, marginTop: 8, cursor: 'pointer' }}
                  onClick={() => setPreviewImage(newQrCodePreview)}
                />
              </Box>
            )}

            <Dialog open={Boolean(previewImage)} onClose={() => setPreviewImage(null)}>
              <img src={previewImage || ''} alt="Preview" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
            </Dialog>


            <Button component="label">
              Choose new QR code
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null
                  setNewQrCode(file)
                  if (file) {
                    const url = URL.createObjectURL(file)
                    setNewQrCodePreview(url)
                  } else {
                    setNewQrCodePreview(null)
                  }
                }}
              />
            </Button>

            {isEdit ? (<DialogContentText><b>Delete: </b>
              {salaryDetail?.isDeleted ? 'Yes' : 'No'}
            </DialogContentText>) : null}


            <div className='flex justify-end gap-5'>
              {loading ? <CircularProgress size="30px" /> : (
                <Button type="submit" variant="contained" color="primary">
                  {isEdit ? 'Update' : 'Create'}
                </Button>
              )}

              <Button onClick={handleClose} variant="outlined" color="warning">
                Close
              </Button>

              {isEdit ? (
                <Button onClick={() => {
                  setSelectedSalaryId(salaryDetail._id)
                  setOpenDelete(true)
                }} type="button" variant="contained" color="warning">
                  Delete
                </Button>
              ) : null}


            </div>
          </Box>

        </DialogContent>
      </Dialog>

      {/* Form xóa */}
      <Dialog open={openDelete} >
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={() => {
            handleDeleteSalary(selectedSalaryId)
            setOpenDelete(false)
          }} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Form tạo coach */}
      <Dialog open={openCreateCoach} onClose={() => setOpenCreateCoach(false)}>
        <Box
          component="form"
          onSubmit={handleCreateCoach}
          sx={{
            p: 4,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: { xs: 300, sm: 400 },
            mx: 'auto'
          }}
        >
          <Typography variant="h6" textAlign="center" mb={1}>
            Create Coach
          </Typography>

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <TextField
            label="Full Name"
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
            required
          />

          <TextField
            label="User Name"
            value={user_name}
            onChange={(e) => setUser_name(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
            Submit
          </Button>
        </Box>
      </Dialog>

    </div>
  )
}
