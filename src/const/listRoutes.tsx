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
const ErrorPage = lazy(() => import('../pages/ErrorPage'))
const RankPage = lazy(() => import('../pages/admin/RankPage'))
const AnnouncementPage = lazy(() => import('../pages/admin/AnnouncementPage'))
const FeedbackPage = lazy(() => import('../pages/user/FeedbackPage'))
const InitialState = lazy(() => import('../pages/user/inititalState/InitialState'))
const InitialStateDetail = lazy(() => import('../pages/user/inititalState/InitialStateDetail'))
const CoachManagementPage = lazy(() => import('../pages/admin/CoachManagementPage'))
export const listAdminRoute: RouteType[] = [
  { path: 'dashboard', element:<AdminDashboard/> },
  { path: 'rating', element:<RatingManagementPage/> },
  { path: 'user-management', element:<UserManagementPage/> },
  { path: 'member-management', element:<MemberManagementPage/> },
  { path: 'rank-management', element: <RankPage/> },
  { path: 'announcement-management', element: <AnnouncementPage/> },
  { path: 'coach-management', element: <CoachManagementPage/> }
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
  { path: 'state', element: <InitialState/> },
  { path: 'state/:id', element: <InitialStateDetail/> },
  { path: 'feedback', element: <FeedbackPage/> }
]

// export const listUserPremiumRoute: RouteType[] =[
//   // For Premium Member
//   { path: '', element:<ChatPage/> }
// ]

export const listUserStandardRoute: RouteType[] =[
  // For Premium Member
  { path: 'chat', element:<ChatPage/> }
]
export const publicRouteList:RouteType[] = [
  { path: '/payment', element: <PaymentPage/> },
  { path: '/payment-status', element: <PaymentStatusPage/> },
  { path: '/error', element: <ErrorPage/> },
  { path: '/user/home', element: <HomePage/> },
  { path: '/user/contact', element: <ContactPage/> }

]

export const authRouteList: RouteType[] =[
  { path:'/login', element: <LoginPage/> },
  { path:'/register', element: <SignupPage/> }
]