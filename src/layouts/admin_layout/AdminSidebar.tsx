import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/Logo/logo_smoking.png'
import { sideBarItems } from '../../const/navbarItems'
import { MuiIcon } from '../../components/muiIcon/MuiIcon'

export default function AdminSidebar() {
  const currentRoute = useLocation()
  return (
    <div className="flex flex-col gap-20 items-center bg-black-fig min-h-[100vh] py-5">
      <div className='text-white-fig font-bold flex items-center gap-5'>
        <div>
          <img src={Logo} alt="logo_website" className='w-15 aspect-square'/>
        </div>
        <p>Admin System</p>
      </div>
      <div className='text-white-fig'>
        {sideBarItems.map((item) => (
          <Link to={item.path} className={`font-bold flex items-center gap-3 text-[1.2em] mb-5 hover:bg-green-fig p-3 w-full rounded-2xl cursor-pointer duration-300 ease-in-out ${item.path === currentRoute.pathname ? 'bg-green-fig' : ''}`} key={item.name}>
            <div><item.icon/></div>
            <div>{item.name}</div>
          </Link>
        ))}
        <div>
          <button className='flex items-center gap-3 absolute bottom-50 text-[1.2rem] font-bold cursor-pointer hover:opacity-70' type='submit'>
            <MuiIcon.ExitToAppIcon/>Logout
          </button>
        </div>
      </div>
    </div>
  )
}