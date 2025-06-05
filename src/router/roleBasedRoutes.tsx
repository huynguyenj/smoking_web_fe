import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { listAdminRoute, listUserRoute } from '../const/listRoutes'

const AdminMainLayout = lazy(() => import('../layouts/admin_layout/AdminMainLayout'))
const UserMainLayout = lazy(() => import('../layouts/user_layout/UserMainLayout'))
const ChatPage = lazy(() => import('../pages/user/chat/ChatPage'))


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

export const chatRoute: RouteObject = {
  path:'chat',
  element: <ChatPage/>
}