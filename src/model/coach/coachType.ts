export type Profile = {
  experience: string;
  birthdate: number;
  age: number;
  address: string;
}

export type CoachPagination = {
  _id: string;
  full_name: string;
  user_name: string;
  role: string;
  profile: Profile;
  image_url: string;
}
