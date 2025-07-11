// 1. Interface định nghĩa blog
export interface Blog {
  _id: string
  title: string
  content: string
  user_id: string
  image_url: string[]
  create_date: number
  update_date: number | null
  isDeleted: boolean
}

// 2. Phân trang
export interface PageInfo {
  limit: number
  page: number
  totalPage: number
}

// 3. Dữ liệu danh sách blog
export interface BlogListData {
  listData: Blog[]
  pageInfo: PageInfo
}

// 4. Response trả về từ API get all blogs
export interface BlogListResponse {
  success: boolean
  message: string
  data: BlogListData
}

// 5. Dữ liệu gửi lên khi tạo blog kèm ảnh gốc (dùng với FormData)
export interface CreateBlogFormInput {
  title: string
  content: string
  image: File[]
  keep_images?: string[]
}

// 6. Hàm tạo FormData để gửi toàn bộ blog (bao gồm cả ảnh)
export function createBlogFormData(input: CreateBlogFormInput): FormData {
  const form = new FormData()
  form.append('title', input.title)
  form.append('content', input.content)

  input.image.forEach(file => {
    form.append('image', file)
  })

  if (input.keep_images) {
    form.append('keep_images', JSON.stringify(input.keep_images)) // 👈 dùng JSON.stringify
  }

  return form
}

