import { useEffect, useState } from 'react'
import BoxDashboard from '../../components/box/BoxDashboard'
import BarsDataset from '../../components/chart/Chart'
import { MuiIcon } from '../../components/muiIcon/MuiIcon'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import RevenueChart from '../../components/chart/RevenueChart'
import type { RevenueChartInfo } from '../../model/revenueChart/revenueType'
import { formatCurrencyVND } from '../../utils/formatCurrency'

export default function AdminDashboard() {
  const [users, setUsers] = useState<number>(0)
  const [payments, setPayments] = useState<number>(0)
  const [revenue, setRevenue] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
  const [chartData, setChartData] = useState<number>(0)
  const [revenueChart, setRevenueChart] = useState<RevenueChartInfo[]>([])
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(dayjs())

  useEffect(() => {
    getUser()
    getPayments()
    getRevenue()
    setSelectedYear(dayjs())
    fetchInitialDataRevenue()
    fetchInitialDataUser()
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

  const fetchInitialDataUser = async () => {
    try {
      const currentMonth = dayjs().month()
      const currentYear = dayjs().year()
      const response = await ApiAdminPrivate.getUserChart({
        month: currentMonth,
        year: currentYear
      })
      setChartData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchInitialDataRevenue = async () => {
    try {
      const currentYear = dayjs().year()
      const response = await ApiAdminPrivate.getRevenueChart({ year: currentYear })
      const data = response.data.map((item: { month: string, revenue: number }) => ({
        month: dayjs().month(parseInt(item.month) - 1).format('MMM'),
        revenue: item.revenue
      }))
      setRevenueChart(data)
      setSelectedYear(dayjs())
    } catch (error) {
      console.error('Failed to fetch revenue data:', error)
    }
  }

  const handleYearChange = async (newValue: Dayjs | null) => {
    setSelectedYear(newValue)
    if (newValue) {
      const year = newValue.year()
      try {
        const response = await ApiAdminPrivate.getRevenueChart({ year })
        const data = response.data.map((item: { month: string, revenue: number }) => ({
          month: dayjs().month(parseInt(item.month) - 1).format('MMM'),
          revenue: item.revenue
        }))
        setRevenueChart(data)
      } catch (error) {
        console.log(error)
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
        <BoxDashboard icon={MuiIcon.Payments} title="Payments" data={payments} />
        <BoxDashboard icon={MuiIcon.Revenue} title="Revenue" data={formatCurrencyVND(revenue)} />
      </div>
      <div className='flex gap-10'>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={'Choose Month and Year'}
              views={['month', 'year']}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <div className='border-[1px] mt-3 border-black-fig bg-white-fig w-[90%] rounded-[20px] shadow-[10px_4px_0px_black] p-5'>
            <BarsDataset labels={titleApi} dataset={dataApi} />
          </div>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={'Choose Year'}
              views={['year']}
              value={selectedYear}
              onChange={handleYearChange}
            />
          </LocalizationProvider>
          <div className='border-[1px] mt-3 border-black-fig bg-white-fig w-[120%] rounded-[20px] shadow-[10px_4px_0px_black] p-5'>
            <RevenueChart dataset={revenueChart} />
          </div>
        </div>
      </div>
    </div>

  )
}
