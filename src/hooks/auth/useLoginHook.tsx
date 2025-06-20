import { useState } from 'react'
import { toast } from 'react-toastify'
import publicApiService from '../../services/ApiPublic'
import { useTokenInfoStorage } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { AdminRoute, UserRoute } from '../../const/pathList'

export default function useLoginHook() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const addLocal = useTokenInfoStorage()
  const navigate = useNavigate()
  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const result = await publicApiService.login({ email, password })
      addLocal.setLogin(result.data)
      addLocal.setToken(result.data?.accessToken)
      toast.success('Login successfully!')
      if ( result.data.role === 'admin' ) {
        navigate(AdminRoute.ADMIN_DASHBOARD_PATH)
      } else {
        navigate(UserRoute.HOME_PATH)
      }
    } catch (error) {
      console.log(error)
      toast.error('Login fail')
    } finally {
      setIsLoading(false)
    }
  }
  return {
    handleLogin,
    isLoading
  }
}
