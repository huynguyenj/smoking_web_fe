import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function useMessage() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [roomId, setRoomId] = useState<string>('')
  useEffect(() => {
    if (!roomId) return
    const socketConnect = io(import.meta.env.VITE_BASE_SERVER_URL, { query: { roomId } })
    setSocket(socketConnect)
    const cleanup = () => {
      socketConnect.close()
    }
    return cleanup
  }, [roomId])

  return {
    setRoomId,
    socket
  }
}
