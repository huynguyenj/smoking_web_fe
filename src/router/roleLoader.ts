import { redirect } from 'react-router-dom'
import { useTokenInfoStorage } from '../store/authStore'
import { PublicRoute } from '../const/pathList'
import { toast } from 'react-toastify'

export async function rootAdminLoader() {
  const role = useTokenInfoStorage.getState().userInfo?.role
  if (role !== 'admin') {
    toast.info('You are not admin !')
    return redirect(PublicRoute.ERROR_PATH)
  }
  return null
}
export async function rootMemberLoader() {
  const role = useTokenInfoStorage.getState().userInfo?.role
  if (role !== 'member' && role!=='coach') {
    toast.info('You need to be a member to access!')
    return redirect(PublicRoute.ERROR_PATH)
  }
  return null
}

export async function rootUserLoader() {
  const role = useTokenInfoStorage.getState().userInfo?.role
  if (role !== 'user' && role !== 'member' && role!=='coach') {
    toast.info('You need to login to access!')
    return redirect(PublicRoute.ERROR_PATH)
  }
  return null
}