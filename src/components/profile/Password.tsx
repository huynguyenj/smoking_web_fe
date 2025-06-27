import { useRef, useState } from 'react'
import type { PasswordData } from '../../model/user/userType'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LockResetIcon from '@mui/icons-material/LockReset'
import useOpen from '../../hooks/openState/useOpen'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../loading/LoadingScreenBg'
import SaveIcon from '@mui/icons-material/Save'

export default function Password() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const inputCurrentPass = useRef<HTMLInputElement>(null)
  const inputNewPass = useRef<HTMLInputElement>(null)
  const [seePass, setSeePass] = useState<boolean>(false)
  const [seePass2, setSeePass2] = useState<boolean>(false)
  const { toggle, isOpen } = useOpen()
  const handleChangePass = async () => {
    if (inputCurrentPass.current?.value && inputNewPass.current?.value) {
      try {
        setIsLoading(true)
        const data: PasswordData = {
          current_password: inputCurrentPass.current.value,
          new_password: inputNewPass.current.value
        }
        await privateApiService.changePassword(data)
        toast.success('Update password successfully!')
        inputCurrentPass.current.value =''
        inputNewPass.current.value =''
      } catch (error) {
        toast.error(error as string)
      } finally {
        setIsLoading(false)
      }
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center" onClick={toggle}>
              <LockResetIcon fontSize="small" className="mr-1" />
                        Change Password
            </button>
          </div>
        </div>
      </div>
      {isOpen &&
      <>
        {isLoading ?
          <LoadingScreenBg/>:
          <>
            <div className='flex flex-col gap-5 mt-4'>
              <div className='flex flex-col gap-2 relative'>
                <label htmlFor="old-pass">Old password</label>
                <input ref={inputCurrentPass} id='old-pass' type={seePass ? 'text' : 'password'} className='bg-gray-300 rounded-2xl p-2'/>
                <button className='absolute right-5 top-10' onClick={() => setSeePass(!seePass)}>{seePass ? <Visibility fontSize='small'/> : <VisibilityOff fontSize='small'/>}</button>
              </div>
              <div className='flex flex-col gap-2 relative'>
                <label htmlFor="new-pass">New password</label>
                <input ref={inputNewPass} id='new-pass' type={seePass2 ? 'text' : 'password'} className='bg-gray-300 rounded-2xl p-2' />
                <button className='absolute right-5 top-10' onClick={() => setSeePass2(!seePass2)}>{seePass2 ? <Visibility fontSize='small'/> : <VisibilityOff fontSize='small'/>}</button>
              </div>
            </div>
            <button className='bg-blue-400 p-2 rounded-2xl text-white hover:opacity-70 active:opacity-80 cursor-pointer mt-5' type='button' onClick={handleChangePass}><SaveIcon/>{''}</button>
          </>
        }
      </>
      }
    </div>
  )
}
