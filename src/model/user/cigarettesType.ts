export interface CigaretteRecord {
  _id: string;
  amount: number;
  smoking_frequency_per_day: number;
  money_consumption_per_day: number;
  nicotine_evaluation: number;
  saving_money: number;
  create_date: number;
  update_date: number | null;
  no_smoking_date: number | null;
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
  amount: number;
  smoking_frequency_per_day: number;
  money_consumption_per_day: number;
  nicotine_evaluation: number;
  saving_money: number;
}

// ✅ Payload gửi khi cập nhật bản ghi
export interface UpdateCigarettePayload {
  amount: number;
  smoking_frequency_per_day: number;
  money_consumption_per_day: number;
  nicotine_evaluation: number;
  saving_money: number;
}
