const LoadingScreenBg = () => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin" />
        <p className="text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingScreenBg
