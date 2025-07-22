import { Box, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import type React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from 'lodash'
import CloseIcon from '@mui/icons-material/Close'
import type { SearchUserType } from '../../../model/user/userType'
import privateApiService from '../../../services/ApiPrivate'
import Avatar from '../../../assets/avatar.jpg'
import { toast } from 'react-toastify'
export default function SearchFriends() {
  const [inputValue, setInputValue] = useState('')
  const [friends, setFriends] = useState<SearchUserType[]>([])
  const [focus, setFocus] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedFriend, setSelectedFriend] = useState<SearchUserType | null>(null)
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debounceFn(value)
  }
  const debounceFn = useMemo(() =>
    debounce(async (value: string) => {
      try {
        const result = await privateApiService.searchFriend(value)
        setFriends(result.data)
      } catch (error) {
        console.log(error)
      }
    }, 1000), [])
  useEffect(() => {
    return () => debounceFn.cancel()
  }, [debounceFn])
  const handleAdd = async () => {
    try {
      if (selectedFriend) {
        const result = await privateApiService.addFriend(selectedFriend?._id)
        toast.success(result.message)
      }
    } catch (error) {
      toast.error(error as string)
    } finally {
      setSelectedFriend(null)
    }
  }
  const handleOpenDialog = (friend: SearchUserType) => {
    setSelectedFriend(friend)
  }

  const handleCloseDialog = () => {
    setSelectedFriend(null)
  }
  return (
    <Box sx={{ border: '1px solid black', display:'flex', justifyContent:'space-between', padding:'5px 10px', borderRadius:'10px', backgroundColor:'black', marginBottom:'30px', position:'relative' }}>
      <InputBase onFocus={() => setFocus(true)} ref={inputRef} value={inputValue} onChange={handleChange} fullWidth placeholder='Search friends...' sx={{ color:'white' }}></InputBase>
      <IconButton><SearchIcon sx={{ color:'white' }}/></IconButton>
      <Box sx={{ position:'absolute', top: 50, left: 0, backgroundColor:'#ececec', paddingX: 10, paddingY: 5, zIndex:1, width: '100%', borderRadius: 5, border:2, opacity: focus? 1 : 0, transition: 'opacity 200ms linear', overflowY:'auto', overflow:'hidden', pointerEvents: focus ? 'auto' : 'none' }}>
        <button onClick={() => setFocus(false)} className='absolute top-5 right-5 bg-black-fig p-1 rounded-full cursor-pointer active:opacity-70'>
          <CloseIcon sx={{ color:'white' }}/>{''}</button>
        {friends.length > 0 ? <Box>{friends.map((friend) => (
          <div key={friend._id} className='flex gap-5 w-[100%] justify-between mb-5'>
            <button className='p-5 w-full rounded-2xl cursor-pointer text-[1.2rem] flex items-center justify-between border-1' onClick={() => handleOpenDialog(friend)}>
              <img className='w-10 h-10 rounded-full' src={friend.image_url ? friend.image_url : Avatar} alt='avatar'/>
              <p>
                {friend.user_name}
              </p>
              <Chip label={friend.role} style={{ backgroundColor: friend.role === 'coach' ? '#00bbf0' : '', color: friend.role === 'coach'? 'white': 'black', fontWeight:'500' }} variant={friend.role === 'coach' ? 'filled' : 'outlined'} />
            </button>
          </div>
        ))}</Box>
          : 'Not found' }
      </Box>
      <Dialog open={!!selectedFriend} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: '1.5rem' }}>
          Friend
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: '1.4rem' }}>
           Do you want to add this user <span className='font-bold'>{selectedFriend?.user_name}</span> to your friends list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleAdd} className='text-white-fig text-2xl bg-blue-fig px-5 py-3 rounded-2xl cursor-pointer'>Yes</button>
          <button onClick={handleCloseDialog} className='text-white-fig text-2xl bg-red-400 px-5 py-3 rounded-2xl cursor-pointer'>No</button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
