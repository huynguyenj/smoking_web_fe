import { useEffect, useState } from 'react'
import MemberShipBox from '../../components/memberShip-box/MemberShipBox'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import type { MembershipInfo } from '../../model/user/membershipType'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

export default function MemberManagementPage() {
  const [memberPackages, setMemberPackages] = useState<MembershipInfo[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [featureInput, setFeatureInput] = useState('')
  const [membership_title, setMembership_title] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getMemberPackage()
  }, [])

  const getMemberPackage = async () => {
    setIsLoading(true)
    try {
      const response = await ApiAdminPrivate.getMemberPackage()
      setMemberPackages(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
    const featuresArray = featureInput
      .split(',')
      .map(f => f.trim()) // loại khoảng trắng
      .filter(f => f !== '') // loại chuỗi rỗng
    try {
      await ApiAdminPrivate.createMemberPackage({ membership_title, price, feature: featuresArray })
      setOpen(false)
      getMemberPackage()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='flex justify-end mb-[0.8rem] mr-[2.1rem]'>
        <Button variant='contained' onClick={() => setOpen(true)}>Create</Button>
      </div>
      {isLoading ? (<div className="flex items-center justify-center">
        <CircularProgress />
      </div>) : (<div className='flex justify-around gap-2 flex-wrap'>
        {memberPackages.map((m) => (
          <div key={m._id}>
            <MemberShipBox
              backgroundColor={
                m.membership_title === 'Premium' ? 'bg-yellow-memberPackage/80' :
                  m.membership_title === 'Standard' ? 'bg-red-fig/80' :
                    'bg-blue-fig/80' // mặc định cho Normal hoặc các giá trị khác
              }
              getMemberPackage={getMemberPackage}
              _id={m._id}
              feature={m.feature}
              memberShipTitle={m.membership_title}
              profit={m.price}
            />
          </div>
        ))}
      </div>)}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create package</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={membership_title}
            onChange={e => setMembership_title(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Price(Vnd)"
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Feature"
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            fullWidth
            margin="normal"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
