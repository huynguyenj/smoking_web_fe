import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RegisterType } from '../../model/authModel/authDataType'
import publicApiService from '../../services/ApiPublic'
import { toast } from 'react-toastify'
import { PublicRoute } from '../../const/pathList'


export default function useRegister() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleRegister = async (data: RegisterType) => {
    try {
      setIsLoading(true)
      await publicApiService.register(data)
      toast.success('Register successfully!')
      navigate(PublicRoute.LOGIN_PATH)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, handleRegister }
}
