import dayjs, { Dayjs } from 'dayjs'
import type { Profile, UpdateProfile } from '../../model/user/userType'
import useOpen from '../../hooks/openState/useOpen'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import LoadingScreenBg from '../loading/LoadingScreenBg'
import privateApiService from '../../services/ApiPrivate'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'
import CloseIcon from '@mui/icons-material/Close'
interface Props {
  profile: Profile
  getInfo: () => void
}
export default function ProfileSection({ profile, getInfo }: Props) {
  const { isOpen, toggle } = useOpen()
  const [dateValue, setDateValue] = useState<Dayjs | null>(profile.birthdate ? dayjs(profile.birthdate) : null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    if (!dateValue) {
      formData.append('birthdate', '')
    } else {
      formData.append('birthdate', String(dateValue.valueOf()))
    }
    const data: UpdateProfile = {
      address: String(formData.get('address') || ''),
      experience: String(formData.get('experience') || ''),
      age: formData.get('age') ? Number(formData.get('age')) : 0,
      birthdate: formData.get('birthdate') ? Number(formData.get('birthdate')) : null
    }

    try {
      setLoading(true)
      await privateApiService.updateProfile(data as UpdateProfile)
      getInfo()
      toast.success('Update successfully!')
    } catch (error) {
      toast.error(error as string)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {isLoading ?
        <LoadingScreenBg/>
        :
        <>
          <div className="flex mb-4 justify-between">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Profile Info</h3>
            <button className=' text-white font-bold hover:opacity-70 active:opacity-80 cursor-pointer' onClick={toggle}>
              {isOpen? <div className='bg-red-400 p-3 rounded-full '><CloseIcon/>{''}</div> :  <div className='bg-blue-400 p-3 rounded-full'><EditIcon/></div> }
            </button>
          </div>
          <div className="border-t pt-6">
            {isOpen ?
              <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className='p-3 border-2 rounded-2xl flex gap-5 items-center'>
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Update your address"
                    defaultValue={profile.address}
                    className='border-none outline-none focus:border-none w-[80%] p-2'
                  />
                </div>

                <div className='p-3 border-2 rounded-2xl flex gap-5 items-center'>
                  <label htmlFor="experience">Experience:</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="Update your experience"
                    defaultValue={profile.experience}
                    className='border-none outline-none focus:border-none w-[80%] p-2'
                  />
                </div>
                <div className='p-3 border-2 rounded-2xl flex gap-5 items-center'>
                  <label htmlFor="age">Age:</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Update your age"
                    defaultValue={profile.age}
                    className='border-none outline-none focus:border-none w-[80%] p-2'
                  />
                </div>
                <div className='p-3 border-2 rounded-2xl flex gap-5 items-center'>
                  <label htmlFor="">Birthdate:</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={dateValue} onChange={(newValue) => setDateValue(newValue)}/>
                  </LocalizationProvider>
                </div>
                <button className='bg-blue-400 p-2 rounded-2xl text-white hover:opacity-70 active:opacity-80 cursor-pointer' type='submit'>Save</button>
              </form> :
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <p><strong>Address:</strong> {profile.address ? profile.address : 'Update your address'}</p>
                <p><strong>Experience:</strong> {profile.experience ? profile.experience : 'Update your experience'}</p>
                <p><strong>Birthdate:</strong> {profile?.birthdate ? dayjs(profile.birthdate).format('DD/MM/YYYY') : 'N/A'}</p>
                <p><strong>Age:</strong> {profile.age ? profile.age : 'Update your age'}</p>
              </div>
            }
          </div>
        </>
      }
    </div>
  )
}
