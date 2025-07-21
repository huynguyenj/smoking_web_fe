
export default function LoadingCircle() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-black rounded-full animate-spin" />
        <p className="text-black text-lg font-semibold">Loading...</p>
      </div>
    </div>
  )
}
