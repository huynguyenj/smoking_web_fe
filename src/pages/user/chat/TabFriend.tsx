import { Box, Chip, Tab, Typography } from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import React, { useState } from 'react'
import TabPanel from '@mui/lab/TabPanel'
import ChatSection from './ChatSection'
import type { Friend } from '../../../model/user/userType'
import SearchFriends from './SearchFriends'
import Avatar from '../../../assets/avatar.jpg'


export default function TabFriend({ listFriend }: { listFriend: Friend[]}) {
  const [tabIndex, setTabIndex] = useState<string>(listFriend[0]?._id)
  const handleChange = (_: React.SyntheticEvent, value: string) => {
    setTabIndex(value)
  }

  return (
    <div className='flex h-[90vh] border-2'>
      <TabContext value={tabIndex}>
        <Box sx={{ width: '30%', borderRight:1, borderColor:'gray', padding:'5px 5px' }}>
          <SearchFriends/>
          {listFriend.length > 0 ?
            <TabList variant='scrollable' onChange={handleChange} orientation='vertical'>
              {listFriend.map((friend) => (
                <Tab sx={{ width:'100%', margin:'auto' }}
                  label={
                    <div className='flex items-center justify-between gap-5 w-full'>
                      <div className='flex items-center gap-5'>
                        <img className='w-10 h-10 rounded-full' src={friend.image_url ? friend.image_url : Avatar} alt='avatar'/>
                        <p>{friend.user_name}</p>
                      </div>
                      <Chip label={friend.role} style={{ backgroundColor: friend.role === 'coach' ? '#00bbf0' : '', color: friend.role === 'coach'? 'white': 'black', fontWeight:'500' }} variant={friend.role === 'coach' ? 'filled' : 'outlined'} />
                    </div>}
                  value={friend._id}
                  key={friend._id}/>
              ))}
            </TabList> : <Typography sx={{ textAlign:'center', fontSize: '1.5rem' }}>No friends in list</Typography>
          }
        </Box>
        <Box sx={{ width:'70%' }}>
          {listFriend.map((friend) => (
            <TabPanel key={friend._id} value={friend._id} sx={{ height: '100%' }}>
              <ChatSection friend={friend}/>
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </div>
  )
}
