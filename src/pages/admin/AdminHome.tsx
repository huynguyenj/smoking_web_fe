import { useEffect, useState } from 'react'
import BoxDashboard from '../../components/box/BoxDashboard'
import BarsDataset from '../../components/chart/Chart'
import { MuiIcon } from '../../components/muiIcon/MuiIcon'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function AdminDashboard() {
  const [users, setUsers] = useState<number>(0)
  const [payments, setPayments] = useState<number>(0)
  const [revenue, setRevenue] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
  const [chartData, setChartData] = useState<number>(0)


  useEffect(() => {
    getUser()
    getPayments()
    getRevenue()
  }, [])

  const getUser = async () => {
    try {
      const response = await ApiAdminPrivate.getTotalUsers()
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const getPayments = async () => {
    try {
      const response = await ApiAdminPrivate.getTotalPayments()
      setPayments(response.data)
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  const getRevenue = async () => {
    try {
      const response = await ApiAdminPrivate.getTotalRevenue()
      setRevenue(response.data)
    } catch (error) {
      console.error('Error fetching revenue:', error)
    }
  }

  const handleDateChange = async (newValue: Dayjs | null) => {
    setSelectedDate(newValue)

    if (newValue) {
      const month = newValue?.month() + 1 // dayjs month: 0-11
      const year = newValue.year()
      try {
        const response = await ApiAdminPrivate.getUserChart({ month, year })
        setChartData(response.data)
        console.log('API called with:', { month, year })
      } catch (error) {
        console.error('Failed to fetch chart data:', error)
      }
    }
  }

  const dataApi = [
    { month: selectedDate?.format('MMMM') || '', user: chartData }
  ]

  const titleApi = ['user']
  return (
    <div className='p-5'>
      <div className='flex justify-between gap-2 mb-10'>
        {/* {boxDataAPI.map((box, index) => (
          <BoxDashboard key={index} icon={box.icon} title={box.title} data={box.data} />
        ))} */}
        <BoxDashboard icon={MuiIcon.PersonIcon} title="Users" data={users} />
        <BoxDashboard icon={MuiIcon.PersonIcon} title="Payments" data={payments} />
        <BoxDashboard icon={MuiIcon.PersonIcon} title="Revenue" data={revenue.toLocaleString()} />
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={'Choose Month and Year'}
          views={['month', 'year']}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <div className='border-[1px] mt-3 border-black-fig bg-white-fig w-[45%] rounded-[20px] shadow-[10px_4px_0px_black] p-5'>
        <BarsDataset labels={titleApi} dataset={dataApi} />
      </div>
    </div>

  )
}
