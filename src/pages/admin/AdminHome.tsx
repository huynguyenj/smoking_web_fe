import BoxDashboard from '../../components/box/BoxDashboard'
import BarsDataset from '../../components/chart/Chart'
import { MuiIcon } from '../../components/muiIcon/MuiIcon'

export default function AdminDashboard() {
  const dataApi = [
    { month: 'Jan', user: 59, coach: 57, newYork: 86, seoul: 21 },
    { month: 'Feb', user: 50, coach: 52, newYork: 78, seoul: 28 },
    { month: 'Mar', user: 47, coach: 53, newYork: 106, seoul: 41 }
  ]

  const titleApi = ['user', 'coach', 'newYork', 'seoul']
  return (
    <div className='p-5'>
      <div className='flex justify-between gap-2 mb-10'>
        <BoxDashboard icon={MuiIcon.PersonIcon} title="Users" data="1000" />
        <BoxDashboard icon={MuiIcon.PersonIcon} title="Coachs" data="1000" />
        <BoxDashboard icon={MuiIcon.PersonIcon} title="Users" data="1000" />
      </div>
      <div className='border-[1px] border-black-fig bg-white-fig w-[100%] rounded-[20px] shadow-[10px_4px_0px_black] p-5'>
        <BarsDataset labels={titleApi} dataset={dataApi} />
      </div>
    </div>

  )
}
