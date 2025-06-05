import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <Suspense fallback={'loading...'}>
      <RouterProvider router={router}/>
      <ToastContainer position='top-right' autoClose={3000}/>
    </Suspense>
  )
}

export default App