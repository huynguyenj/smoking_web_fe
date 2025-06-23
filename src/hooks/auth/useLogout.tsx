import { toast } from 'react-toastify'
import privateApiService from '../../services/ApiPrivate'
import { useTokenInfoStorage } from '../../store/authStore'

export default function useLogout() {
  const clearToken = useTokenInfoStorage.getState().setClear
  const handleLogout = async () => {
    try {
      await privateApiService.logout()
      clearToken()
    } catch (error) {
      console.log(error)
      toast('Logout fail')
    }
  }
  return { handleLogout }
}
