import { redirect } from 'react-router-dom'
import { useTokenInfoStorage } from '../store/authStore'
import { PublicRoute } from '../const/pathList'

export async function rootAdminLoader() {
  const role = useTokenInfoStorage.getState().userInfo?.role
  if (role !== 'admin') throw redirect(PublicRoute.ERROR_PATH)
}
export async function rootMemberLoader() {
  const role = useTokenInfoStorage.getState().userInfo?.role
  if (role !== 'member') throw redirect(PublicRoute.ERROR_PATH)
}

export async function rootUserLoader() {
  const role = useTokenInfoStorage.getState().userInfo?.role
  if (role !== 'user' && role !== 'member') throw redirect(PublicRoute.ERROR_PATH)
}