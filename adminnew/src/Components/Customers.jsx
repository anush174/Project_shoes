import React from 'react'

export default function Customers() {
  return (
    <div>
    <div className="container-fluid position-relative d-flex p-0">
  {/* Spinner Start */}
  {/* <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
    <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div> */}
  {/* Spinner End */}
  {/* Sidebar Start */}

  {/* Sidebar End */}
  {/* Content Start */}
  <div className="content">
      
    <div className="container-fluid pt-4 px-4"><div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div><h4 className="mb-1">Manage Customers</h4><p className="mb-0 text-muted-2">View customer details and manage accounts.</p></div><div className="d-flex gap-2 no-print"><button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-plus me-2" />Add Customer</button></div></div><div className="row g-4 mb-4"><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-primary"><i className="fa fa-users" /></div>
            <div><p>Total Customers</p><h4>1,284</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-success"><i className="fa fa-user-check" /></div>
            <div><p>Active</p><h4>1,102</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-info"><i className="fa fa-user-plus" /></div>
            <div><p>New This Month</p><h4>312</h4></div></div></div><div className="col-sm-6 col-xl-3"><div className="stat-card"><div className="stat-icon ic-danger"><i className="fa fa-user-slash" /></div>
            <div><p>Blocked</p><h4>14</h4></div></div></div></div><div className="bg-secondary rounded p-4"><div className="d-flex flex-wrap gap-2 mb-3 no-print"><input className="form-control" style={{maxWidth: 280}} type="search" placeholder="Search..." data-search="#cust-table" /><select className="form-select" style={{maxWidth: 220}} data-filter="#cust-table" data-col={6}><option>All statuses</option><option>Active</option><option>Inactive</option><option>Blocked</option></select></div><div className="table-responsive"><table className="table table-hover" id="cust-table"><thead><tr><th>#</th><th>Customer</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th><th>Status</th><th>Actions</th></tr></thead><tbody><tr><td>1</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#6C63FF'}}>AM</span><span>Anna Mathew</span></div></td><td>anna@example.com</td><td>+91 98450 11001</td><td>12</td><td>$1,240.50</td><td><span className="sbadge s-success">Active</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr>
              {/* <tr><td>2</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#38bdf8'}}>RS</span><span>Rahul Shetty</span></div></td><td>rahul@example.com</td><td>+91 98450 11002</td><td>8</td><td>$860.00</td><td><span className="sbadge s-success">Active</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr> */}
              {/* <tr><td>3</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#19c37d'}}>PN</span><span>Priya Nair</span></div></td><td>priya@example.com</td><td>+91 98450 11003</td><td>3</td><td>$229.00</td><td><span className="sbadge s-success">Active</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr> */}
              {/* <tr><td>4</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#f59e0b'}}>JC</span><span>John Carter</span></div></td><td>john@example.com</td><td>+1 202 555 0144</td><td>21</td><td>$3,480.25</td><td><span className="sbadge s-success">Active</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr> */}
              {/* <tr><td>5</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#ef4444'}}>MP</span><span>Meera Pai</span></div></td><td>meera@example.com</td><td>+91 98450 11005</td><td>1</td><td>$14.59</td><td><span className="sbadge s-danger">Blocked</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr> */}
              {/* <tr><td>6</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#ec4899'}}>SW</span><span>Sam Wilson</span></div></td><td>sam@example.com</td><td>+1 202 555 0178</td><td>6</td><td>$710.00</td><td><span className="sbadge s-success">Active</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr> */}
              {/* <tr><td>7</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#14b8a6'}}>DR</span><span>Divya Rao</span></div></td><td>divya@example.com</td><td>+91 98450 11007</td><td>2</td><td>$95.40</td><td><span className="sbadge s-secondary">Inactive</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr> */}
              {/* <tr><td>8</td><td><div className="d-flex align-items-center gap-2"><span className="avatar" style={{background: '#6C63FF'}}>KK</span><span>Kiran Kumar</span></div></td><td>kiran@example.com</td><td>+91 98450 11008</td><td>9</td><td>$1,599.00</td><td><span className="sbadge s-success">Active</span></td><td><div className="d-flex gap-1"><a href="#" className="act-btn" title="View" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-eye" /></a><a href="#" className="act-btn" title="Edit" data-bs-toggle="modal" data-bs-target="#cust-modal"><i className="fa fa-pen" /></a><a href="#" className="act-btn del" title="Delete" data-delete><i className="fa fa-trash" /></a></div></td></tr> */}
            </tbody></table></div></div></div>
    <div className="modal fade" id="cust-modal" tabIndex={-1} aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Add / Edit Customer</h5><button type="button" className="btn-close" data-bs-dismiss="modal" /></div>
          <div className="modal-body"><div className="row g-3"><div className="col-12"><label className="form-label">Full name</label><input type="text" className="form-control" placeholder="Full name" /></div><div className="col-6"><label className="form-label">Email</label><input type="email" className="form-control" placeholder="name@example.com" /></div><div className="col-6"><label className="form-label">Phone</label><input type="text" className="form-control" placeholder="Phone number" /></div><div className="col-12"><label className="form-label">Address</label><textarea className="form-control" rows={2} defaultValue={""} /></div><div className="col-12"><label className="form-label">Status</label><select className="form-select"><option>Active</option><option>Inactive</option><option>Blocked</option></select></div></div></div>
          <div className="modal-footer"><button className="btn btn-outline-light" data-bs-dismiss="modal">Cancel</button><button className="btn btn-primary" data-bs-dismiss="modal">Save Customer</button></div>
        </div></div></div>
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
