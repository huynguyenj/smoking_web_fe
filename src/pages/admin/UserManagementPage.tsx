import UserTable from '../../components/user-table/UserTable'

export default function UserManagementPage() {
  const users = [
    { id: 1, name: 'Nguyen Van A', createDate: '21/5/2025', updateDate: '22/5/2025', email: 'example@gmail.com', role: 'member', isActive: true },
    { id: 2, name: 'Le Thi Hoang', createDate: '21/5/2025', updateDate: '23/5/2025', email: 'example@gmail.com', role: 'coach', isActive: true },
    { id: 3, name: 'Tran Van A', createDate: '21/5/2025', updateDate: '24/5/2025', email: 'example@gmail.com', role: 'admin', isActive: true },
    { id: 4, name: 'Nguyen Thi A', createDate: '21/5/2025', updateDate: '26/5/2025', email: 'example@gmail.com', role: 'member', isActive: false },
    { id: 5, name: 'Le Tu Ngoc', createDate: '21/5/2025', updateDate: '27/5/2025', email: 'example@gmail.com', role: 'member', isActive: true },
    { id: 6, name: 'Tran Van Kien', createDate: '21/5/2025', updateDate: '29/5/2025', email: 'example@gmail.com', role: 'member', isActive: true },
    { id: 7, name: 'Cam Thi Lien', createDate: '21/5/2025', updateDate: '24/5/2025', email: 'example@gmail.com', role: 'member', isActive: false }
  ]
  return (
    <UserTable users={users} />
  )
}
