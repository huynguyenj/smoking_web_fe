
import { Box } from '@mui/material'
import TabFriend from './TabFriend'
import { Link } from 'react-router-dom'
import { UserRoute } from '../../../const/listRoutes'
import { useEffect, useState } from 'react'
import type { Friend } from '../../../model/user/userType'
import { toast } from 'react-toastify'
import privateApiService from '../../../services/ApiPrivate'
import { ArrowBack } from '@mui/icons-material'
import CachedIcon from '@mui/icons-material/Cached'
export default function ChatPage() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [reload, setReload] = useState<boolean>(false)
  useEffect(() => {
    const getFriendList = async () => {
      try {
        const result = await privateApiService.getFriendsList()
        setFriends(result.data)
      } catch (error) {
        console.log(error)
        toast.error('Get friends fail!')
      }
    }
    getFriendList()
  }, [reload])
  const handleReload = () => {
    setReload((prevState) => !prevState)
  }
  return (
    <Box sx={{ maxHeight: '100vh' }}>
      <TabFriend listFriend={friends}/>
      <Box sx={{ marginTop: 2, display:'flex', alignItems:'center', gap:3 }}>
        <Link to={UserRoute.HOME_PATH} className='p-3 bg-black-fig text-white-fig ml-5 rounded-full cursor-pointer'><ArrowBack/></Link>
        <button onClick={handleReload} className='p-3 bg-black-fig w-12 text-white-fig ml-5 rounded-full cursor-pointer group hover:w-30  flex gap-3 transition-all duration-200 ease-in-out '>
          <CachedIcon/>
          <div className='group-hover:transform-[scale(1)] transform-[scale(0)] duration-300 ease-in-out'>Reload</div>
        </button>
      </Box>
    </Box>
  )
}
