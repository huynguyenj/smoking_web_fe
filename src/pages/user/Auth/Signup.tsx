// import Background1 from '../../../assets/Background/ChatGPT Image May 20, 2025, 08_03_44 PM.png'
import Logo from '../../../assets/Logo/logo_smoking.png'
import { Link } from 'react-router-dom'
import { UserRoute } from '../../../const/pathList'
import { useState, type FormEvent } from 'react'
import type { RegisterType } from '../../../model/authModel/authDataType'
import useRegister from '../../../hooks/auth/useRegister'
import LoadingScreenBg from '../../../components/loading/LoadingScreenBg'
type ErrorObj = {
  user_name?: string,
  password?: string,
  full_name?: string,
  email?: string
}
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const SignupPage = () => {
  const [error, setErrors] = useState<ErrorObj>()
  const { handleRegister, isLoading } = useRegister()
  const validate = (value: FormData) => {
    const newError: ErrorObj = {}
    if (!value.get('password') || !PASSWORD_REGEX.test(value.get('password') as string)) {
      newError.password = 'Password is required and must have at least 8 characters, made up of non-whitespace characters only, which includes letters, digits, and symbols'
    }
    if (!value.get('user_name')) {
      newError.user_name = 'Username is required'
    }
    if (!value.get('full_name')) {
      newError.full_name = 'Fullname is required'
    }
    if (!value.get('email') || !EMAIL_REGEX.test(value.get('email') as string)) {
      newError.email = 'Email is required and must in the right type of email'
    }
    setErrors(newError)
    return Object.keys(newError).length > 0
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    if (validate(form)) {
      const data: RegisterType = {
        email: form.get('email') as string,
        password: form.get('password') as string,
        full_name: form.get('full_name') as string,
        user_name: form.get('user_name') as string
      }
      handleRegister(data)
    }
  }

  if (isLoading) return <LoadingScreenBg/>
  return (
    <div>
      <div>
        <div className='w-20 h-[100px] ml-5'>
          <Link to={UserRoute.HOME_PATH}><img src={Logo} alt="logo" /></Link>
        </div>
        <div
          className='w-[70%] bg-cover bg-center m-auto px-10 py-5 mb-10 border-2 border-black'
        >
          <div className='flex flex-col'>
            <h2 className='text-[2.5rem] font-bold text-center mb-10'>Sign up</h2>
            <div className='flex gap-10'>
              <div className='w-[50%] relative '>
                <div className='absolute right-20 w-60 h-60 rounded-full bg-black-fig'></div>
                <div className='absolute left-20 rotate-45 w-60 h-60 rounded-full bg-black-fig'></div>
                <div className='absolute bottom-0 left-30 w-80 h-80 rounded-full bg-black-fig'></div>
              </div>
              <form onSubmit={handleSubmit} className='flex flex-col w-full items-center gap-5 z-10 '>
                <input
                  type="text"
                  placeholder='Email'
                  name='email'
                  className='bg-gray-200 w-full h-[40px] rounded-[10px] px-5'
                />
                {error?.email ? <p className='text-red-400 w-full bg-[#ffebeb] px-5 py-2'>{error.email}</p> : <></>}
                <input
                  type="password"
                  placeholder='Password'
                  name='password'
                  className='bg-gray-200 w-full h-[40px] rounded-[10px] px-3'
                />
                {error?.password ? <p className='text-red-400 w-full bg-[#ffebeb] px-5 py-2'>{error.password}</p> : <></>}
                <input
                  type="text"
                  placeholder='Username'
                  name='user_name'
                  className='bg-gray-200 w-full h-[40px] rounded-[10px] px-3'
                />
                {error?.user_name ? <p className='text-red-400 w-full bg-[#ffebeb] px-5 py-2'>{error.user_name}</p> : <></>}

                <input
                  type="Fullname"
                  placeholder='Fullname'
                  name='full_name'
                  className='bg-gray-200 w-full h-[40px] rounded-[10px] px-3'
                />
                {error?.full_name ? <p className='text-red-400 w-full bg-[#ffebeb] px-5 py-2'>{error.full_name}</p> : <></>}


                {/* Giới tính */}
                {/* <div className='flex items-center mt-5 mx-auto '>
                <label className='mr-6 text-black'>
                  <input type="radio" name="gender" value="male" className="mr-1" />
                  Male
                </label>
                <label className='text-black'>
                  <input type="radio" name="gender" value="female" className="mr-1" />
                  Female
                </label>
              </div> */}
                <div className='flex mx-auto'>
                  <h2 className='text-[1rem] font-bold pt-3'>Already have an account?</h2>
                  <Link to='/login' className='text-[1rem] font-bold pt-3 pl-2 text-cyan-500'>Sign in</Link>
                </div>
                <button type='submit' className='bg-black mx-auto w-50 h-[40px] rounded-[10px] mt-5 text-white'>
                  Sign up
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
