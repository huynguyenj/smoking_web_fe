import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo/logo_smoking.png'
import { MuiIcon } from '../../components/muiIcon/MuiIcon.ts'
import { NavItems, SubItems } from '../../const/navbarItems.ts'
import { useTokenInfoStorage } from '../../store/authStore.ts'
import avatar from '../../assets/avatar.jpg'
import { PublicRoute } from '../../const/pathList.ts'
function Navbar() {
  const userInfo = useTokenInfoStorage(( state ) => state.userInfo)
  return (
    <div className="fixed top-0 bg-black-fig w-full rounded-4xl px-5 py-3 flex items-center justify-between mt-3">
      <Link to={'/user'}><img src={Logo} alt="logo_img" className='w-15 aspect-square' /></Link>
      <div className='ml-50'>
        <div className='text-white-fig flex gap-10 font-bold'>
          {NavItems.map((item) => (
            <Link to={item.path} key={item.name}>
              <p className='hover:text-green-fig cursor-pointer'>{item.name}</p>
            </Link>
          ))}
          <div className='relative flex items-center hover:text-green-fig group cursor-pointer'>
            <p>Feature</p>
            <span className='transform transition-transform duration-200 ease-in-out group-hover:rotate-180'>
              <MuiIcon.KeyboardArrowDown/>
            </span>
            <div className='absolute w-[15rem]  flex flex-col gap-3 top-8 bg-gray-fig p-5 rounded-2xl text-black-fig transform-[scale(0)] duration-300 ease-in-out transition-transform group-hover:transform-[scale(1)]'>
              {SubItems.map((item) => (
                <Link key={item.name} to={item.path}>
                  <p className='hover:bg-black-fig hover:text-white-fig rounded-2xl p-3 ease-in-out duration-300'>{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex gap-5 items-end'>
        {userInfo ?
          <>
            <img src={avatar} alt="avatar" className='w-12 aspect-square rounded-full' />
          </>
          :
          <>
            <Link to={PublicRoute.LOGIN_PATH} className='bg-blue-fig px-8 py-3 rounded-2xl text-white-fig hover:bg-blue-mid-light-fig cursor-pointer'>Login</Link>
            <Link to={PublicRoute.REGISTER_PATH} className='bg-green-fig px-8 py-3 rounded-2xl text-white-fig hover:bg-green-mid-light cursor-pointer'>Register</Link>
          </>
        }
      </div>
    </div>
  )
}

export default Navbar