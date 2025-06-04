import { lazy } from 'react'
import type { RouteType } from '../model/routeType/routeType'

const AdminDashboard = lazy(() => import('../pages/admin/AdminHome'))
const MemberManagementPage = lazy(() => import('../pages/admin/MemberManagementPage'))
const RatingManagementPage = lazy(() => import('../pages/admin/RatingManagementPage'))
const UserManagementPage = lazy(() => import('../pages/admin/UserManagementPage'))
const BlogDetail = lazy(() => import('../pages/blog/BlogDetail'))
const BlogPage = lazy(() => import('../pages/blog/BlogPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const MemberPackage = lazy(() => import('../pages/MemberPackage'))
const LoginPage = lazy(() => import('../pages/user/Auth/Login'))
const SignupPage = lazy(() => import('../pages/user/Auth/Signup'))
const ChatPage = lazy(() => import('../pages/user/chat/ChatPage'))
const PaymentPage = lazy(() => import('../pages/payment/PaymentPage'))
const PlanDetailPage = lazy(() => import('../pages/user/plan/PlanDetailPage'))
const PlanPage = lazy(() => import('../pages/user/plan/PlanPage'))
const ProfilePage = lazy(() => import('../pages/user/ProfilePage'))
const RankingPage = lazy(() => import('../pages/user/RankingPage'))
const ProcessDetailPage = lazy(() => import('../pages/user/smokingQuitting/ProcessDetailPage'))
const ProcessQuitPage = lazy(() => import('../pages/user/smokingQuitting/ProcessQuitPage'))
const PaymentStatusPage = lazy(() => import('../pages/payment/PaymentStatusPage'))
const UserDashboardPage = lazy(() => import('../pages/user/UserDashboardPage'))
const ContactPage = lazy(() => import('../pages/user/ContactPage'))


export const UserRoute = {
  HOME_PATH: '/user/home',
  USER_DASHBOARD_PATH: '/user/user-dashboard',
  BLOGS_PATH: '/user/blogs',
  BLOG_DETAIL_PATH: '/user/blog-detail/:id',
  PLAN_PATH: '/user/plan',
  PLAN_DETAIL_PATH: '/user/plan-detail/:id',
  SMOKING_PROCESS_PAGE_PATH: '/user/smoking-quitting-process',
  SMOKING_PROCESS_DETAIL_PATH: '/user/smoking-quitting-process/:id',
  RANKING_PATH: '/user/ranking',
  PROFILE_PATH: '/user/profile',
  MEMBER_PACKAGE_PATH: '/user/member-package',
  CONTACT_PATH: '/user/contact'
}

export const AdminRoute = {
  ADMIN_DASHBOARD_PATH: '/admin/dashboard',
  RANTING_PATH: '/admin/rating',
  USER_MANAGEMENT_PATH: '/admin/user-management',
  MEMBER_MANAGEMENT_PATH: '/admin/member-management'
}


export const PublicRoute = {
  LOGIN_PATH: '/login',
  REGISTER_PATH: '/register',
  PAYMENT_PATH: '/payment',
  PAYMENT_STATUS_PATH: '/payment-status'
}

export const listAdminRoute: RouteType[] = [
  { path: 'dashboard', element:<AdminDashboard/> },
  { path: 'rating', element:<RatingManagementPage/> },
  { path: 'user-management', element:<UserManagementPage/> },
  { path: 'member-management', element:<MemberManagementPage/> }
]

export const listUserRoute: RouteType[] = [
  { path: 'user-dashboard', element:<UserDashboardPage/> },
  { path: 'blogs', element:<BlogPage/> },
  { path: 'blog-detail/:id', element:<BlogDetail/> },
  { path: 'plan', element:<PlanPage/> },
  { path: 'plan-detail/:id', element:<PlanDetailPage/> },
  { path: 'smoking-quitting-process', element:<ProcessQuitPage/> },
  { path: 'smoking-quitting-process/:id', element:<ProcessDetailPage/> },
  { path: 'ranking', element:<RankingPage/> },
  { path: 'profile', element:<ProfilePage/> },
  { path: 'member-package', element: <MemberPackage/> },
  { path: 'home', element: <HomePage/> },
  { path: 'contact', element: <ContactPage/> }
]

export const listUserPrimiumRoute: RouteType[] =[
  // For Premium Member
  { path: 'chat', element:<ChatPage/> }
]
export const publicRouteList:RouteType[] = [
  { path:'/login', element: <LoginPage/> },
  { path:'/register', element: <SignupPage/> },
  { path: '/payment', element: <PaymentPage/> },
  { path: '/payment-status', element: <PaymentStatusPage/> }
]