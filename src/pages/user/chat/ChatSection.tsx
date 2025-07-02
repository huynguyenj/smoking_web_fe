import { Box } from '@mui/material'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useTokenInfoStorage } from '../../../store/authStore'
import privateApiService from '../../../services/ApiPrivate'
import type { Friend, MessageHistory, MessageHistoryInfo } from '../../../model/user/userType'
import { toast } from 'react-toastify'
import useMessage from '../../../hooks/socket/useMessage'
import { generateRoomId } from '../../../utils/generateRoomId'
import Avatar from '../../../assets/avatar.jpg'
import useOpen from '../../../hooks/openState/useOpen'
import CustomModal from '../../../components/modal/CustomModal'
import CreatePlanCoachComponent from '../../../components/coach/CreatePlanCoachComponent'

export default function ChatSection({ friend }: {friend: Friend}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<MessageHistoryInfo>()
  const [messageHistory, setMessageHistory] = useState<MessageHistory[]>([])
  const { setRoomId, socket } = useMessage()
  const user = useTokenInfoStorage.getState()
  const { toggle, isOpen } = useOpen()
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setRoomId(generateRoomId(user.userInfo?._id, friend._id))
    const getMessage = async () => {
      try {
        const result = await privateApiService.getMessageHistory(friend._id)
        setMessages(result.data)
        setMessageHistory(result.data.result)
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
      setMessageHistory((prevMessage) => [...prevMessage, message])
    })
    return () => {
      socket.off('received-message')
    }
  }, [socket])

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const showProfileMessage = (id: string, messageInfo: MessageHistory) => {
    if (id === messages?.user_info._id) {
      return (
        <div className='w-full flex justify-end'>
          <div className='flex items-center justify-center gap-3'>
            <div>
              <p className='text-black text-end mr-3'>{messages.user_info.user_name }</p>
              <div className='rounded-2xl mb-5 px-5 py-3 bg-blue-fig'>
                <p className='text-white'>{messageInfo.content}</p>
              </div>
            </div>
            {/* className={message.sender_id === messages?.user_info._id ? 'w-full text-right' : 'w-full text-left'} */}
            <img className='w-10 aspect-square rounded-full' src={messages?.user_info.image_url ? messages.user_info.image_url : Avatar} alt="profile-image" />
          </div>
        </div>
      )
    } else {
      return (
        <div className='w-full flex justify-start text-black'>
          <div className='flex items-center justify-center gap-3'>
            <img className='w-10 aspect-square rounded-full' src={messages?.friend_info.image_url ? messages.friend_info.image_url : Avatar} alt="profile-image" />
            <div>
              <p className='text-start ml-3'>{messages?.friend_info.user_name}</p>
              <div className='rounded-2xl mb-5 px-5 py-3 bg-gray-fig'>
                <p>{messageInfo.content}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  return (
    <Box sx={{ width:'100%', position:'relative', height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
      <div className="border-b-1">
        {user.userInfo?.role === 'coach' && 
        <div className="flex items-center gap-5 justify-between">
          {/* <img src={friend.image} alt="avatar" className="w-[5%] aspect-square rounded-full " /> */}
          <p className="text-2xl"> {friend.user_name}</p>
          <button onClick={toggle} className='border-2 rounded-2xl px-5 py-2 hover:bg-black-fig hover:text-white active:bg-gray-800 active:text-white cursor-pointer '>Create plan for this user</button>
        </div>
        }
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
        {messageHistory.map((message, index) => (
          <Fragment key={index}>
            {showProfileMessage(message.sender_id, message)}
          </Fragment>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className=" bottom-0 w-full h-20 flex rounded-2xl">
        <input ref={inputRef} type="text" placeholder="Message" className="w-full rounded-l-2xl bg-gray-fig px-5"/>
        <button type='button' onClick={sendMessage} className="p-5 text-center bg-blue-fig rounded-r-2xl font-bold text-white-fig cursor-pointer ">Send</button>
      </div>
      {isOpen &&
      <CustomModal>
        <CreatePlanCoachComponent userId={messages?.friend_info._id} toggle={toggle} />
      </CustomModal>
      }
    </Box>
  )
}
