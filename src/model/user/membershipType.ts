export interface Membership {
  _id: string
  membership_title: string
  price: number
  feature: string[]
  create_by: string
  create_date: number
  update_date: number | null
  highlight?: boolean
}

export interface MembershipResponse {
  success: boolean
  message: string
  data: Membership[]
}

export type MembershipInfo = {
    _id: string,
    membership_title: string,
    price: number,
    feature: string[]
}