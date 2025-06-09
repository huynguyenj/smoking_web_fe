import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Background1 from '../../../assets/Background/ChatGPT Image May 20, 2025, 04_13_43 PM.png'
import Logo from '../../../assets/Logo/logo_smoking.png'
import { UserRoute } from '../../../const/listRoutes'
import type { LoginType } from '../../../model/authModel/authDataType'
import useLoginHook from '../../../hooks/auth/useLoginHook'
import CircularProgress from '@mui/material/CircularProgress'
const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<LoginType>({})
  const { handleLogin, isLoading } = useLoginHook()
  const validate = () => {
    const newErrors: LoginType = {}
    if (!email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format'

    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      handleLogin(email, password)
    }
  }

  return (
    <div>
      <div>
        <div className='w-[100px] h-[100px] mt-10 ml-20'>
          <Link to={UserRoute.HOME_PATH}><img src={Logo} alt="logo" /></Link>
        </div>
        <div className='w-[70%] h-[70vh] bg-cover bg-center ml-[15%] border-2 border-black' style={{ backgroundImage: `url(${Background1})` }}>
          <form onSubmit={handleSubmit} className='flex flex-col pt-16'>
            <h2 className='text-[3rem] font-bold pt-10 pl-68'>Login</h2>

            <input
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-10 ml-35 pl-3'
            />
            {errors.email && <span className='text-red-500 text-sm ml-35 mt-1'>{errors.email}</span>}

            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-5 ml-35 pl-3'
            />
            {errors.password && <span className='text-red-500 text-sm ml-35 mt-1'>{errors.password}</span>}

            <div className='flex ml-10'>
              <h2 className='text-[1rem] font-bold pt-10 pl-40'> Don't have an account?</h2>
              <Link to='/register' className='text-[1rem] font-bold pt-10 pl-2 text-cyan-500'>Sign up</Link>
            </div>

            <button
              type="submit"
              className='bg-black w-[30%] h-[40px] rounded-[10px] mt-5 ml-35 text-white flex items-center justify-center'
              disabled={isLoading}
            >
              { isLoading ? <CircularProgress size={25} sx={{ color: 'white' }}/> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
