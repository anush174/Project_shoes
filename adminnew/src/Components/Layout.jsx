import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  const [open, setOpen] = useState(true)

  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Sidebar open={open} />
      <div className={`content ${open ? 'open' : ''}`}>
        <Navbar onToggle={() => setOpen((o) => !o)} />
        <Outlet />
        <Footer />
      </div>
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  )
}
