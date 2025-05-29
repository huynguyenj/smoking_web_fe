import { BarChart } from '@mui/x-charts/BarChart'
import { axisClasses } from '@mui/x-charts/ChartsAxis'
import { valueFormatter } from './DataSet'

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)'
    }
  ],
  width: 1550,
  height: 525,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)'
    }
  }
}

export interface ChartProp {
  labels: string[];
  dataset: {
    [key: string]: string | number;
  }[];
}

export default function BarsDataset({ labels, dataset }: ChartProp) {
  const series = labels.map((label) => ({
    dataKey: label,
    label: label.charAt(0).toUpperCase() + label.slice(1),
    valueFormatter
  }))

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={series}
      {...chartSetting}
    />
  )
}
