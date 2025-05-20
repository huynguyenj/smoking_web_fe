import Background1 from '../../../assets/Background/ChatGPT Image May 20, 2025, 04_13_43 PM.png';
import Logo from '../../../assets/Logo/logo_smoking.png';
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div>
      <div>
        <div className='w-[100px] h-[100px] mt-10 ml-20'>
          <img src={Logo} alt="logo" />
        </div>
        <div className='w-[70%] h-[70vh] bg-cover bg-center ml-[15%] border-2 border-black' style={{backgroundImage: `url(${Background1})`}}>
          <div className='flex flex-col pt-16'>
            <h2 className='text-[3rem] font-bold pt-10 pl-68'>Login</h2>
            <form className='flex flex-col'>
              <input 
                type="text"
                placeholder='Email'
                className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-10 ml-35 pl-3'/>
                <input 
                type="text"
                placeholder='Password'
                className='bg-gray-200 w-[30%] h-[40px] rounded-[10px] mt-5 ml-35 pl-3'/>
            </form>
            <div className='flex ml-10'>
            <h2 className='text-[1rem] font-bold pt-10 pl-40'> Dont have an account?</h2>
            <Link to='/register' className='text-[1rem] font-bold pt-10 pl-2 text-cyan-500'>Sign up</Link>
            </div>
            <button className='bg-black w-[30%] h-[40px] rounded-[10px] mt-5 ml-35 text-white'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login