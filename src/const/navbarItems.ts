import type { SvgIconProps } from '@mui/material'
import type React from 'react'
import { MuiIcon } from '../components/muiIcon/MuiIcon'
import { AdminRoute, UserRoute } from './listRoutes'
type NavbarType = {
  name: string,
  path: string
}

export const NavItems:NavbarType[] = [
  { name: 'Home', path:UserRoute.HOME_PATH },
  { name: 'Blogs', path:UserRoute.BLOGS_PATH },
  { name: 'Contact', path:UserRoute.CONTACT_PATH },
  { name: 'Member', path:UserRoute.MEMBER_PACKAGE_PATH }
]
export const SubItems:NavbarType[] = [
  { name: 'Ranking', path:UserRoute.RANKING_PATH },
  { name: 'Planning', path:UserRoute.PLAN_PATH }
]
type SidebarType = {
  name: string,
  icon: React.ElementType<SvgIconProps>,
  path: string
}

export const sideBarItems:SidebarType[] = [
  { name: 'Dashboard', icon:MuiIcon.HomeIcon, path:AdminRoute.ADMIN_DASHBOARD_PATH },
  { name: 'User Management', icon:MuiIcon.PermIdentityIcon, path:AdminRoute.USER_MANAGEMENT_PATH },
  { name: 'Rating-Feedback', icon:MuiIcon.GradeStartIcon, path:AdminRoute.RANTING_PATH },
  { name: 'Member Package', icon:MuiIcon.DiamondIcon, path:AdminRoute.MEMBER_MANAGEMENT_PATH }

]