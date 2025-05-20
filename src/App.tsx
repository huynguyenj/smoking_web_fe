import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/user/Auth/Login'
import SignupPage from './pages/user/Auth/Signup'

function App() {

  return (

    <Routes>
      <Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
    </Routes>
  )
}

export default App