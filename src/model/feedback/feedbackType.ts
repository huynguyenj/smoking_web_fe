export type Feedback = {
  content: string
  star: number
  create_feedback_date: number
}

export type FeedbackPaginationInfo = {
  _id: string
  user_name: string
  feedback: Feedback
}
