export type MemberShip = {
    membership_id: string,
    create_date: Date,
    expired_date: Date
}

export type MemberShipInfo = {
    _id: string,
    membership_title: string,
    price: number,
    feature: string[]
}