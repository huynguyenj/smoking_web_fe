import { Route, Routes } from 'react-router-dom'

function App() {

  return (

    <Routes>
      <Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Signup" element={<SignupPage />} />
      </Route>
    </Routes>
  )
}

export default App