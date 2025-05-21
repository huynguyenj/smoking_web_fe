import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function UserMainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar/>
      </header>
      <section className="flex-grow mt-30">
        <Outlet/>
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default UserMainLayout