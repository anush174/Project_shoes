import React from 'react'

export default function AdminHome() {
  return (
    <div>
   <div className="container-fluid position-relative d-flex p-0">
  {/* Spinner Start */}
  <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
  {/* Spinner End */}
  {/* Sidebar Start */}
 
  {/* Sidebar End */}
  {/* Content Start */}
  <div className="content">
    {/* Navbar Start */}
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0"><i className="fa fa-user-edit" /></h2>
      </a>
      <a href="#" className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars" />
      </a>
      <form className="d-none d-md-flex ms-4">
        <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-envelope me-lg-2" />
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="./assets/img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="./assets/img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="./assets/img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">See all message</a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-bell me-lg-2" />
            <span className="d-none d-lg-inline-flex">Notificatin</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">See all notifications</a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2" src="./assets/img/user.jpg" alt style={{width: 40, height: 40}} />
            <span className="d-none d-lg-inline-flex">John Doe</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">My Profile</a>
            <a href="#" className="dropdown-item">Settings</a>
            <a href="signin.html" className="dropdown-item">Log Out</a>
          </div>
        </div>
      </div>
    </nav>
    {/* Navbar End */}
    <div className="container-fluid pt-4 px-4"><div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div><h4 className="mb-1">Welcome back, Admin</h4><p className="mb-0 text-muted-2">Here is what is happening in your store today.</p></div><div className="d-flex gap-2 no-print"><a href="reports.html" className="btn btn-primary"><i className="fa fa-chart-line me-2" />View Reports</a></div></div><div className="row g-4 mb-4"><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-primary"><i className="fa fa-dollar-sign" /></div>
            <div><p>Today Sales</p><h4>$1,234</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-info"><i className="fa fa-shopping-cart" /></div>
            <div><p>Orders Today</p><h4>38</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-success"><i className="fa fa-users" /></div>
            <div><p>Customers</p><h4>1,284</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-warning"><i className="fa fa-exclamation-triangle" /></div>
            <div><p>Low Stock Items</p><h4>4</h4></div></div></div></div><h6 className="mb-3 text-muted-2">ADMIN WORKFLOW</h6><div className="row g-3 mb-4"><div className="col-6 col-md-3 col-xl"><a href="categories.html" className="flow-tile"><i className="fa fa-tags" /><small>Step 1</small>Categories</a></div><div className="col-6 col-md-3 col-xl"><a href="products.html" className="flow-tile"><i className="fa fa-box-open" /><small>Step 2</small>Products</a></div><div className="col-6 col-md-3 col-xl"><a href="stock.html" className="flow-tile"><i className="fa fa-warehouse" /><small>Step 3</small>Stock</a></div><div className="col-6 col-md-3 col-xl"><a href="orders.html" className="flow-tile"><i className="fa fa-shopping-cart" /><small>Step 4</small>Orders</a></div><div className="col-6 col-md-3 col-xl"><a href="payments.html" className="flow-tile"><i className="fa fa-credit-card" /><small>Step 5</small>Payments</a></div><div className="col-6 col-md-3 col-xl"><a href="customers.html" className="flow-tile"><i className="fa fa-users" /><small>Step 6</small>Customers</a></div><div className="col-6 col-md-3 col-xl"><a href="reports.html" className="flow-tile"><i className="fa fa-chart-line" /><small>Step 7</small>Sales / Reports</a></div></div><div className="row g-4 mb-4"><div className="col-lg-8"><div className="bg-secondary rounded p-4"><h6 className="mb-4">Sales Overview</h6><canvas id="dash-sales" height={120} /></div></div><div className="col-lg-4"><div className="bg-secondary rounded p-4"><h6 className="mb-2">Low Stock Alerts</h6><div className="d-flex align-items-center justify-content-between py-3 border-bottom" style={{borderColor: 'var(--line)!important'}}><span>Logitech MX Master 3</span><span className="sbadge s-warning">3 left</span></div><div className="d-flex align-items-center justify-content-between py-3 border-bottom" style={{borderColor: 'var(--line)!important'}}><span>Sony WH-1000XM5</span><span className="sbadge s-warning">8 left</span></div><div className="d-flex align-items-center justify-content-between py-3 border-bottom" style={{borderColor: 'var(--line)!important'}}><span>Fitbit Sense Advanced</span><span className="sbadge s-warning">12 left</span></div><div className="d-flex align-items-center justify-content-between py-3 border-bottom" style={{borderColor: 'var(--line)!important'}}><span>Boat On-Ear Wireless</span><span className="sbadge s-danger">Out of stock</span></div><a href="stock.html" className="btn btn-outline-light btn-sm mt-3">Manage stock</a></div></div></div><div className="row"><div className="col-12"><div className="bg-secondary rounded p-4"><div className="d-flex justify-content-between mb-3"><h6 className="mb-0">Recent Orders</h6><a href="orders.html">View all</a></div><div className="table-responsive"><table className="table table-hover" id="recent"><thead><tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody><tr><td>#ORD-1008</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#6C63FF'}}>AM</span><span>Anna Mathew</span></div></td><td>$214.50</td><td><span className="sbadge s-info">Processing</span></td></tr>
                  <tr><td>#ORD-1007</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#38bdf8'}}>RS</span><span>Rahul Shetty</span></div></td><td>$81.99</td><td><span className="sbadge s-primary">Shipped</span></td></tr>
                  <tr><td>#ORD-1006</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#19c37d'}}>PN</span><span>Priya Nair</span></div></td><td>$129.00</td><td><span className="sbadge s-warning">Pending</span></td></tr>
                  <tr><td>#ORD-1005</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#f59e0b'}}>JC</span><span>John Carter</span></div></td><td>$466.25</td><td><span className="sbadge s-success">Delivered</span></td></tr>
                  <tr><td>#ORD-1004</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#ef4444'}}>MP</span><span>Meera Pai</span></div></td><td>$14.59</td><td><span className="sbadge s-danger">Cancelled</span></td></tr>
                </tbody></table></div></div></div></div></div>
    {/* Footer Start */}
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded-top p-4">
        <div className="row">
          <div className="col-12 col-sm-6 text-center text-sm-start">
            © <a href="#">Your Site Name</a>, All Right Reserved. 
          </div>
          <div className="col-12 col-sm-6 text-center text-sm-end">
            {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
            Designed By <a href="https://htmlcodex.com">HTML Codex</a>
            <br />Distributed By: <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
  </div>
  {/* Content End */}
  {/* Back to Top */}
  <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
</div>
{/* JavaScript Libraries */}

    </div>
  )
}
