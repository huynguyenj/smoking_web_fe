import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import HomeIcon from '@mui/icons-material/Home'
import GradeIcon from '@mui/icons-material/Grade'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import DiamondIcon from '@mui/icons-material/Diamond'
import type { SvgIconProps } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import type React from 'react'
import PaymentsIcon from '@mui/icons-material/Payments'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

export const MuiIcon = {
  MenuOpenIcon: MenuOpenIcon,
  MenuIcon: MenuIcon,
  KeyboardArrowDown: KeyboardArrowDownIcon,
  HomeIcon: HomeIcon,
  GradeStartIcon: GradeIcon,
  PermIdentityIcon: PermIdentityIcon,
  DiamondIcon: DiamondIcon,
  ExitToAppIcon: ExitToAppIcon,
  PersonIcon:PersonIcon,
  NotificationsIcon: NotificationsIcon,
  Payments: PaymentsIcon,
  Revenue: AttachMoneyIcon
} satisfies Record<string, React.ElementType<SvgIconProps>>