import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'
import type { RevenueChartInfo } from '../../model/revenueChart/revenueType'
import { useMemo } from 'react'
import dayjs from 'dayjs'

export interface ChartProp {
  dataset: RevenueChartInfo[]
}
function RevenueChart({ dataset }: ChartProp) {
  function valueFormatter(value: number | null) {
    return `${value?.toLocaleString()} VND`
  }
  const fullDataset = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: dayjs().month(i).format('MMM'),
      revenue: 0
    }))

    // Gộp dữ liệu từ API vào tháng tương ứng
    const mapFromAPI = new Map(dataset.map(d => [d.month, d.revenue]))

    return months.map(m => ({
      month: m.month,
      revenue: mapFromAPI.get(m.month) ?? 0
    }))
  }, [dataset])

  const chartSetting = {
    yAxis: [
      {
        label: 'Revenue (VND)'
      }
    ],
    width: 500,
    height: 205,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)'
      }
    }
  }

  return (
    <BarChart
      dataset={fullDataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'revenue', label: 'Revenue', valueFormatter }]}
      {...chartSetting}
    />
  )
}

export default RevenueChart