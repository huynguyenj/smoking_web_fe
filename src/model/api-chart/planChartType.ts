
export interface PlanChartPost {
      start_time: string,
      end_time: string,
      expected_result: number,
      isCompleted: boolean
}

type ProcessDataChart = {
   smoking_frequency_per_day: number,
   money_consumption_per_day: number,
   saving_money: number
}

export interface PlanChartData {
  processPerStageData: ProcessDataChart[]
  result: {
      totalMoney: number,
      totalDate: number,
      averageCigarettesInTotal: number,
      expected_result: number,
      comparisonWithExpected: string
  }
}