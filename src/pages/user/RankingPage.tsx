
interface User {
  rank: number
  name: string
  points: number
  avatarUrl: string
}

const leaderboardData: User[] = [
  {
    rank: 1,
    name: 'Nguyen Van A',
    points: 980,
    avatarUrl: 'https://i.pravatar.cc/100?img=1'
  },
  {
    rank: 2,
    name: 'Tran Thi B',
    points: 910,
    avatarUrl: 'https://i.pravatar.cc/100?img=2'
  },
  {
    rank: 3,
    name: 'Le Van C',
    points: 860,
    avatarUrl: 'https://i.pravatar.cc/100?img=3'
  },
  {
    rank: 4,
    name: 'Pham D',
    points: 820,
    avatarUrl: 'https://i.pravatar.cc/100?img=4'
  },
  {
    rank: 5,
    name: 'Vo E',
    points: 800,
    avatarUrl: 'https://i.pravatar.cc/100?img=5'
  }
]

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">🏆 Leaderboard</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        {leaderboardData.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between px-4 py-3 rounded-lg mb-3 ${
              user.rank === 1
                ? 'bg-yellow-100 font-bold'
                : user.rank === 2
                  ? 'bg-gray-100'
                  : user.rank === 3
                    ? 'bg-orange-100'
                    : ''
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold w-6 text-right">{user.rank}</span>
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-blue-500"
              />
              <span className="text-lg">{user.name}</span>
            </div>
            <span className="text-blue-600 font-semibold text-lg">{user.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Leaderboard
