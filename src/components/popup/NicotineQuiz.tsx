import { useState } from 'react'

interface Props {
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (totalScore: number, averageScore10: number) => void
}

const questions = [
  'Bạn hút điếu đầu tiên sau khi thức dậy trong bao lâu?',
  'Bạn có hút thuốc khi đang bệnh, phải nằm giường không?',
  'Điếu thuốc nào khó bỏ nhất trong ngày?',
  'Trung bình bạn hút bao nhiêu điếu mỗi ngày?',
  'Bạn hút nhiều hơn vào buổi sáng so với phần còn lại trong ngày?',
  'Bạn có thấy khó kiềm chế khi ở nơi cấm hút thuốc (bệnh viện, trường...)'
]

const choices = [
  [
    { label: 'Trong 5 phút', value: 3 },
    { label: '6–30 phút', value: 2 },
    { label: '31–60 phút', value: 1 },
    { label: 'Sau 60 phút', value: 0 }
  ],
  [
    { label: 'Có', value: 1 },
    { label: 'Không', value: 0 }
  ],
  [
    { label: 'Điếu đầu tiên buổi sáng', value: 1 },
    { label: 'Các điếu khác', value: 0 }
  ],
  [
    { label: 'Trên 30', value: 3 },
    { label: '21–30', value: 2 },
    { label: '11–20', value: 1 },
    { label: 'Dưới 10', value: 0 }
  ],
  [
    { label: 'Có', value: 1 },
    { label: 'Không', value: 0 }
  ],
  [
    { label: 'Có', value: 1 },
    { label: 'Không', value: 0 }
  ]
]

export default function NicotineQuizPopup({ onClose, onSubmit }: Props) {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [submitted, setSubmitted] = useState(false)
  const [averageScore10, setAverageScore10] = useState<number | null>(null)

  const handleSelect = (qIdx: number, val: number) => {
    const updated = [...answers]
    updated[qIdx] = val
    setAnswers(updated)
  }

  const handleSubmit = () => {
    const total = answers.reduce((sum, val) => sum + val, 0)
    const average10 = total // hoặc tính (total / 10) * 10 nếu muốn tỉ lệ hóa
    setAverageScore10(average10)
    setSubmitted(true)
    onSubmit(total, average10)
  }

  const canSubmit = answers.every((val) => val >= 0)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Bài đánh giá mức độ phụ thuộc nicotine</h2>

      {questions.map((q, qIdx) => (
        <div key={qIdx} className="mb-6">
          <p className="font-medium mb-2">{q}</p>
          {choices[qIdx].map((c, cIdx) => (
            <label key={cIdx} className="flex items-center gap-2 mb-1">
              <input
                type="radio"
                name={`q-${qIdx}`}
                value={c.value}
                checked={answers[qIdx] === c.value}
                onChange={() => handleSelect(qIdx, c.value)}
                disabled={submitted}
              />
              {c.label}
            </label>
          ))}
        </div>
      ))}

      {submitted && averageScore10 !== null && (
        <div className="mt-6 text-green-600 font-semibold text-center">
          ✅ Tổng điểm của bạn: {averageScore10} / 10
        </div>
      )}

      <div className="flex justify-end gap-2 pt-6">
        {!submitted ? (
          <>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Nộp bài
            </button>
          </>
        ) : (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Đóng
          </button>
        )}
      </div>
    </div>
  )
}
