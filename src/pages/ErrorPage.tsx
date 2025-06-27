import { useNavigate } from 'react-router-dom'
import { useTokenInfoStorage } from '../store/authStore'
import { AdminRoute, PublicRoute, UserRoute } from '../const/pathList'

export default function ErrorPage() {
  const navigate = useNavigate()
  const role = useTokenInfoStorage.getState().userInfo?.role
  const handleNavigate = () => {
    if (role === 'admin') {
      navigate(AdminRoute.ADMIN_DASHBOARD_PATH)
    } else if (role !== undefined) {
      navigate(UserRoute.HOME_PATH)
    } else {
      navigate(PublicRoute.LOGIN_PATH)
    }
  }
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-center flex flex-col items-center gap-5">
      <h1 className="text-9xl text-center font-bold ">404</h1>
      <p className="text-5xl">Page not found</p>
      <button className="p-3 bg-black-fig text-white-fig rounded-2xl cursor-pointer text-2xl hover:opacity-70 active:opacity-80" onClick={handleNavigate}>Go back</button>
    </div>
  )
}
