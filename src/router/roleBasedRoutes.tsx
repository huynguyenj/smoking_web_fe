import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { listAdminRoute, listUserRoute } from '../const/listRoutes'
import UserMainLayout from '../layouts/user_layout/UserMainLayout'

const AdminMainLayout = lazy(() => import('../layouts/admin_layout/AdminMainLayout'))

export const adminRoutes: RouteObject = {
  path: 'admin',
  element: <AdminMainLayout />,
  children: listAdminRoute
}

export const userRoutes: RouteObject = {
  path: 'user',
  element: <UserMainLayout />,
  children: listUserRoute
}