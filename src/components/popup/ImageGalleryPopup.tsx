interface ImageGalleryPopupProps {
  images: string[]
  onClose: () => void
  startIndex?: number
}

const ImageGalleryPopup = ({ images, onClose }: ImageGalleryPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/30">
      <div className="bg-white p-4 rounded max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-xl">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-red-600 font-bold text-xl"
        >
          ×
        </button>

        {/* Lưới ảnh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="relative border rounded-lg overflow-hidden shadow"
            >
              <img
                src={url}
                alt={`image-${idx}`}
                className="w-full h-[250px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageGalleryPopup
