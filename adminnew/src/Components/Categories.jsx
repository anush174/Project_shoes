
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7001/Category";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch categories from MongoDB
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API}/view`);
            setCategories(response.data.categories || []);
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to load categories. Check your backend."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Add or update category
    const saveCategory = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                category_name: categoryName,
                description: description
            };

            if (editId) {
                await axios.put(
                    `${API}/update/${editId}`,
                    formData
                );
                setMessage("Category updated successfully");
            } else {
                await axios.post(`${API}/add`, formData);
                setMessage("Category added successfully");
            }

            resetForm();
            await fetchCategories();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to save category"
            );
        }
    };

    // Load selected category into the form
    const editCategory = (category) => {
        setEditId(category._id);
        setCategoryName(category.category_name || "");
        setDescription(category.description || "");

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Delete category
    const deleteCategory = async (id) => {
        if (!window.confirm("Delete this category?")) return;

        try {
            await axios.delete(`${API}/delete/${id}`);
            setMessage("Category deleted successfully");
            await fetchCategories();
        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Failed to delete category"
            );
        }
    };

    const resetForm = () => {
        setEditId(null);
        setCategoryName("");
        setDescription("");
    };

    return (
        <div className="container-fluid pt-4 px-4">
            <h4>Manage Categories</h4>

            {message && (
                <div className="alert alert-info">
                    {message}
                </div>
            )}

            {/* Add / Edit form */}
            <div className="bg-secondary rounded p-4 mb-4">
                <h5>
                    {editId ? "Edit Category" : "Add Category"}
                </h5>

                <form onSubmit={saveCategory}>
                    <div className="mb-3">
                        <label className="form-label">
                            Category Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter category name"
                            value={categoryName}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            placeholder="Enter category description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            rows={3}
                        />
                    </div>

                    <button
                        className="btn btn-primary me-2"
                        type="submit"
                    >
                        {editId ? "Update Category" : "Add Category"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* Categories table */}
            <div className="bg-secondary rounded p-4">
                <h5>Category List</h5>

                {loading ? (
                    <p>Loading categories...</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={category._id}>
                                        <td>{index + 1}</td>
                                        <td>{category.category_name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() =>
                                                    editCategory(category)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() =>
                                                    deleteCategory(category._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan="4">
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
