import React, { useEffect, useRef, useState } from 'react'
import useOpen from '../../hooks/openState/useOpen'
import Avatar from '../../assets/avatar.jpg'
import type { UserCommonTypeInfo, UserInfo, UserProfile } from '../../model/user/userType'
import TabContext from '@mui/lab/TabContext'
import { Box, Tab } from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import privateApiService from '../../services/ApiPrivate'
import { toast } from 'react-toastify'
import LoadingScreenBg from '../../components/loading/LoadingScreenBg'
import { formDate } from '../../utils/formDate'
import ProfileSection from '../../components/profile/ProfileSection'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Password from '../../components/profile/Password'
import ClearIcon from '@mui/icons-material/Clear'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import { useTokenInfoStorage } from '../../store/authStore'
import AchievementPage from './achievement/AchievementPage'
const ProfilePage = () => {
  const { toggle, isOpen } = useOpen()
  const [editAvatar, setEditAvatar] = useState<boolean> (false)
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tabValue, setTabValue] = useState<string>('1')
  const [file, setFile] = useState<File>()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setUser } = useTokenInfoStorage()
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue((newValue))
  }
  const handleTriggerInputFile = () => {
    setEditAvatar(true)
    fileInputRef.current?.click()
  }
  const getUserInformation = async () => {
    try {
      setIsLoading(true)
      const response = await privateApiService.getUserInfo()
      const typeResponse= response.data as UserProfile
      setUserInfo(typeResponse)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserInformation()
  }, [])

  const handleSubmitForm1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const gender = formData.get('gender') == 'true' ? true : false
    const data = {
      full_name: formData.get('full_name') ? formData.get('full_name') : userInfo?.full_name,
      user_name: formData.get('user_name') ? formData.get('user_name') : userInfo?.user_name,
      gender: gender
    }
    try {
      setIsLoading(true)
      await privateApiService.updateInformationCommon(data as UserCommonTypeInfo)
      getUserInformation()
      setUser(userInfo as UserInfo)
      toast.success('Update successfully!')
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateAvatar = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      if (file) {
        formData.append('profile_image', file)
        await privateApiService.changeAvatar(formData)
        toast.success('Update successfully!')
        setFile(undefined)
        getUserInformation()
        setUser(userInfo as UserInfo)
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      toast.error('Update fail!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      {isLoading ? <LoadingScreenBg/> :
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 grid md:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="flex flex-col items-center text-center">
            <img
              src={userInfo?.image_url ? userInfo.image_url : Avatar}
              alt="avatar"
              className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover shadow mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-800">{userInfo?.full_name ? userInfo.full_name : 'Update your full name'}</h2>
            <p className="text-base text-gray-500">@{userInfo?.user_name ? userInfo.user_name : 'Update your username'}</p>
            <p className="mt-2 text-sm text-blue-600 font-medium capitalize">{userInfo?.role ? userInfo.role : 'N/A'}</p>
            <p><strong>Created:</strong> {userInfo?.created_date ? formDate(userInfo.created_date) : 'N/A'}</p>
            <p><strong>Updated:</strong> {userInfo?.created_date ? formDate(userInfo.updated_date) : 'N/A'}</p>
            <div className='w-[80%] rounded-2xl flex flex-col gap-5 items-center'>
              <label htmlFor="image">
                    Upload image file:
              </label>
              <input ref={fileInputRef} id='image' name='profile_image' type="file" className='hidden' onChange={handleChangeFile}/>
              <button type='button' onClick={handleTriggerInputFile} className='bg-blue-100 rounded-2xl text-blue-500 px-5 py-2 flex items-center gap-2 cursor-pointer hover:opacity-80 active:opacity-100'>
                <CloudUploadIcon/>
                    Choose image
              </button>
              {file && editAvatar ?
                <>
                  <img src={URL.createObjectURL(file)} alt='image-upload' className='w-30 aspect-square'/>
                  <div className='flex gap-4'>
                    <button className='bg-blue-100 rounded-full text-blue-500 p-2 flex items-center gap-2 cursor-pointer hover:opacity-80 active:opacity-100' onClick={handleUpdateAvatar}>
                      <SaveIcon/>{''}
                    </button>
                    <button className='bg-red-300 text-red-500 p-2 rounded-full flex items-center gap-2 cursor-pointer hover:opacity-80 active:opacity-100' onClick={ () => setEditAvatar(false) }>
                      <ClearIcon/> {''}
                    </button>
                  </div>
                </>
                : <></>}
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:col-span-2 space-y-8 text-gray-700 text-[16px]">
            <TabContext value={tabValue}>
              <Box >
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Common" value='1' />
                  <Tab label="Profile" value='2' />
                  <Tab label="Password" value='3' />
                  <Tab label="Achievement" value='4' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                <form className=" items-center justify-between pb-3" onSubmit={handleSubmitForm1}>
                  <div className='flex justify-between items-center border-b gap-20'>
                    <h3 className="text-2xl font-semibold text-gray-800">Account Info</h3>
                    <button className="text-blue-600 hover:underline text-sm cursor-pointer" onClick={toggle} type='button'>
                      <EditIcon/> {''}
                    </button>
                  </div>
                  {isOpen ?
                    <div className="flex flex-col gap-5 mt-5">
                      <div className='p-3 border-2 rounded-2xl flex gap-5 items-center'>
                        <label htmlFor="full_name">Full Name:</label>
                        <input
                          type="text"
                          id="full_name"
                          name="full_name"
                          placeholder="Update your fullname"
                          defaultValue={userInfo?.full_name}
                          className='border-none outline-none focus:border-none w-[80%] p-2'
                        />
                      </div>

                      <div className='p-3 border-2 rounded-2xl flex gap-5 items-center'>
                        <label htmlFor="user_name">Username:</label>
                        <input
                          type="text"
                          id="user_name"
                          name="user_name"
                          placeholder="Update your username"
                          defaultValue={userInfo?.user_name}
                          className='border-none outline-none focus:border-none w-[80%] p-2'
                        />
                      </div>
                      <div>
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" name="gender" defaultValue={'true'}>
                          <option value="true">Male</option>
                          <option value="false">Female</option>
                        </select>
                      </div>
                      <button className='bg-blue-400 p-2 rounded-2xl text-white hover:opacity-70 active:opacity-80' type='submit'>Save</button>
                    </div>
                    :
                    <div className='flex flex-col gap-5 mt-5'>
                      <p className='bg-gray-100 px-5 py-3 text-gray-400 rounded-2xl'>Fullname: {userInfo?.full_name ? userInfo.full_name : 'Update your fullname'}</p>
                      <p className='bg-gray-100 px-5 py-3 text-gray-400 rounded-2xl'>Username: {userInfo?.user_name ? userInfo.user_name : 'Update your username'}</p>
                      <p className='bg-gray-100 px-5 py-3 text-gray-400 rounded-2xl'>Email: {userInfo?.email ? userInfo.email : 'Update your email'}</p>
                      <p className='bg-gray-100 px-5 py-3 text-gray-400 rounded-2xl'>Active: {userInfo?.isActive ? 'Active': 'Not active'}</p>
                      <p className='bg-gray-100 px-5 py-3 text-gray-400 rounded-2xl'>Gender: {userInfo?.gender ? 'Male' : 'Female'}</p>
                    </div>
                  }

                </form>
              </TabPanel>
              <TabPanel value='2'>
                { userInfo?.profile &&
               <ProfileSection profile={userInfo?.profile} getInfo={getUserInformation}/>
                }
              </TabPanel>
              <TabPanel value='3'>
                {userInfo &&
                <Password/>
                }
              </TabPanel>
              <TabPanel value={'4'}>
                <AchievementPage active={tabValue == '4'}/>
              </TabPanel>
            </TabContext>
          </div>
        </div>
      }

    </div>
  )
}

export default ProfilePage
