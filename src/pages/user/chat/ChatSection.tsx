import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useTokenInfoStorage } from '../../../store/authStore'
import privateApiService from '../../../services/ApiPrivate'
import type { Friend, MessageHistoryInfo } from '../../../model/user/userType'
import { toast } from 'react-toastify'
import useMessage from '../../../hooks/socket/useMessage'
import { generateRoomId } from '../../../utils/generateRoomId'


export default function ChatSection({ friend }: {friend: Friend}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<MessageHistoryInfo[]>([])
  const { setRoomId, socket } = useMessage()
  const user = useTokenInfoStorage.getState()

  useEffect(() => {
    setRoomId(generateRoomId(user.userInfo?._id, friend._id))
    const getMessage = async () => {
      try {
        const result = await privateApiService.getMessageHistory(friend._id)
        setMessages(result.data)
      } catch (error) {
        toast.error('Get message history fail!')
        console.log(error)
      }
    }
    getMessage()
  }, [friend._id])

  const sendMessage = () => {
    if (inputRef.current?.value) {
      const sendMess = {
        sender_id: user.userInfo?._id,
        receiverId: friend._id,
        text: inputRef.current.value
      }
      socket?.emit('send-message', sendMess)
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    if (!socket) return
    socket.on('received-message', (message) => {
      setMessages((prevMessage) => [...prevMessage, message])
    })
    return () => {
      socket.off('received-message')
    }
  }, [socket])

  return (
    <Box sx={{ width:'100%', position:'relative', height:'90vh', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
      <div className="border-b-1">
        <div className="flex items-center gap-5">
          {/* <img src={friend.image} alt="avatar" className="w-[5%] aspect-square rounded-full " /> */}
          <p className="text-2xl"> {friend.user_name}</p>
        </div>
        <p>{new Date(Date.now()).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })}</p>

      </div>
      <div className='overflow-y-auto h-full mt-5 mb-5'>
        {messages.map((message, index) => (
          <div key={index} className={`w-full flex ${user.userInfo?._id === message.sender_id ? 'justify-end text-white' : 'justify-start text-black'}`}>
            <div className={` rounded-2xl mb-5 p-5 ${user.userInfo?._id === message.sender_id ? 'bg-blue-fig' : 'bg-gray-200'}`}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" bottom-0 w-full h-20 flex rounded-2xl">
        <input ref={inputRef} type="text" placeholder="Message" className="w-full rounded-l-2xl bg-gray-fig px-5"/>
        <button type='button' onClick={sendMessage} className="p-5 text-center bg-blue-fig rounded-r-2xl font-bold text-white-fig cursor-pointer ">Send</button>
      </div>
    </Box>
  )
}
