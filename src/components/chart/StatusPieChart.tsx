// import type { Plan } from '../../model/user/planType'

// type RawStage = Plan['process_stage'] // 'start' | 'process' | 'complete' | 'cancel'

// const StatusPieChart = ({ status }: { status: RawStage }) => {
//   let percent = 0
//   let label = ''
//   let color = ''
//   let isCancelled = false

//   switch (status) {
//   case 'start':
//     percent = 0
//     label = 'Chưa bắt đầu'
//     color = '#9CA3AF'
//     break
//   case 'process':
//     percent = 50
//     label = 'Đang thực hiện'
//     color = '#FBBF24'
//     break
//   case 'finish':
//     percent = 100
//     label = 'Hoàn thành'
//     color = '#10B981'
//     break
//   case 'cancel':
//     percent = 100
//     label = 'Đã huỷ'
//     color = '#EF4444'
//     isCancelled = true
//     break
//   default:
//     label = 'Không xác định'
//     color = '#6B7280'
//     percent = 0
//   }

//   const r = 60
//   const c = 2 * Math.PI * r
//   const offset = c - (percent / 100) * c

//   return (
//     <div className="flex flex-col items-center">
//       <svg width="150" height="150">
//         <circle cx="75" cy="75" r={r} stroke="#E5E7EB" strokeWidth="12" fill="none" />
//         <circle
//           cx="75"
//           cy="75"
//           r={r}
//           stroke={color}
//           strokeWidth="12"
//           fill="none"
//           strokeDasharray={c}
//           strokeDashoffset={offset}
//           strokeLinecap="round"
//           transform="rotate(-90 75 75)"
//         />
//         <text
//           x="50%"
//           y="50%"
//           dominantBaseline="middle"
//           textAnchor="middle"
//           className="text-lg font-bold fill-gray-800"
//         >
//           {percent}%
//         </text>
//       </svg>

//       {isCancelled ? (
//         <p className="mt-3 text-base font-semibold text-red-600">⛔ cancelled</p>
//       ) : (
//         <p className="mt-3 text-base font-medium text-gray-700">{label}</p>
//       )}
//     </div>
//   )
// }

// export default StatusPieChart
