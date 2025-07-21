import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { useEffect, useState } from 'react'
import { MuiIcon } from '../../components/muiIcon/MuiIcon'
const listTitle: string[] = [
  'Dashboard',
  'User-Management',
  'Rating',
  'Member-Management',
  'Rank-Management',
  'Announcement-Management',
  'Coach-Management'
]
export default function AdminMainLayout() {
  const { pathname } = useLocation()
  const [title, setTitle] = useState<string>()
  useEffect(() => {
    const pathnameConvertToStringArr = pathname.split('/')
    const currentPath = pathnameConvertToStringArr[pathnameConvertToStringArr.length-1]
    const titleForCurrenRoute = listTitle.find((title) => title.toLowerCase() === currentPath )
    setTitle(titleForCurrenRoute)
  }, [pathname])
  return (
    <div className='flex'>
      <aside className='w-[20%]'>
        <AdminSidebar/>
      </aside>
      <main className='w-[80%]'>
        <nav className='flex font-bold mb-5 p-5 justify-between'>
          <h1 className='text-[1.8rem]'>
            {title}
          </h1>
          <div className='flex items-center gap-8 text-[1.5rem]'>
            <div className='flex items-center gap-2'>
              <MuiIcon.PersonIcon sx={{ fontSize:'2.5rem' }}/>
              <p>Admin</p>
            </div>
            <div className='relative cursor-pointer'>
              <MuiIcon.NotificationsIcon sx={{ fontSize:'2.7rem' }} />
              <div className='absolute top-0  right-0 text-white-fig bg-red-500 rounded-full w-fit px-[0.2rem] flex items-center justify-center aspect-square text-[0.8rem]'>12</div>
            </div>
          </div>
        </nav>
        <Outlet/>
      </main>
    </div>
  )
}