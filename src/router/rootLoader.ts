import { redirect } from 'react-router-dom'
import { useTokenInfoStorage } from '../store/authStore'
import { PublicRoute } from '../const/pathList'

export async function rootLoader() {
  const token = useTokenInfoStorage.getState().token
  if (!token) {
    throw redirect(PublicRoute.LOGIN_PATH)
  }

  return null
}