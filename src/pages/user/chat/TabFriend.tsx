import { Box, IconButton, InputBase, Tab } from '@mui/material'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import React, { useState } from 'react'
import TabPanel from '@mui/lab/TabPanel'
import ChatSection from './ChatSection'
import SearchIcon from '@mui/icons-material/Search'
import type { Friend } from '../../../model/user/userType'


export default function TabFriend({ listFriend }: { listFriend: Friend[]}) {
  const [tabIndex, setTabIndex] = useState<string>(listFriend[0]?._id || '')
  // const [search, setSearch] = useState<string>('')
  const handleChange = (_: React.SyntheticEvent, value: string) => {
    setTabIndex(value)
  }

  return (
    <div className='flex h-[90vh]'>
      <TabContext value={tabIndex}>
        <Box sx={{ width: '30%', height:'100vh', borderRight:1, borderColor:'gray', padding:'5px 5px' }}>
          <Box sx={{ border: '1px solid black', display:'flex', justifyContent:'space-between'
            , padding:'5px 10px', borderRadius:'10px', backgroundColor:'black', marginBottom:'30px' }}>
            <InputBase fullWidth placeholder='Search friends...' sx={{ color:'white' }}></InputBase>
            <IconButton><SearchIcon sx={{ color:'white' }}/></IconButton>
          </Box>
          <TabList variant='scrollable' onChange={handleChange} orientation='vertical' >
            {listFriend.map((friend) => (
              <Tab label={friend.user_name} value={friend._id} key={friend._id}/>
            ))}
          </TabList>
        </Box>
        <Box sx={{ width:'70%' }}>
          {listFriend.map((friend) => (
            <TabPanel key={friend._id} value={friend._id}>
              <ChatSection friend={friend}/>
            </TabPanel>
          ))}
        </Box>
      </TabContext>
    </div>
  )
}
