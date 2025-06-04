
import { Box } from '@mui/material'
import TabFriend from './TabFriend'
import { Link } from 'react-router-dom'
import { UserRoute } from '../../../const/listRoutes'
import { useEffect, useState } from 'react'
import type { Friend } from '../../../model/user/userType'
import { toast } from 'react-toastify'
import privateApiService from '../../../services/ApiPrivate'

export default function ChatPage() {
  const [friends, setFriends] = useState<Friend[]>([])
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
  }, [])
  return (
    <Box sx={{ maxHeight: '100vh' }}>
      { friends.length > 0 ? <TabFriend listFriend={friends}/>: 'No friends' }
      <Box>
        <Link to={UserRoute.HOME_PATH} className='px-5 py-3 bg-black-fig text-white-fig rounded-2xl ml-5'>Back</Link>
      </Box>
    </Box>
  )
}
