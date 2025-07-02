export default function ContactPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#f8f398] rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Information</h2>
        <p className="text-gray-600 mb-6">
          We're here to help. Reach out to us through the information below.
        </p>

        <div className="space-y-4 text-gray-700">
          <div>
            <span className="font-semibold">🌐 Website:</span> www.example.com
          </div>
          <div>
            <span className="font-semibold">🏢 Address:</span> 123 Main Street, District 1, HCMC
          </div>
          <div>
            <span className="font-semibold">📞 Phone:</span> +84 123 456 789
          </div>
          <div>
            <span className="font-semibold">✉️ Email:</span> contact@example.com
          </div>
          <div>
            <span className="font-semibold">🕘 Hours:</span> Mon - Fri: 9:00 AM - 6:00 PM
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="text-blue-600 hover:underline">Facebook</a>
            <a href="#" className="text-blue-400 hover:underline">Twitter</a>
            <a href="#" className="text-pink-500 hover:underline">Instagram</a>
            <a href="#" className="text-blue-700 hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  )
}
