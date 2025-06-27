import { createBrowserRouter } from 'react-router-dom'
import LoadingLayout from '../layouts/LoadingLayout'
import { adminRoutes, standardRoute, userRoutes } from './roleBasedRoutes'
import { authRouteList, publicRouteList } from '../const/listRoutes'
import UserMainLayout from '../layouts/user_layout/UserMainLayout'
import { rootLoader } from './rootLoader'

export const router = createBrowserRouter([
  {
    path:'/',
    element:<LoadingLayout/>,
    loader:rootLoader,
    children:[
      adminRoutes,
      userRoutes,
      standardRoute
    ]
  },
  {
    element: <UserMainLayout/>,
    children:[
      ...publicRouteList
    ]
  },
  ...authRouteList
])