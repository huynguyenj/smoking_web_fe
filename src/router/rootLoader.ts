import { redirect } from 'react-router-dom'
import { useTokenInfoStorage } from '../store/authStore'
import { PublicRoute } from '../const/pathList'

export function rootLoader() {
  const token = useTokenInfoStorage.getState().token
  if (!token) {
    return redirect(PublicRoute.LOGIN_PATH)
  }

  return null
}