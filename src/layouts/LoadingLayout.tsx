import { Navigate, Outlet, useLocation, useNavigation } from 'react-router-dom'
import { UserRoute } from '../const/pathList'
import { Box, CircularProgress } from '@mui/material'


export default function LoadingLayout() {
  const navigation = useNavigation()
  const { pathname } = useLocation()
  return (
    <>
      {navigation.state === 'loading' && (
        <Box sx={{ display: 'flex', width:'100%', height:'100vh', backgroundColor:'black', justifyContent:'center', alignItems: 'center' }}>
          <CircularProgress sx={{ color:'white' }} size={50}/>
        </Box>
      )}
      {pathname === '/' ? <Navigate to={UserRoute.HOME_PATH}/> : <Outlet/> }
    </>
  )
}
