import Background1 from '../../../assets/Background/ChatGPT Image May 20, 2025, 08_03_44 PM.png'
import Logo from '../../../assets/Logo/logo_smoking.png'
import { Link } from 'react-router-dom'
import { UserRoute } from '../../../const/pathList'

const SignupPage = () => {
  return (
    <div>
      <div>
        <div className='w-20 h-[100px] ml-5'>
          <Link to={UserRoute.HOME_PATH}><img src={Logo} alt="logo" /></Link>
        </div>
        <div
          className='w-[70%] bg-cover bg-center m-auto px-10 py-10 border-2 border-black'
          style={{ backgroundImage: `url(${Background1})` }}
        >
          <div className='flex flex-col '>
            <h2 className='text-[2.5rem] font-bold w-50 ml-170'>Sign up</h2>
            <form className='flex flex-col'>
              <input
                type="text"
                placeholder='Email'
                className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-10 ml-140 pl-3'
              />
              <input
                type="password"
                placeholder='Password'
                className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-5 ml-140 pl-3'
              />

              {/* Giới tính */}
              <div className='flex items-center mt-5 ml-140'>
                <label className='mr-6 text-black'>
                  <input type="radio" name="gender" value="male" className="mr-1" />
                  Male
                </label>
                <label className='text-black'>
                  <input type="radio" name="gender" value="female" className="mr-1" />
                  Female
                </label>
              </div>
            </form>

            <div className='flex ml-10'>
              <h2 className='text-[1rem] font-bold pt-3 ml-140'>Already have an account?</h2>
              <Link to='/login' className='text-[1rem] font-bold pt-3 pl-2 text-cyan-500'>Sign in</Link>
            </div>
            <button className='bg-black w-[30%] h-[40px] rounded-[10px] mt-5 ml-140 text-white'>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
