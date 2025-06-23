import { toast } from 'react-toastify'
import privateApiService from '../../services/ApiPrivate'
import { useTokenInfoStorage } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { PublicRoute } from '../../const/pathList'

export default function useLogout() {
  const clearToken = useTokenInfoStorage.getState().setClear
  const navigation = useNavigate()
  const handleLogout = async () => {
    try {
      await privateApiService.logout()
      clearToken()
      navigation(PublicRoute.LOGIN_PATH)
    } catch (error) {
      console.log(error)
      toast('Logout fail')
    }
  }
  return { handleLogout }
}
