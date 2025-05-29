import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import RatingFbBox from '../../components/ratingFb-box/RatingFbBox'
import React, { useState } from 'react'

export default function RatingManagementPage() {
  const feedbackListAPI = [
    {
      name: 'Long',
      ratingStar: 3,
      createDate: '5/26/2025',
      feedback: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nulla. Officiis est fugiat eaque mollitia. Similique, excepturi architecto, sunt, magni minus officiis suscipit pariatur repellat quisquam maiores inventore doloribus necessitatibus.'
    },
    {
      name: 'Long1',
      ratingStar: 1,
      createDate: '5/26/2025',
      feedback: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nulla. Officiis est fugiat eaque mollitia. Similique, excepturi architecto, sunt, magni minus officiis suscipit pariatur repellat quisquam maiores inventore doloribus necessitatibus.'
    },
    {
      name: 'Long2',
      ratingStar: 4,
      createDate: '5/26/2025',
      feedback: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nulla. Officiis est fugiat eaque mollitia. Similique, excepturi architecto, sunt, magni minus officiis suscipit pariatur repellat quisquam maiores inventore doloribus necessitatibus.'
    },
    {
      name: 'Long3',
      ratingStar: 5,
      createDate: '5/26/2025',
      feedback: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nulla. Officiis est fugiat eaque mollitia. Similique, excepturi architecto, sunt, magni minus officiis suscipit pariatur repellat quisquam maiores inventore doloribus necessitatibus.'
    },
    {
      name: 'Long3',
      ratingStar: 5,
      createDate: '5/26/2025',
      feedback: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nulla. Officiis est fugiat eaque mollitia. Similique, excepturi architecto, sunt, magni minus officiis suscipit pariatur repellat quisquam maiores inventore doloribus necessitatibus.'
    },
    {
      name: 'Long9',
      ratingStar: 5,
      createDate: '5/26/2025',
      feedback: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, nulla. Officiis est fugiat eaque mollitia. Similique, excepturi architecto, sunt, magni minus officiis suscipit pariatur repellat quisquam maiores inventore doloribus necessitatibus.'
    }
  ]

  const itemsPerPage = 4

  const [page, setPage] = useState<number>(1)
  const totalPages = Math.ceil(feedbackListAPI.length / itemsPerPage)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const currentFeedbacks = feedbackListAPI.slice(startIndex, startIndex + itemsPerPage)

  // Chia thành 2 dòng, mỗi dòng 2 feedback
  const feedbackRows = []
  for (let i = 0; i < currentFeedbacks.length; i += 2) {
    feedbackRows.push(currentFeedbacks.slice(i, i + 2))
  }
  return (
    <div className='p-5'>
      <div className='bg-gray-fig/20 shadow-md rounded-[20px] p-5 mb-10 min-h-[600px]'>
        {feedbackRows.map((row, rowIndex) => (
          <div className='flex gap-5 mb-5' key={rowIndex}>
            {row.map((fb, i) => (
              <RatingFbBox
                key={i}
                name={fb.name}
                ratingStar={fb.ratingStar}
                createDate={fb.createDate}
                feedback={fb.feedback}
              />
            ))}
          </div>
        ))}
      </div>
      <div className='flex justify-end mt-auto'>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color='primary'
            size="large"
          />
        </Stack>
      </div>
    </div>
  )
}
