import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'

import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="container-fluid position-relative d-flex p-0">
      <Sidebar />

      <div className="content">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}