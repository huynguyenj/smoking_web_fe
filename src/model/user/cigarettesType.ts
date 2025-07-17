export interface CigaretteRecord {
  _id: string;
  smoking_frequency_per_day: number;
  money_consumption_per_day: number;
  saving_money: number;
  plan_id: string;
  create_date: number;
  update_date: number;
  isDeleted: boolean;
  user_id: string;
}

export interface PageInfo {
  limit: number;
  page: number;
  totalPage: number;
}

export interface CigarettePaginationData {
  listData: CigaretteRecord[];
  pageInfo: PageInfo;
}

export interface CigarettePaginationResponse {
  success: boolean;
  message: string;
  data: CigarettePaginationData;
}

// ✅ Payload gửi khi tạo bản ghi mới
export interface CreateCigarettePayload {
  smoking_frequency_per_day: number;
  money_consumption_per_day: number;
  saving_money: number;
  plan_id: string;
}

// ✅ Payload gửi khi cập nhật bản ghi
export interface UpdateCigarettePayload {
  smoking_frequency_per_day: number;
  money_consumption_per_day: number;
  saving_money: number;
}
