interface Props {
  status: 'not_started' | 'in_progress' | 'completed'
}

const StatusPieChart = ({ status }: Props) => {
  let percent = 0
  let label = ''
  let color = ''

  switch (status) {
  case 'not_started':
    percent = 0
    label = 'Chưa bắt đầu'
    color = '#9CA3AF'
    break
  case 'in_progress':
    percent = 50
    label = 'Đang thực hiện'
    color = '#FBBF24'
    break
  case 'completed':
    percent = 100
    label = 'Hoàn thành'
    color = '#10B981'
    break
  }

  const r = 60 // ✅ Tăng bán kính
  const c = 2 * Math.PI * r
  const offset = c - (percent / 100) * c

  return (
    <div className="flex flex-col items-center">
      <svg width="150" height="150"> {/* ✅ Tăng kích thước SVG */}
        <circle cx="75" cy="75" r={r} stroke="#E5E7EB" strokeWidth="12" fill="none" />
        <circle
          cx="75"
          cy="75"
          r={r}
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 75 75)"
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-lg font-bold fill-gray-800"
        >
          {percent}%
        </text>
      </svg>
      <p className="mt-3 text-base font-medium text-gray-700">{label}</p>
    </div>
  )
}


export default StatusPieChart
