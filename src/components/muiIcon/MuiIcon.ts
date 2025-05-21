import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import HomeIcon from '@mui/icons-material/Home'
import GradeIcon from '@mui/icons-material/Grade'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import DiamondIcon from '@mui/icons-material/Diamond'
import type { SvgIconProps } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import type React from 'react'

export const MuiIcon = {
  KeyboardArrowDown: KeyboardArrowDownIcon,
  HomeIcon: HomeIcon,
  GradeStartIcon: GradeIcon,
  PermIdentityIcon: PermIdentityIcon,
  DiamondIcon: DiamondIcon,
  ExitToAppIcon: ExitToAppIcon,
  PersonIcon:PersonIcon,
  NotificationsIcon: NotificationsIcon
} satisfies Record<string, React.ElementType<SvgIconProps>>