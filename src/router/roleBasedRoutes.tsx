import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { listAdminRoute, listUserRoute, listUserStandardRoute } from '../const/listRoutes'
import { rootAdminLoader, rootMemberLoader, rootUserLoader } from './roleLoader'


const AdminMainLayout = lazy(() => import('../layouts/admin_layout/AdminMainLayout'))
const UserMainLayout = lazy(() => import('../layouts/user_layout/UserMainLayout'))


export const adminRoutes: RouteObject = {
  path: 'admin',
  element: <AdminMainLayout />,
  loader: rootAdminLoader,
  children: listAdminRoute
}

export const userRoutes: RouteObject = {
  path: 'user',
  element: <UserMainLayout />,
  loader:rootUserLoader,
  children: listUserRoute
}

export const standardRoute: RouteObject = {
  path:'standard',
  loader: rootMemberLoader,
  children: listUserStandardRoute
}