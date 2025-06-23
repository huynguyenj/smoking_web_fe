type PageInfo = {
  limit: number,
  page: number,
  totalPage:number
}

export interface Pagination<T> {
  listData: T[],
  pageInfo: PageInfo
}