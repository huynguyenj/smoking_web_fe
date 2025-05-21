import { createBrowserRouter } from 'react-router-dom'
import LoadingLayout from '../layouts/LoadingLayout'
import { rootLoader } from './rootLoader'
import { adminRoutes, userRoutes } from './roleBasedRoutes'
import { publicRouteList } from '../const/listRoutes'

export const router = createBrowserRouter([
  {
    path:'/',
    element:<LoadingLayout/>,
    loader:rootLoader,
    children:[
      adminRoutes,
      userRoutes
    ]
  },
  ...publicRouteList
])