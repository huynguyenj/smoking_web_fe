import { useEffect, useState } from 'react'
import type { PlanChartData } from '../../../model/api-chart/planChartType'
import privateApiService from '../../../services/ApiPrivate'
import { toast } from 'react-toastify'
import { BarChart, LineChart } from '@mui/x-charts'
import LoadingCircle from '../../../components/loading/LoadingCircle'
import { formDate } from '../../../utils/formDate'
import type { SpecificInStage } from '../../../model/user/planType'
import { formatCurrencyVND } from '../../../utils/formatCurrency'

export default function ChartProcessPlan({ planId, stageData }: { planId: string, stageData: SpecificInStage }) {
  const [chartData, setChartData] = useState<PlanChartData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchChartData = async () => {
    try {
      setIsLoading(true)
      const response = await privateApiService.getPlanProcessChartData(planId, stageData)
      setChartData(response.data)
    } catch (error) {
      toast.error(error as string)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchChartData()
  }, [])
  return (
    <>
      {isLoading ? <LoadingCircle/>
        :
        <>
          {chartData ?
            <>
              <div className='flex gap-5'>
                <BarChart
                  dataset={chartData.processPerStageData}
                  xAxis={[{ dataKey: 'create_date', valueFormatter: formDate, label: 'Date' }]}
                  series={[
                    { dataKey: 'money_consumption_per_day', label: 'Money spend', valueFormatter: formatCurrencyVND },
                    { dataKey: 'saving_money', label: 'Saving money', valueFormatter: formatCurrencyVND }
                  ]}
                />
                <LineChart
                  dataset={chartData.processPerStageData}
                  xAxis={[{ dataKey: 'create_date', valueFormatter: formDate, label: 'Date' }]}
                  series={[
                    { dataKey: 'smoking_frequency_per_day', label: 'Smoke frequency', area: true }
                  ]}

                />
              </div>
              <div className='rounded-2xl p-5 shadow-[0px_5px_10px_rgba(0,0,0,0.3)]'>
                <p className='text-center font-bold text-[1.1rem] mb-2'>Your current result</p>
                <div className='flex justify-center gap-5'>
                  <div className='w-75 h-20 bg-[#6643b5] text-[#a1aef7] font-bold rounded-2xl flex flex-col items-center justify-center'>
                    <p className='text-center'>Your money in all process</p>
                    <p className='text-center'>{formatCurrencyVND(chartData.result.totalMoney)}</p>
                  </div>
                  <div className='w-75 h-20 bg-[#e84a5f] text-[#fabcb8] font-bold rounded-2xl flex flex-col items-center justify-center'>
                    <p className='text-center'>Your total days in this plan</p>
                    <p className='text-center'>{chartData.result.totalDate} days</p>
                  </div>
                  <div className='w-75 h-20 bg-[#9cd3d3] text-[#eaffff] font-bold rounded-2xl flex flex-col items-center justify-center'>
                    <p className='text-center'>Your average cigarettes in all process</p>
                    <p className='text-center'>{chartData.result.averageCigarettesInTotal | 0}</p>
                  </div>
                </div>
                <div className='mt-5 text-center'>
                  <p className='font-bold text-[1.1rem]'>Comparison with expected result</p>
                  <p>{chartData.result.comparisonWithExpected.includes('NaN') ? 'No data' : chartData.result.comparisonWithExpected}</p>
                </div>
              </div>
            </>
            :
            <p>No data to show on chart</p>
          }
        </>
      }
    </>
  )
}
