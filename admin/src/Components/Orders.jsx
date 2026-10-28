
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = "http://localhost:7001/Order"

export default function Orders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("All statuses")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [newStatus, setNewStatus] = useState("Pending")
  const [message, setMessage] = useState("")

  // Fetch all orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true)

      const res = await axios.get(`${API}/all`)

      setOrders(res.data.orders || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
      setMessage("Failed to fetch orders. Check your backend server.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Get customer name
  const getCustomerName = (order) => {
    const customer = order.userId

    if (customer && typeof customer === "object") {
      return (
        customer.name ||
        customer.username ||
        customer.fullName ||
        customer.email ||
        "Customer"
      )
    }

    return "Customer"
  }

  // Get order date
  const getOrderDate = (order) => {
    if (!order.date && !order.createdAt) {
      return "N/A"
    }

    return new Date(order.date || order.createdAt).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    )
  }

  // Get product quantity
  const getItemCount = (order) => {
    return (order.items || []).reduce(
      (total, item) => total + Number(item.quantity || 1),
      0
    )
  }

  // Get status class
  const getStatusClass = (status) => {
    switch ((status || "Pending").toLowerCase()) {
      case "pending":
        return "s-warning"
      case "processing":
        return "s-info"
      case "shipped":
        return "s-primary"
      case "delivered":
        return "s-success"
      case "cancelled":
        return "s-danger"
      default:
        return "s-secondary"
    }
  }

  // Search and filter orders
  const filteredOrders = orders.filter((order) => {
    const customerName = getCustomerName(order)
    const orderId = order._id || ""
    const status = order.orderStatus || "Pending"

    const searchText = search.toLowerCase()

    const matchesSearch =
      orderId.toLowerCase().includes(searchText) ||
      customerName.toLowerCase().includes(searchText)

    const matchesStatus =
      filterStatus === "All statuses" ||
      status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Update order status in backend
  const handleUpdateOrder = async () => {
    if (!selectedOrder) return

    try {
      await axios.put(
        `${API}/status/${selectedOrder._id}`,
        {
          orderStatus: newStatus
        }
      )

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, orderStatus: newStatus }
            : order
        )
      )

      setSelectedOrder({
        ...selectedOrder,
        orderStatus: newStatus
      })

      setMessage("Order status updated successfully.")

      const modalElement = document.getElementById("order-modal")

      if (modalElement && window.bootstrap) {
        window.bootstrap.Modal.getInstance(modalElement)?.hide()
      }
    } catch (error) {
      console.error("Error updating order:", error)
      setMessage(
        error.response?.data?.message || "Failed to update order status."
      )
    }
  }

  const openOrderModal = (order) => {
    setSelectedOrder(order)
    setNewStatus(order.orderStatus || "Pending")
  }

  return (
    <div>
      <div className="container-fluid position-relative d-flex p-0">

        {/* Spinner Start */}
        {loading && (
          <div
            id="spinner"
            className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            style={{ zIndex: 9999 }}
          >
            <div
              className="spinner-border text-primary"
              style={{ width: '3rem', height: '3rem' }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {/* Spinner End */}

        {/* Sidebar Start */}

        {/* Sidebar End */}

        {/* Content Start */}
        <div className="content">

          {/* Navbar Start */}
          <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
            <a href="/" className="navbar-brand d-flex d-lg-none me-4">
              <h2 className="text-primary mb-0">
                <i className="fa fa-user-edit" />
              </h2>
            </a>

            <a
              href="#"
              className="sidebar-toggler flex-shrink-0"
              onClick={(e) => e.preventDefault()}
            >
              <i className="fa fa-bars" />
            </a>

            <form
              className="d-none d-md-flex ms-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="form-control bg-dark border-0"
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                  <span className="d-none d-lg-inline-flex">Message</span>
                </a>

                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <a href="#" className="dropdown-item">
                    No new messages
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
                  <span className="d-none d-lg-inline-flex">Notification</span>
                </a>

                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                  <a href="#" className="dropdown-item">
                    <h6 className="fw-normal mb-0">Order management</h6>
                    <small>View and update customer orders</small>
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
                    alt="Admin"
                    style={{ width: 40, height: 40 }}
                  />
                  <span className="d-none d-lg-inline-flex">Admin</span>
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

          <div className="container-fluid pt-4 px-4">

            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div>
                <h4 className="mb-1">Manage Orders</h4>
                <p className="mb-0 text-muted-2">
                  View orders and update their fulfilment status.
                </p>
              </div>

              <div className="d-flex gap-2 no-print">
                <button
                  className="btn btn-outline-light"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print me-2" />
                  Print
                </button>

                <button
                  className="btn btn-outline-light"
                  onClick={fetchOrders}
                >
                  <i className="fa fa-refresh me-2" />
                  Refresh
                </button>
              </div>
            </div>

            {message && (
              <div className="alert alert-info alert-dismissible">
                {message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage("")}
                />
              </div>
            )}

            {/* Order Summary Cards */}
            <div className="row g-4 mb-4">

              <div className="col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-icon ic-primary">
                    <i className="fa fa-shopping-cart" />
                  </div>
                  <div>
                    <p>Total Orders</p>
                    <h4>{orders.length}</h4>
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
                    <h4>
                      {orders.filter(
                        (order) =>
                          (order.orderStatus || "Pending").toLowerCase() === "pending"
                      ).length}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-icon ic-success">
                    <i className="fa fa-truck" />
                  </div>
                  <div>
                    <p>Delivered</p>
                    <h4>
                      {orders.filter(
                        (order) =>
                          (order.orderStatus || "").toLowerCase() === "delivered"
                      ).length}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-icon ic-danger">
                    <i className="fa fa-ban" />
                  </div>
                  <div>
                    <p>Cancelled</p>
                    <h4>
                      {orders.filter(
                        (order) =>
                          (order.orderStatus || "").toLowerCase() === "cancelled"
                      ).length}
                    </h4>
                  </div>
                </div>
              </div>

            </div>

            {/* Orders Table */}
            <div className="bg-secondary rounded p-4">

              <div className="d-flex flex-wrap gap-2 mb-3 no-print">

                <input
                  className="form-control"
                  style={{ maxWidth: 280 }}
                  type="search"
                  placeholder="Search order ID or customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  className="form-select"
                  style={{ maxWidth: 220 }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option>All statuses</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

              </div>

              <div className="table-responsive">
                <table className="table table-hover" id="order-table">

                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          Loading orders...
                        </td>
                      </tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order, index) => {
                        const customerName = getCustomerName(order)
                        const status = order.orderStatus || "Pending"
                        const paymentMethod =
                          order.shippingAddress?.paymentMethod ||
                          order.paymentMethod ||
                          "N/A"

                        return (
                          <tr key={order._id}>
                            <td>
                              <strong>
                                #{String(order._id).slice(-8).toUpperCase()}
                              </strong>
                            </td>

                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <span
                                  className="avatar"
                                  style={{ background: '#6C63FF' }}
                                >
                                  {customerName
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </span>
                                <span>{customerName}</span>
                              </div>
                            </td>

                            <td>{getOrderDate(order)}</td>

                            <td>{getItemCount(order)}</td>

                            <td>
                              ₹{Number(order.totalAmount || 0).toFixed(2)}
                            </td>

                            <td>
                              <span className="sbadge s-secondary">
                                {paymentMethod}
                              </span>
                            </td>

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
                                  data-bs-target="#order-modal"
                                  onClick={() => openOrderModal(order)}
                                >
                                  <i className="fa fa-eye" />
                                </button>

                                <button
                                  type="button"
                                  className="act-btn"
                                  title="Edit"
                                  data-bs-toggle="modal"
                                  data-bs-target="#order-modal"
                                  onClick={() => openOrderModal(order)}
                                >
                                  <i className="fa fa-pen" />
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

          {/* Order Details Modal */}
          <div
            className="modal fade"
            id="order-modal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Order Details</h5>
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
                        <small className="text-muted-2">Order Date</small>
                        <h6>{getOrderDate(selectedOrder)}</h6>
                      </div>

                      <div className="col-6">
                        <small className="text-muted-2">Total Amount</small>
                        <h6>
                          ₹{Number(selectedOrder.totalAmount || 0).toFixed(2)}
                        </h6>
                      </div>

                      <div className="col-12">
                        <small className="text-muted-2">Shipping Address</small>
                        <p>
                          {typeof selectedOrder.shippingAddress === "object"
                            ? [
                                selectedOrder.shippingAddress.address1,
                                selectedOrder.shippingAddress.address2,
                                selectedOrder.shippingAddress.city,
                                selectedOrder.shippingAddress.district,
                                selectedOrder.shippingAddress.postcode
                              ]
                                .filter(Boolean)
                                .join(", ") || "Address not available"
                            : selectedOrder.shippingAddress || "Address not available"}
                        </p>
                      </div>

                      <div className="col-12">
                        <label className="form-label">Order Items</label>

                        <div className="table-responsive">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                              </tr>
                            </thead>

                            <tbody>
                              {(selectedOrder.items || []).map((item, index) => {
                                const product =
                                  item.productId &&
                                  typeof item.productId === "object"
                                    ? item.productId
                                    : null

                                return (
                                  <tr key={item._id || index}>
                                    <td>
                                      {product?.product_name ||
                                        item.product_name ||
                                        "Product"}
                                    </td>
                                    <td>{item.quantity || 1}</td>
                                    <td>
                                      ₹{Number(
                                        item.price ?? product?.product_price ?? 0
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label">Order Status</label>

                        <select
                          className="form-select"
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                        >
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </div>

                    </div>
                  ) : (
                    <p>No order selected.</p>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-outline-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateOrder}
                    disabled={!selectedOrder}
                  >
                    Update Order
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Footer Start */}
          <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary rounded-top p-4">
              <div className="row">
                <div className="col-12 col-sm-6 text-center text-sm-start">
                  © <a href="#">Your Site Name</a>, All Right Reserved.
                </div>

                <div className="col-12 col-sm-6 text-center text-sm-end">
                  Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                  <br />
                  Distributed By: <a href="https://themewagon.com" target="_blank" rel="noreferrer">ThemeWagon</a>
                </div>
              </div>
            </div>
          </div>
          {/* Footer End */}

        </div>
        {/* Content End */}

        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
          <i className="bi bi-arrow-up" />
        </a>

      </div>
    </div>
  )
}
