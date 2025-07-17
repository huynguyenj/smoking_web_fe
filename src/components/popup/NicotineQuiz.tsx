import { useState } from 'react'

interface Props {
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onSubmit: (totalScore: number, averageScore10: number) => void
}

const questions = [
  'How long after waking up do you smoke your first cigarette??',
  'Do you smoke when you are sick and bedridden??',
  'Which cigarette is the hardest to quit during the day?',
  'How many cigarettes do you smoke per day on average?',
  'Do you smoke more in the morning than the rest of the day?',
  'Do you find it difficult to control yourself in places where smoking is prohibited (hospitals, schools...)?'
]

const choices = [
  [
    { label: 'In 5 minutes', value: 3 },
    { label: '6–30 minutes', value: 2 },
    { label: '31–60 minutes', value: 1 },
    { label: 'After 60 minutes', value: 0 }
  ],
  [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 }
  ],
  [
    { label: 'First cigarette in the morning', value: 1 },
    { label: 'Other cigarettes', value: 0 }
  ],
  [
    { label: 'Over 30', value: 3 },
    { label: '21–30', value: 2 },
    { label: '11–20', value: 1 },
    { label: 'Under 10', value: 0 }
  ],
  [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 }
  ],
  [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 }
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
      <h2 className="text-xl font-bold mb-4">Nicotine Dependence Assessment</h2>

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
          ✅ Your total score: {averageScore10} / 10
        </div>
      )}

      <div className="flex justify-end gap-2 pt-6">
        {!submitted ? (
          <>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Submit
            </button>
          </>
        ) : (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}
