
import React, { useEffect, useState } from 'react'
import axios from "axios";

const API = "http://localhost:7001/Product";

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [stockAction, setStockAction] = useState("add");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/view`);

      setProducts(response.data.products || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Stock Status
  const getStockStatus = (qty) => {
    if (Number(qty) > 10) {
      return "In Stock";
    } else if (Number(qty) > 0) {
      return "Low Stock";
    } else {
      return "Out of Stock";
    }
  };

  // Filter Products
  const filteredProducts = products.filter((product) => {
    const productName = product.product_name || "";
    const categoryName = product.categoryId?.category_name || "No category";
    const stockStatus = getStockStatus(product.product_qty ?? 0);

    const matchesSearch =
      productName.toLowerCase().includes(search.toLowerCase()) ||
      categoryName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All statuses" ||
      stockStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Open Stock Modal
  const openStockModal = (product = null) => {
    setMessage("");
    setSelectedProductId(product?._id || products[0]?._id || "");
    setStockAction("add");
    setQuantity("");
    setNote("");
  };

  // Update Stock
  const updateStock = async () => {
    try {
      setMessage("");

      if (!selectedProductId) {
        setMessage("Please select a product.");
        return;
      }

      if (quantity === "" || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
        setMessage("Please enter a valid quantity greater than zero.");
        return;
      }

      const selectedProduct = products.find(
        (product) => product._id === selectedProductId
      );

      if (!selectedProduct) {
        setMessage("Selected product was not found.");
        return;
      }

      const currentQuantity = Number(selectedProduct.product_qty) || 0;
      const enteredQuantity = Number(quantity);

      const updatedQuantity =
        stockAction === "add"
          ? currentQuantity + enteredQuantity
          : currentQuantity - enteredQuantity;

      if (updatedQuantity < 0) {
        setMessage("Stock quantity cannot be less than zero.");
        return;
      }

      setSaving(true);

      // Send all product fields because the existing
      // UpdateProduct controller updates the product document.
      const payload = {
        pname: selectedProduct.product_name,
        pdesc: selectedProduct.product_desc || "",
        pprice: selectedProduct.product_price,
        pqty: updatedQuantity,
        brand: selectedProduct.brand || "",
        color: selectedProduct.color || "",
        sizes: selectedProduct.sizes || [],
        catid:
          selectedProduct.categoryId?._id ||
          selectedProduct.categoryId ||
          ""
      };

      const response = await axios.put(
        `${API}/update/${selectedProductId}`,
        payload
      );

      setMessage(
        response.data.message || "Stock updated successfully."
      );

      await fetchProducts();

      setQuantity("");
      setNote("");

      const modalElement = document.getElementById("stock-modal");

      if (modalElement && window.bootstrap?.Modal) {
        const modalInstance =
          window.bootstrap.Modal.getInstance(modalElement);

        if (modalInstance) {
          modalInstance.hide();
        }
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to update stock. Please check your server."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="container-fluid position-relative d-flex p-0">
        {/* Spinner Start */}
        {loading && (
          <div
            id="spinner"
            className="bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
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
          <div className="container-fluid pt-4 px-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div>
                <h4 className="mb-1">Manage Stock</h4>
                <p className="mb-0 text-muted-2">
                  Track inventory levels and record stock movements.
                </p>
              </div>

              <div className="d-flex gap-2 no-print">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#stock-modal"
                  onClick={() => openStockModal()}
                  disabled={products.length === 0}
                >
                  <i className="fa fa-plus me-2" />
                  Add Stock Entry
                </button>
              </div>
            </div>

            {message && (
              <div className="alert alert-info alert-dismissible fade show">
                {message}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMessage("")}
                />
              </div>
            )}

            <div className="row g-4 mb-4">
              <div className="col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-icon ic-primary">
                    <i className="fa fa-box" />
                  </div>
                  <div>
                    <p>Total Products</p>
                    <h4>{products.length}</h4>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-icon ic-success">
                    <i className="fa fa-check-circle" />
                  </div>
                  <div>
                    <p>In Stock</p>
                    <h4>
                      {products.filter(
                        (product) => Number(product.product_qty) > 10
                      ).length}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-icon ic-warning">
                    <i className="fa fa-exclamation-triangle" />
                  </div>
                  <div>
                    <p>Low Stock</p>
                    <h4>
                      {products.filter(
                        (product) =>
                          Number(product.product_qty) > 0 &&
                          Number(product.product_qty) <= 10
                      ).length}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-xl-3">
                <div className="stat-card">
                  <div className="stat-icon ic-danger">
                    <i className="fa fa-times-circle" />
                  </div>
                  <div>
                    <p>Out of Stock</p>
                    <h4>
                      {products.filter(
                        (product) => Number(product.product_qty) <= 0
                      ).length}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded p-4">
              <div className="d-flex flex-wrap gap-2 mb-3 no-print">
                <input
                  className="form-control"
                  style={{ maxWidth: 280 }}
                  type="search"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  className="form-select"
                  style={{ maxWidth: 220 }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All statuses</option>
                  <option>In Stock</option>
                  <option>Low Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>

              <div className="table-responsive">
                <table className="table table-hover" id="stock-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Reorder Level</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="8">Loading stock...</td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="8">No products found.</td>
                      </tr>
                    ) : (
                      filteredProducts.map((product, index) => (
                        <tr key={product._id}>
                          <td>{index + 1}</td>

                          <td>
                            <strong>{product.product_name}</strong>
                          </td>

                          <td>—</td>

                          <td>
                            {product.categoryId?.category_name ||
                              "No category"}
                          </td>

                          <td>{product.product_qty ?? 0}</td>

                          <td>10</td>

                          <td>
                            <span
                              className={
                                Number(product.product_qty) > 10
                                  ? "sbadge s-success"
                                  : Number(product.product_qty) > 0
                                  ? "sbadge s-warning"
                                  : "sbadge s-danger"
                              }
                            >
                              {getStockStatus(product.product_qty ?? 0)}
                            </span>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-light"
                              data-bs-toggle="modal"
                              data-bs-target="#stock-modal"
                              onClick={() => openStockModal(product)}
                            >
                              <i className="fa fa-sliders-h me-1" />
                              Update
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Stock Modal Start */}
          <div
            className="modal fade"
            id="stock-modal"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Stock</h5>

                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Product</label>

                      <select
                        className="form-select"
                        value={selectedProductId}
                        onChange={(e) =>
                          setSelectedProductId(e.target.value)
                        }
                      >
                        <option value="">Select Product</option>

                        {products.map((product) => (
                          <option key={product._id} value={product._id}>
                            {product.product_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Action</label>

                      <select
                        className="form-select"
                        value={stockAction}
                        onChange={(e) => setStockAction(e.target.value)}
                      >
                        <option value="add">
                          Add stock (purchase / return)
                        </option>

                        <option value="remove">
                          Remove stock (damage / adjustment)
                        </option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Quantity</label>

                      <input
                        type="number"
                        min="1"
                        step="1"
                        className="form-control"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Note</label>

                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Supplier reference / reason"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    data-bs-dismiss="modal"
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateStock}
                    disabled={saving || products.length === 0}
                  >
                    {saving ? "Updating..." : "Update Stock"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Stock Modal End */}

          {/* Footer Start */}
          <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary rounded-top p-4">
              <div className="row">
                <div className="col-12 col-sm-6 text-center text-sm-start">
                  © <a href="#">Your Site Name</a>, All Right Reserved.
                </div>

                <div className="col-12 col-sm-6 text-center text-sm-end">
                  {/* Keep the template attribution */}
                  Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                  <br />
                  Distributed By:{" "}
                  <a href="https://themewagon.com" target="_blank" rel="noreferrer">
                    ThemeWagon
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Footer End */}
        </div>
        {/* Content End */}

        {/* Back to Top */}
        <a
          href="#"
          className="btn btn-lg btn-primary btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up" />
        </a>
      </div>

      {/* JavaScript Libraries */}
    </div>
  )
}
