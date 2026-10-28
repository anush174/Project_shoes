import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7001/Product";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pname, setPname] = useState("");
    const [pdesc, setPdesc] = useState("");
    const [pprice, setPprice] = useState("");
    const [pqty, setPqty] = useState("");
    const [catid, setCatid] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [sizes, setSizes] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                "http://localhost:7001/Category/view"
            );
            setCategories(response.data.categories || []);
        } catch (error) {
            setMessage("Failed to fetch categories");
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Add or Update Product
    const saveProduct = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                pname,
                pdesc,
                pprice: Number(pprice),
                pqty: Number(pqty),
                catid,
                brand,
                color,
                sizes: sizes.split(",").map(size => size.trim()).filter(Boolean)
            };

            if (editId) {
                await axios.put(
                    `${API}/update/${editId}`,
                    productData
                );
                setMessage("Product updated successfully");
            } else {
                await axios.post(`${API}/add`, productData);
                setMessage("Product added successfully");
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to save product"
            );
        }
    };

    // Edit Product
    const editProduct = (product) => {
        setEditId(product._id);
        setPname(product.product_name || "");
        setPdesc(product.product_desc || "");
        setPprice(product.product_price || "");
        setPqty(product.product_qty || "");
        setCatid(product.categoryId?._id || product.categoryId || "");
        setBrand(product.brand || "");
        setColor(product.color || "");
        setSizes(
            Array.isArray(product.sizes)
                ? product.sizes.join(", ")
                : product.sizes || ""
        );

        window.scrollTo({ top: 0, behavior: "smooth" });

        const modalElement = document.getElementById("prod-modal");
        if (modalElement && window.bootstrap) {
            window.bootstrap.Modal.getOrCreateInstance(
                modalElement
            ).show();
        }
    };

    // Delete Product
    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            await axios.delete(`${API}/delete/${id}`);
            setMessage("Product deleted successfully");
            fetchProducts();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete product"
            );
        }
    };

    // Reset Form
    const resetForm = () => {
        setEditId(null);
        setPname("");
        setPdesc("");
        setPprice("");
        setPqty("");
        setCatid("");
        setBrand("");
        setColor("");
        setSizes("");
    };

    return (
        <div className="container-fluid pt-4 px-4">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                <div>
                    <h4 className="mb-1">Manage Products</h4>
                    <p className="mb-0 text-muted-2">
                        Add, edit and remove products from your catalogue.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#prod-modal"
                    onClick={resetForm}
                >
                    <i className="fa fa-plus me-2" />
                    Add Product
                </button>
            </div>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            <div className="bg-secondary rounded p-4">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7">Loading products...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="7">No products found.</td>
                                </tr>
                            ) : (
                                products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <strong>
                                                {product.product_name}
                                            </strong>
                                        </td>

                                        <td>
                                            {product.categoryId?.category_name ||
                                                "No category"}
                                        </td>

                                        <td>₹{product.product_price}</td>

                                        <td>{product.product_qty}</td>

                                        <td>
                                            <span
                                                className={
                                                    product.product_qty > 10
                                                        ? "sbadge s-success"
                                                        : product.product_qty > 0
                                                        ? "sbadge s-warning"
                                                        : "sbadge s-danger"
                                                }
                                            >
                                                {product.product_qty > 10
                                                    ? "In Stock"
                                                    : product.product_qty > 0
                                                    ? "Low Stock"
                                                    : "Out of Stock"}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="d-flex gap-1">
                                                <button
                                                    type="button"
                                                    className="act-btn"
                                                    title="Edit"
                                                    onClick={() =>
                                                        editProduct(product)
                                                    }
                                                >
                                                    <i className="fa fa-pen" />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="act-btn del"
                                                    title="Delete"
                                                    onClick={() =>
                                                        deleteProduct(product._id)
                                                    }
                                                >
                                                    <i className="fa fa-trash" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className="modal fade"
                id="prod-modal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={saveProduct}>
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {editId ? "Edit Product" : "Add Product"}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    onClick={resetForm}
                                />
                            </div>

                            <div className="modal-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label">
                                            Product name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={pname}
                                            onChange={e =>
                                                setPname(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            className="form-select"
                                            value={catid}
                                            onChange={e =>
                                                setCatid(e.target.value)
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select category
                                            </option>

                                            {categories.map(category => (
                                                <option
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.category_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">
                                            Brand
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={brand}
                                            onChange={e =>
                                                setBrand(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">
                                            Color
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={color}
                                            onChange={e =>
                                                setColor(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">
                                            Price (₹)
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={pprice}
                                            onChange={e =>
                                                setPprice(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label">
                                            Quantity
                                        </label>

                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            value={pqty}
                                            onChange={e =>
                                                setPqty(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Sizes (comma separated)
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="S, M, L or 7, 8, 9"
                                            value={sizes}
                                            onChange={e =>
                                                setSizes(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label">
                                            Description
                                        </label>

                                        <textarea
                                            className="form-control"
                                            rows={3}
                                            value={pdesc}
                                            onChange={e =>
                                                setPdesc(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    data-bs-dismiss="modal"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {editId ? "Update Product" : "Save Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
