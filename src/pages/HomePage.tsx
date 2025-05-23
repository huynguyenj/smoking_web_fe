import Background3 from '../assets/Background/stop-smoking.jpg'
import Background4 from '../assets/Background/Rectangle 8.png'
import EastIcon from '@mui/icons-material/East'
import Background5 from '../assets/Background/Rectangle 11.png'
import Background6 from '../assets/Background/3d-illustration-pen-putting-blue-ticks-paper.jpg'
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import FeedIcon from '@mui/icons-material/Feed'
import Diversity2Icon from '@mui/icons-material/Diversity2';
export default function HomePage() {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex w-full h-[70vh] bg-black-fig rounded-3xl justify-center gap-12">
        <div className="w-1/2 h-[80%] bg-white-fig rounded-3xl mt-15 ml-12">
          <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-[5rem] font-bold text-black-fig mt-20">Smoking Prevent</h1>
            <p className="text-[1.8rem] font-light text-gray-400 text-center mt-10 mx-30">
              We’re here to help you quit smoking with trusted advice, helpful tools, and real support—because a healthier, smoke-free life starts with one small step.
            </p>
          </div>
        </div>
        <div className="w-1/2 h-[90%] bg-black-fig rounded-full mb-13 flex justify-center items-center">
          <div className='flex justify-center items-center'>
            <img src={Background3} alt="background" className="w-[60%] h-[60%] rounded-full" />
          </div>
        </div>
      </div>
      <div className="h-[90%] mb-13 flex justify-center items-center mt-15">
        <div className="w-1/2 h-[90%] flex justify-center items-center">
          <div className='flex justify-center items-center ml-12'>
            <img src={Background4} alt="background" className="bg-black-fig w-full h-[60%] rounded-xl" />
          </div>
        </div>
        <div className='w-1/2 h-[90%] flex flex-col items-center'>
          <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-[4.4rem] font-bold text-black-fig mx-30">Chat System</h1>
            <p className="text-[1.8rem] font-semi-bold text-black-fig text-center mt-5 mx-70 text-left">
              You can chat directly with your coach to receive advices, method to improve yourself
            </p>
          </div>
          <button className='bg-black-fig px-8 py-3 rounded-2xl text-white-fig hover:bg-white-fig hover:text-black-fig border-2 border-black-fig cursor-pointer mt-10 mr-62 flex items-center gap-2'>Explore<EastIcon /></button>
        </div>
      </div>
      <div className="flex flex-col w-full h-[80vh] bg-black-fig rounded-3xl justify-center items-center gap-12" >
        <div>
          <h1 className="text-[3rem] font-bold text-white-fig">Ranking System</h1>
        </div>
        <div>
          <img src={Background5} alt="" />
        </div>
        <div>
          <h1 className="text-[3rem] font-semi-bold text-white-fig text-center">This is a special feature allow you to get points during smoking cessation process and ranking by your points.</h1>
        </div>
        <div>
          <button className='bg-white-fig px-8 py-3 rounded-2xl text-black-fig hover:bg-black-fig hover:border-white-fig hover:text-white-fig border-2 border-black-fig cursor-pointer flex items-center gap-2'>See more<EastIcon /></button>
        </div>
      </div>
      <div className="h-[90%] mb-13 flex justify-center items-center mt-15">
        <div className='w-1/2 h-[90%] flex flex-col items-center'>
          <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-[4.4rem] font-bold text-black-fig mx-30">Plan feature</h1>
            <p className="text-[1.8rem] font-semi-bold text-black-fig text-center mt-5 mx-70 text-left">
              Allow you to make a plain to help you quit smoking and also have several advices from system
            </p>
          </div>
          <button className='bg-black-fig px-8 py-3 rounded-2xl text-white-fig hover:bg-white-fig hover:text-black-fig border-2 border-black-fig cursor-pointer mt-10 mr-62 flex items-center gap-2'>Explore<EastIcon /></button>
        </div>
        <div className="w-1/2 h-[90%] flex justify-center items-center">
          <div className='flex justify-center items-center ml-12'>
            <img src={Background6} alt="background" className="bg-black-fig w-[90%] h-[60%]" />
          </div>
        </div>
      </div>
      <div className='h-[70vh] w-full flex flex-col'>
        <div className='flex flex-col items-center mt-10 mb-10'>
          <h1 className='text-[4rem] font-bold mt-10'>We ensure you the best experience</h1>
        </div>
        <div className='flex justify-center items-center mt-20 gap-30'>
          <div className='flex flex-col items-center'>
            <div className='scale-400'><PriceChangeIcon /></div>
            <div className='mt-15 font-bold'>Good price</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='scale-400'><MedicalServicesIcon /></div>
            <div className='mt-15 font-bold'>Personalized Treatment</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='scale-400'><Diversity2Icon /></div>
            <div className='mt-15 font-bold'>Experience coach</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='scale-400'><EventAvailableIcon /></div>
            <div className='mt-15 font-bold'>Planning process</div>
          </div>
          <div className='flex flex-col items-center'>
            <div className='scale-400'><FeedIcon /></div>
            <div className='mt-15 font-bold'>Blog</div>
          </div>
        </div>
      </div>
    </div>
  )
}
