import type { RouteType } from '../model/routeType/routeType'
import AdminDashboard from '../pages/admin/AdminHome'
import MemberManagementPage from '../pages/admin/MemberManagementPage'
import RatingManagementPage from '../pages/admin/RatingManagementPage'
import UserManagementPage from '../pages/admin/UserManagementPage'
import BlogDetail from '../pages/blog/BlogDetail'
import BlogPage from '../pages/blog/BlogPage'
import HomePage from '../pages/HomePage'
import MemberPackage from '../pages/MemberPackage'
import LoginPage from '../pages/user/Auth/Login'
import SignupPage from '../pages/user/Auth/Signup'
import ChatPage from '../pages/user/ChatPage'
import PaymentPage from '../pages/payment/PaymentPage'
import PlanDetailPage from '../pages/user/plan/PlanDetailPage'
import PlanPage from '../pages/user/plan/PlanPage'
import ProfilePage from '../pages/user/ProfilePage'
import RankingPage from '../pages/user/RankingPage'
import ProcessDetailPage from '../pages/user/smokingQuitting/ProcessDetailPage'
import ProcessQuitPage from '../pages/user/smokingQuitting/ProcessQuitPage'
import PaymentStatusPage from '../pages/payment/PaymentStatusPage'
import UserDashboardPage from '../pages/user/UserDashboardPage'
import ContactPage from '../pages/user/ContactPage'

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
  { path: 'contact', element: <ContactPage/> },
  // For Premium Member
  { path: 'chat', element:<ChatPage/> }


]

export const publicRouteList:RouteType[] = [
  { path:'/login', element: <LoginPage/> },
  { path:'/register', element: <SignupPage/> },
  { path: '/payment', element: <PaymentPage/> },
  { path: '/payment-status', element: <PaymentStatusPage/> }
]