import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = "http://localhost:7001/Order"

export default function Payments() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterMethod, setFilterMethod] = useState("All methods")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)

      const res = await axios.get(`${API}/all`)

      setOrders(res.data.orders || [])
    } catch (error) {
      console.error("Error fetching payments:", error)
      setMessage("Unable to load payment records. Check your backend server.")
    } finally {
      setLoading(false)
    }
  }

  const getCustomerName = (order) => {
    const customer = order.userId

    if (customer && typeof customer === "object") {
      return customer.name || customer.username || customer.email || "Customer"
    }

    return "Customer"
  }

  const getPaymentMethod = (order) => {
    const method =
      order.paymentMethod ||
      order.shippingAddress?.paymentMethod ||
      order.payment?.method ||
      ""

    if (!method) return "Not recorded"

    const value = String(method).toLowerCase()

    if (value === "cod" || value.includes("cash on delivery")) {
      return "Cash on Delivery"
    }

    if (value.includes("credit")) return "Credit Card"
    if (value.includes("debit")) return "Debit Card"
    if (value === "upi") return "UPI"
    if (value.includes("net banking")) return "Net Banking"
    if (value.includes("paypal")) return "PayPal"
    if (value.includes("online")) return "Online Payment"

    return method
  }

  const getPaymentStatus = (order) => {
    return (
      order.paymentStatus ||
      order.payment?.status ||
      (order.paymentMethod === "cod" ? "Pending" : "Not recorded")
    )
  }

  const getDate = (order) => {
    const date = order.date || order.createdAt

    return date
      ? new Date(date).toLocaleDateString("en-IN")
      : "N/A"
  }

  const getAmount = (status) => {
    return orders.reduce((total, order) => {
      if (
        getPaymentStatus(order).toLowerCase() === status.toLowerCase()
      ) {
        return total + Number(order.totalAmount || 0)
      }

      return total
    }, 0)
  }

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR"
    })
  }

  const getStatusClass = (status) => {
    switch (String(status).toLowerCase()) {
      case "paid":
      case "completed":
      case "success":
        return "s-success"

      case "pending":
        return "s-warning"

      case "failed":
        return "s-danger"

      case "refunded":
        return "s-secondary"

      default:
        return "s-info"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const customer = getCustomerName(order).toLowerCase()
    const orderId = String(order._id || "").toLowerCase()
    const method = getPaymentMethod(order).toLowerCase()
    const transactionId = String(
      order.transactionId || order.payment?.transactionId || ""
    ).toLowerCase()

    const text = search.toLowerCase()

    return (
      (
        customer.includes(text) ||
        orderId.includes(text) ||
        transactionId.includes(text)
      ) &&
      (
        filterMethod === "All methods" ||
        method === filterMethod.toLowerCase()
      )
    )
  })

  return (
    <div className="container-fluid position-relative d-flex p-0">

      {/* Sidebar and Main Content */}
      <div className="content w-100">

        {/* Navbar Start */}
        <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">

          <a href="/" className="navbar-brand d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0">
              <i className="fa fa-shoe-prints" />
            </h2>
          </a>

          <a href="#" className="sidebar-toggler flex-shrink-0">
            <i className="fa fa-bars" />
          </a>

          <form className="d-none d-md-flex ms-4">
            <input
              className="form-control bg-dark border-0"
              type="search"
              placeholder="Search"
            />
          </form>

          <div className="navbar-nav align-items-center ms-auto">

            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-envelope me-lg-2" />
                <span className="d-none d-lg-inline-flex">Messages</span>
              </a>

              <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                <a href="#" className="dropdown-item">
                  <h6 className="fw-normal mb-0">New message received</h6>
                  <small>15 minutes ago</small>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item text-center">
                  See all messages
                </a>
              </div>
            </div>

            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-bell me-lg-2" />
                <span className="d-none d-lg-inline-flex">Notifications</span>
              </a>

              <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                <a href="#" className="dropdown-item">
                  <h6 className="fw-normal mb-0">Payment page opened</h6>
                  <small>Recently</small>
                </a>
                <hr className="dropdown-divider" />
                <a href="#" className="dropdown-item text-center">
                  See all notifications
                </a>
              </div>
            </div>

            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <img
                  className="rounded-circle me-lg-2"
                  src="img/user.jpg"
                  alt="User"
                  style={{ width: 40, height: 40 }}
                />
                <span className="d-none d-lg-inline-flex">John Doe</span>
              </a>

              <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                <a href="#" className="dropdown-item">My Profile</a>
                <a href="#" className="dropdown-item">Settings</a>
                <a href="/signin" className="dropdown-item">Log Out</a>
              </div>
            </div>

          </div>
        </nav>
        {/* Navbar End */}

        {/* Payment Content Start */}
        <div className="container-fluid pt-4 px-4">

          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <div>
              <h4 className="mb-1">Manage Payments</h4>
              <p className="mb-0 text-muted-2">
                View payment records and monitor transaction statuses.
              </p>
            </div>

            <div className="d-flex gap-2 no-print">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={fetchPayments}
              >
                <i className="fa fa-refresh me-2" />
                Refresh
              </button>

              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => window.print()}
              >
                <i className="fa fa-print me-2" />
                Print
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="alert alert-warning">
              {message}
              <button
                type="button"
                className="btn-close float-end"
                onClick={() => setMessage("")}
              />
            </div>
          )}

          {/* Summary Cards */}
          <div className="row g-4 mb-4">

            <div className="col-sm-6 col-xl-3">
              <div className="stat-card">
                <div className="stat-icon ic-primary">
                  <i className="fa fa-wallet" />
                </div>
                <div>
                  <p>Total Received</p>
                  <h4>{formatAmount(getAmount("Paid"))}</h4>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="stat-card">
                <div className="stat-icon ic-warning">
                  <i className="fa fa-clock" />
                </div>
                <div>
                  <p>Pending</p>
                  <h4>{formatAmount(getAmount("Pending"))}</h4>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="stat-card">
                <div className="stat-icon ic-success">
                  <i className="fa fa-undo" />
                </div>
                <div>
                  <p>Refunded</p>
                  <h4>{formatAmount(getAmount("Refunded"))}</h4>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="stat-card">
                <div className="stat-icon ic-danger">
                  <i className="fa fa-ban" />
                </div>
                <div>
                  <p>Failed</p>
                  <h4>{formatAmount(getAmount("Failed"))}</h4>
                </div>
              </div>
            </div>

          </div>

          {/* Payment Table */}
          <div className="bg-secondary rounded p-4">

            <div className="d-flex flex-wrap gap-2 mb-3 no-print">

              <input
                className="form-control"
                style={{ maxWidth: 280 }}
                type="search"
                placeholder="Search transaction, order or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                className="form-select"
                style={{ maxWidth: 220 }}
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
              >
                <option>All methods</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
                <option>PayPal</option>
                <option>Cash on Delivery</option>
                <option>Online Payment</option>
                <option>Not recorded</option>
              </select>

            </div>

            <div className="table-responsive">

              <table className="table table-hover" id="payment-table">

                <thead>
                  <tr>
                    <th>Transaction</th>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        Loading payments...
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No payment records found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const customer = getCustomerName(order)
                      const status = getPaymentStatus(order)

                      return (
                        <tr key={order._id}>

                          <td>
                            <strong>
                              {order.transactionId ||
                                order.payment?.transactionId ||
                                "Not recorded"}
                            </strong>
                          </td>

                          <td>
                            <strong>
                              #{String(order._id).slice(-8).toUpperCase()}
                            </strong>
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span
                                className="avatar"
                                style={{ background: "#6C63FF" }}
                              >
                                {customer
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </span>
                              <span>{customer}</span>
                            </div>
                          </td>

                          <td>{getPaymentMethod(order)}</td>

                          <td>{formatAmount(order.totalAmount)}</td>

                          <td>{getDate(order)}</td>

                          <td>
                            <span className={`sbadge ${getStatusClass(status)}`}>
                              {status}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex gap-1">
                              <button
                                type="button"
                                className="act-btn"
                                title="View"
                                data-bs-toggle="modal"
                                data-bs-target="#pay-modal"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <i className="fa fa-eye" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      )
                    })
                  )}

                </tbody>

              </table>

            </div>
          </div>

        </div>
        {/* Payment Content End */}

        {/* Payment Details Modal */}
        <div
          className="modal fade"
          id="pay-modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Payment Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">

                {selectedOrder ? (
                  <div className="row g-3">

                    <div className="col-6">
                      <small className="text-muted-2">Transaction ID</small>
                      <h6>
                        {selectedOrder.transactionId ||
                          selectedOrder.payment?.transactionId ||
                          "Not recorded"}
                      </h6>
                    </div>

                    <div className="col-6">
                      <small className="text-muted-2">Amount</small>
                      <h6>{formatAmount(selectedOrder.totalAmount)}</h6>
                    </div>

                    <div className="col-6">
                      <small className="text-muted-2">Order ID</small>
                      <h6>
                        #{String(selectedOrder._id).slice(-8).toUpperCase()}
                      </h6>
                    </div>

                    <div className="col-6">
                      <small className="text-muted-2">Customer</small>
                      <h6>{getCustomerName(selectedOrder)}</h6>
                    </div>

                    <div className="col-6">
                      <small className="text-muted-2">Payment Method</small>
                      <h6>{getPaymentMethod(selectedOrder)}</h6>
                    </div>

                    <div className="col-6">
                      <small className="text-muted-2">Payment Status</small>
                      <h6>
                        <span
                          className={`sbadge ${getStatusClass(
                            getPaymentStatus(selectedOrder)
                          )}`}
                        >
                          {getPaymentStatus(selectedOrder)}
                        </span>
                      </h6>
                    </div>

                    <div className="col-6">
                      <small className="text-muted-2">Order Date</small>
                      <h6>{getDate(selectedOrder)}</h6>
                    </div>

                    <div className="col-6">
                      <small className="text-muted-2">Order Status</small>
                      <h6>{selectedOrder.orderStatus || "Not recorded"}</h6>
                    </div>

                  </div>
                ) : (
                  <p>No payment selected.</p>
                )}

              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
        {/* Payment Details Modal End */}

        {/* Footer Start */}
        <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary rounded-top p-4">
            <div className="row">
              <div className="col-12 col-sm-6 text-center text-sm-start">
                &copy; <a href="#">Your Website</a>, All Rights Reserved.
              </div>
              <div className="col-12 col-sm-6 text-center text-sm-end">
                Designed for your admin dashboard
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}

      </div>

      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-lg btn-primary btn-lg-square back-to-top"
      >
        <i className="bi bi-arrow-up" />
      </a>

    </div>
  )
}
