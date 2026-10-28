import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const storeLinks = [
  { to: '/Categories', icon: 'fa-tags', label: 'Categories' },
  { to: '/Products', icon: 'fa-box-open', label: 'Products' },
  { to: '/Stock', icon: 'fa-warehouse', label: 'Stock' },
  { to: '/Orders', icon: 'fa-shopping-cart', label: 'Orders' },
  { to: '/Payments', icon: 'fa-credit-card', label: 'Payments' },
  { to: '/Customers', icon: 'fa-users', label: 'Customers' },
  { to: '/Report', icon: 'fa-chart-line', label: 'Sales / Reports' },
]

const linkClass = ({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '')

export default function Sidebar() {
  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-secondary navbar-dark">
        <Link to="/" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary d-flex align-items-center">
            <span className="brand-mark me-2"><i className="fa fa-store" /></span>DarkPan
          </h3>
        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img className="rounded-circle" src="./assets/img/user.jpg" alt="" style={{ width: 40, height: 40 }} />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Jhon Doe</h6>
            <span>Administrator</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <NavLink to="/" end className={linkClass}>
            <i className="fa fa-tachometer-alt me-2" />Dashboard
          </NavLink>

          <div className="nav-caption">Store Management</div>
          {storeLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              <i className={`fa ${l.icon} me-2`} />{l.label}
            </NavLink>
          ))}

          <div className="nav-caption">Template Pages</div>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <i className="fa fa-laptop me-2" />UI Kit
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              <NavLink to="/Elements" className="dropdown-item">Other Elements</NavLink>
            </div>
          </div>

          <NavLink to="/AdminLogin" className="nav-item nav-link">
            <i className="fa fa-sign-out-alt me-2" />Logout
          </NavLink>
        </div>
      </nav>
    </div>
  )
}