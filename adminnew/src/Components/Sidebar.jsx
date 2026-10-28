import { NavLink, Link } from 'react-router-dom'
import userImg from '../assets/img/user.svg'

const storeLinks = [
  ['/categories', 'fa-tags', 'Categories'],
  ['/products', 'fa-box-open', 'Products'],
  ['/stock', 'fa-warehouse', 'Stock'],
  ['/orders', 'fa-shopping-cart', 'Orders'],
  ['/payments', 'fa-credit-card', 'Payments'],
  ['/customers', 'fa-users', 'Customers'],
  ['/reports', 'fa-chart-line', 'Sales / Reports'],
]

const uiKit = ['Buttons', 'Typography', 'Other Elements', 'Widgets', 'Forms', 'Tables', 'Charts']

export default function Sidebar({ open }) {
  return (
    <div className={`sidebar pe-4 pb-3 ${open ? 'open' : ''}`}>
      <nav className="navbar bg-secondary navbar-dark">
        <Link to="/" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary d-flex align-items-center">
            <span className="brand-mark me-2"><i className="fa fa-store"></i></span>DarkPan
          </h3>
        </Link>

        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img className="rounded-circle" src={userImg} alt="" style={{ width: 40, height: 40 }} />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Jhon Doe</h6>
            <span>Administrator</span>
          </div>
        </div>

        <div className="navbar-nav w-100">
          <NavLink to="/" end className="nav-item nav-link">
            <i className="fa fa-tachometer-alt me-2"></i>Dashboard
          </NavLink>

          <div className="nav-caption">Store Management</div>
          {storeLinks.map(([to, icon, label]) => (
            <NavLink key={to} to={to} className="nav-item nav-link">
              <i className={`fa ${icon} me-2`}></i>{label}
            </NavLink>
          ))}

          {/* <div className="nav-caption">Template Pages</div>
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <i className="fa fa-laptop me-2"></i>UI Kit
            </a>
            <div className="dropdown-menu bg-transparent border-0">
              {uiKit.map((label) => (
                <a key={label} href="#" className="dropdown-item">{label}</a>
              ))}
            </div>
          </div> */}

          <NavLink to="/signin" className="nav-item nav-link">
            <i className="fa fa-sign-out-alt me-2"></i>Logout
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
