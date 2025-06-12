import Background1 from '../../../assets/Background/ChatGPT Image May 20, 2025, 08_03_44 PM.png'
import Logo from '../../../assets/Logo/logo_smoking.png'
import { Link } from 'react-router-dom'
import { UserRoute } from '../../../const/pathList'

const SignupPage = () => {
  return (
    <div>
      <div>
        <div className='w-[100px] h-[100px] mt-10 ml-20'>
          <Link to={UserRoute.HOME_PATH}><img src={Logo} alt="logo" /></Link>
        </div>
        <div
          className='w-[70%] h-[70vh] bg-cover bg-center ml-[15%] border-2 border-black'
          style={{ backgroundImage: `url(${Background1})` }}
        >
          <div className='flex flex-col pt-16'>
            <h2 className='text-[3rem] font-bold pt-10 pl-220'>Sign up</h2>
            <form className='flex flex-col'>
              <input
                type="text"
                placeholder='Email'
                className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-10 ml-190 pl-3'
              />
              <input
                type="password"
                placeholder='Password'
                className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-5 ml-190 pl-3'
              />

              {/* Giới tính */}
              <div className='flex items-center mt-5 ml-190'>
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
              <h2 className='text-[1rem] font-bold pt-3 ml-195'>Already have an account?</h2>
              <Link to='/login' className='text-[1rem] font-bold pt-3 pl-2 text-cyan-500'>Sign in</Link>
            </div>
            <button className='bg-black w-[30%] h-[40px] rounded-[10px] mt-5 ml-190 text-white'>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
