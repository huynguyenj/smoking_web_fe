// ProfilePage.tsx - Thiết kế lại đẹp hơn, theo đúng thông tin schema
import { useState } from 'react'
import LockResetIcon from '@mui/icons-material/LockReset'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const user = {
  _id: 'abc123',
  full_name: 'Nguyen Van A',
  user_name: 'nguyenvana',
  email: 'nguyenvana@example.com',
  password: '12345678',
  create_date: '2023-01-01',
  update_date: '2024-05-26',
  isActive: true,
  isDelete: false,
  role: 'user',
  profile: {
    _id: 'profile123',
    address: '123 Dinh Cong, Hoang Mai, Ha Noi',
    birthday: '1995-08-10',
    experience: '5 years',
    age: 29,
    avatar_url: 'https://i.pravatar.cc/150?img=12'
  }
}

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 grid md:grid-cols-3 gap-8">
        {/* Left Panel */}
        <div className="flex flex-col items-center text-center">
          <img
            src={user.profile.avatar_url}
            alt="avatar"
            className="w-36 h-36 rounded-full border-4 border-blue-500 object-cover shadow mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-800">{user.full_name}</h2>
          <p className="text-base text-gray-500">@{user.user_name}</p>
          <p className="mt-2 text-sm text-blue-600 font-medium capitalize">{user.role}</p>
          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              i <= 4 ? (
                <StarIcon key={i} fontSize="small" className="text-yellow-400" />
              ) : (
                <StarBorderIcon key={i} fontSize="small" className="text-gray-300" />
              )
            ))}
            <span className="ml-2 text-sm text-blue-600 font-semibold">4.0</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-2 space-y-8 text-gray-700 text-[16px]">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-2xl font-semibold text-gray-800">Account Info</h3>
            <button className="text-blue-600 hover:underline text-sm">Edit</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <p><strong>Email:</strong> {user.email}</p>
            <div className="flex items-center justify-between gap-3">
              <p><strong>Password:</strong> {showPassword ? user.password : '********'}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-600 hover:text-gray-900"
                  title="Toggle password visibility"
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                  <LockResetIcon fontSize="small" className="mr-1" />
                  Change Password
                </button>
              </div>
            </div>
            <p><strong>Created:</strong> {user.create_date}</p>
            <p><strong>Updated:</strong> {user.update_date}</p>
            <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Profile Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <p><strong>Address:</strong> {user.profile.address}</p>
              <p><strong>Birthday:</strong> {user.profile.birthday}</p>
              <p><strong>Experience:</strong> {user.profile.experience}</p>
              <p><strong>Age:</strong> {user.profile.age}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
