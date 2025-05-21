import { Navigate, Outlet, useLocation, useNavigation } from 'react-router-dom'
import { UserRoute } from '../const/listRoutes'

export default function LoadingLayout() {
  const navigation = useNavigation()
  const { pathname } = useLocation()
  return (
    <>
      {navigation.state === 'loading' && (
        <div className='text-4xl text-center'>Loading...</div>
      )}
      {pathname === '/' ? <Navigate to={UserRoute.HOME_PATH}/> : <Outlet/> }
    </>
  )
}
