import MailIcon from '@mui/icons-material/Mail'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import Logo from '../../assets/Logo/logo_smoking.png'
function Footer() {
  return (
    <div className="bottom-0 bg-black-fig p-5 w-full ">
      <div className="text-white-fig flex justify-between items-center gap-0">
        <div className='flex justify-between items-center gap-10 ml-35'>
          <div className='w-20'><img src={Logo} alt="logo" /></div>
          <div className='text-[0.7rem]'>
            <p>For a Smoking Healthcare Website</p>
            <p>1. "Your journey to a smoke-free life starts here."</p>
            <p>2. "Helping you breathe easier-every step of the way."</p>
            <p>3. "Committed to a healthier, smoke-free future."</p>
            <p>4. "Support. Guidance. Change. One breath at a time."</p>
            <p>5. "Because your health is worth it."</p>
            <p>6. "Empowering you to quit-for good."</p>
            <p>7. "Together, we can break the habit."</p>
          </div>
        </div>

        <div className='mr-65'>
          <p className='text-[1.5rem] text-center'>Contact</p>
          <div className='flex justify-between items-center gap-6'>
            <div><MailIcon /></div>
            <div><TwitterIcon /></div>
            <div><FacebookIcon /></div>
          </div>
        </div>
      </div>

      <div className="text-white-fig text-center text-[0.7rem] mt-5">&copy;2025 SmokeFreeLife. All rights reserved.</div>
    </div>
  )
}

export default Footer