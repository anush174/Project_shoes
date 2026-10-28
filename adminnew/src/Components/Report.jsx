import React from 'react'

export default function Report() {
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
                <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
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
            <img className="rounded-circle me-lg-2" src="img/user.jpg" alt style={{width: 40, height: 40}} />
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
        <div><h4 className="mb-1">Sales / Reports</h4><p className="mb-0 text-muted-2">Revenue, orders and best sellers at a glance.</p></div><div className="d-flex gap-2 no-print"><button className="btn btn-outline-light" onclick="window.print()"><i className="fa fa-print me-2" />Print</button><button className="btn btn-primary"><i className="fa fa-download me-2" />Export CSV</button></div></div><div className="bg-secondary rounded p-4"><div className="d-flex flex-wrap gap-2 align-items-end no-print"><div><label className="form-label">From</label><input type="date" className="form-control" defaultValue="2026-01-01" /></div><div><label className="form-label">To</label><input type="date" className="form-control" defaultValue="2026-10-11" /></div><button className="btn btn-primary">Apply</button></div></div><div className="row g-4 my-0 mb-4 mt-1"><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-success"><i className="fa fa-dollar-sign" /></div>
            <div><p>Total Sales</p><h4>$84,320</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-primary"><i className="fa fa-shopping-cart" /></div>
            <div><p>Orders</p><h4>1,008</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-info"><i className="fa fa-chart-line" /></div>
            <div><p>Avg. Order Value</p><h4>$83.65</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-warning"><i className="fa fa-user-plus" /></div>
            <div><p>New Customers</p><h4>312</h4></div></div></div></div><div className="row g-4 mb-4"><div className="col-lg-8"><div className="bg-secondary rounded p-4"><h6 className="mb-4">Monthly Sales</h6><canvas id="sales-chart" height={130} /></div></div><div className="col-lg-4"><div className="bg-secondary rounded p-4"><h6 className="mb-4">Sales by Category</h6><canvas id="cat-chart" /></div></div></div><div className="row g-4"><div className="col-lg-7"><div className="bg-secondary rounded p-4"><h6 className="mb-3">Top Selling Products</h6><div className="table-responsive"><table className="table table-hover" id="top-table"><thead><tr><th>#</th><th>Product</th><th>Units Sold</th><th>Revenue</th></tr></thead><tbody><tr><td>1</td><td><strong>Samsung Galaxy S24</strong></td><td>142</td><td>$127,658</td></tr>
                  <tr><td>2</td><td><strong>Apple Series 4 GPS A38</strong></td><td>118</td><td>$1,721</td></tr>
                  <tr><td>3</td><td><strong>Sony WH-1000XM5</strong></td><td>96</td><td>$38,304</td></tr>
                  <tr><td>4</td><td><strong>Dell XPS 13 Laptop</strong></td><td>54</td><td>$64,746</td></tr>
                  <tr><td>5</td><td><strong>Leather Messenger Bag</strong></td><td>47</td><td>$2,819</td></tr>
                </tbody></table></div></div></div><div className="col-lg-5"><div className="bg-secondary rounded p-4"><h6 className="mb-4">Orders by Status</h6><canvas id="status-chart" height={200} /></div></div></div></div>
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
