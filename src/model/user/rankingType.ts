export interface RankingUser {
  _id: string;
  user_name: string;
  email: string;
  image_url?: string
}

export interface RankingItem {
  _id: string;
  star_count: number;
  achievements: string[];
  position: number;
  record_date: number; // Unix timestamp (milliseconds)
  users: RankingUser;
}

export interface PageInfo {
  limit: number;
  page: number;
  totalPage: number;
}

export interface RankingData {
  listData: RankingItem[];
  pageInfo: PageInfo;
}

export interface RankingResponse {
  success: boolean;
  message: string;
  data: RankingData;
}
