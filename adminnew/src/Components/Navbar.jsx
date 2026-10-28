import { Link } from 'react-router-dom'
import userImg from '../assets/img/user.svg'

function MessageItem() {
  return (
    <>
      <a href="#" className="dropdown-item">
        <div className="d-flex align-items-center">
          <img className="rounded-circle" src={userImg} alt="" style={{ width: 40, height: 40 }} />
          <div className="ms-2">
            <h6 className="fw-normal mb-0">Jhon send you a message</h6>
            <small>15 minutes ago</small>
          </div>
        </div>
      </a>
      <hr className="dropdown-divider" />
    </>
  )
}

const notifications = ['Profile updated', 'New user added', 'Password changed']
const menuClass = 'dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0'

export default function Navbar({ onToggle }) {
  return (
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <Link to="/" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
      </Link>

      <a
        href="#"
        className="sidebar-toggler flex-shrink-0"
        onClick={(e) => { e.preventDefault(); onToggle() }}
      >
        <i className="fa fa-bars"></i>
      </a>

      <form className="d-none d-md-flex ms-4" onSubmit={(e) => e.preventDefault()}>
        <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
      </form>

      <div className="navbar-nav align-items-center ms-auto">
        {/* Messages */}
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-envelope me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className={menuClass}>
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <a href="#" className="dropdown-item text-center">See all message</a>
          </div>
        </div>

        {/* Notifications */}
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-bell me-lg-2"></i>
            <span className="d-none d-lg-inline-flex">Notification</span>
          </a>
          <div className={menuClass}>
            {notifications.map((n) => (
              <div key={n}>
                <a href="#" className="dropdown-item">
                  <h6 className="fw-normal mb-0">{n}</h6>
                  <small>15 minutes ago</small>
                </a>
                <hr className="dropdown-divider" />
              </div>
            ))}
            <a href="#" className="dropdown-item text-center">See all notifications</a>
          </div>
        </div>

        {/* Profile */}
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2" src={userImg} alt="" style={{ width: 40, height: 40 }} />
            <span className="d-none d-lg-inline-flex">John Doe</span>
          </a>
          <div className={menuClass}>
            <a href="#" className="dropdown-item">My Profile</a>
            <a href="#" className="dropdown-item">Settings</a>
            <a href="#" className="dropdown-item">Log Out</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
