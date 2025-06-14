import { Box, LinearProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import Logo from '../../assets/Logo/logo_smoking.png'
export default function LinearLoading() {
  const [progress, setProgress] = useState<number>(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress >= 100 ? 0 : prevProgress + 10)
    }, 400)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Box sx={{ display:'flex', flexDirection:'column', width: '100%', height:'100vh', margin:'auto', alignItems:'center', gap: 5, justifyContent:'center' }}>
      <img src={Logo} className='w-30 aspect-square'alt='Logo'/>
      <LinearProgress variant='determinate' value={progress} sx={{ width:'20rem', backgroundColor:'black', color:'white', height: 10 }} color='warning'/>
    </Box>
  )
}
