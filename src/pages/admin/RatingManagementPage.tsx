import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import RatingFbBox from '../../components/ratingFb-box/RatingFbBox'
import React, { useEffect, useState } from 'react'
import ApiAdminPrivate from '../../services/ApiAdminPrivate'
import dayjs from 'dayjs'
import type { FeedbackPaginationInfo } from '../../model/feedback/feedbackType'
import { toast } from 'react-toastify'

export default function RatingManagementPage() {
  const [fbList, setFbList] = useState<FeedbackPaginationInfo[]>([])

  useEffect(() => {
    getAllFeedbacks()
  }, [])

  const getAllFeedbacks = async () => {
    try {
      const response = await ApiAdminPrivate.getFeedbackPagination({ page: 1, limit: 4, sort: -1 })
      setFbList(response.data.listData)
      console.log(response.data)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await ApiAdminPrivate.deleteFeedback({ id })
      toast.success('Xóa thành công')
      getAllFeedbacks()
    } catch (error) {
      console.log(error)
      toast.error('Không thể xóa')
    }
  }

  const itemsPerPage = 4

  const [page, setPage] = useState<number>(1)
  const totalPages = Math.ceil(fbList.length / itemsPerPage)

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const currentFeedbacks = fbList.slice(startIndex, startIndex + itemsPerPage)

  // Chia thành 2 dòng, mỗi dòng 2 feedback
  const feedbackRows = []
  for (let i = 0; i < currentFeedbacks.length; i += 2) {
    feedbackRows.push(currentFeedbacks.slice(i, i + 2))
  }
  return (
    <div className='p-5'>
      <div className='bg-gray-fig/20 shadow-md rounded-[20px] p-5  max-h-[450px]'>
        {feedbackRows.map((row, rowIndex) => (
          <div className='flex gap-5 mb-5' key={rowIndex}>
            {row.map((fb, i) => (
              <RatingFbBox
                _id={fb._id}
                handleDelete={() => handleDelete(fb._id)}
                key={i}
                user_name={fb.user_name}
                star={fb.feedback.star}
                create_feedback_date={dayjs(fb.feedback.create_feedback_date).format('DD-MM-YYYY')}
                feedback={fb.feedback.content}
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
