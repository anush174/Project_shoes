import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = "http://localhost:7001/Cart"

export default function Cart() {

  const [cart, setCart] = useState({ items: [], totalAmount: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [country, setCountry] = useState("India")
  const [postcode, setPostcode] = useState("")

  const getUserId = () => {
    const savedUserId = localStorage.getItem("userId")

    if (savedUserId) {
      return savedUserId
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")
      return user._id || user.userId || ""
    } catch {
      return ""
    }
  }

  const userId = getUserId()

  const fetchCart = async () => {
    if (!userId) {
      setError("Please log in to view your cart.")
      setLoading(false)
      return
    }

    try {
      const response = await axios.get(`${API}/view/${userId}`)
      setCart(response.data.cart || { items: [], totalAmount: 0 })
      setError("")
    } catch (error) {
      console.error("Error fetching cart:", error)

      if (error.response?.status === 404) {
        setCart({ items: [], totalAmount: 0 })
        setError("")
      } else {
        setError("Failed to load cart. Please check your backend.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return

    if (quantity > Number(item.productId?.product_qty ?? 999999)) {
      setMessage("Requested quantity is greater than available stock.")
      return
    }

    try {
      const response = await axios.put(`${API}/update`, {
        userId,
        productId: item.productId._id,
        size: item.size,
        quantity: Number(quantity)
      })

      setCart(response.data.cart)
      setMessage("Cart updated successfully.")
      setError("")
    } catch (error) {
      console.error("Error updating cart:", error)
      setMessage(error.response?.data?.message || "Failed to update quantity.")
    }
  }

  const removeItem = async (item) => {
    try {
      const response = await axios.delete(`${API}/remove`, {
        data: {
          userId,
          productId: item.productId._id,
          size: item.size
        }
      })

      setCart(response.data.cart)
      setMessage("Product removed from cart.")
      setError("")
    } catch (error) {
      console.error("Error removing product:", error)
      setMessage(error.response?.data?.message || "Failed to remove product.")
    }
  }

  const clearCart = async () => {
    if (!userId) return

    try {
      const response = await axios.delete(`${API}/clear/${userId}`)
      setCart(response.data.cart || { items: [], totalAmount: 0 })
      setMessage("Cart cleared successfully.")
      setError("")
    } catch (error) {
      console.error("Error clearing cart:", error)
      setMessage(error.response?.data?.message || "Failed to clear cart.")
    }
  }

  const subtotal = (cart.items || []).reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  )

  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 50
  const total = subtotal + shipping

  return (
    <div>
      <div>
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Shopping Cart</h1>
                <nav className="d-flex align-items-center">
                  <a href="/">Home<span className="lnr lnr-arrow-right" /></a>
                  <a href="/cart">Cart</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}

        {/*================Cart Area =================*/}
        <section className="cart_area">
          <div className="container">
            <div className="cart_inner">
              {loading && <p>Loading cart...</p>}

              {error && <p className="text-danger">{error}</p>}

              {message && (
                <p className="text-success">{message}</p>
              )}

              {!loading && !error && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Size</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {(cart.items || []).map((item, index) => {
                        const product = item.productId || {}
                        const image = product.product_image
                          ? product.product_image.startsWith("http")
                            ? product.product_image
                            : `http://localhost:7001/uploads/${product.product_image}`
                          : "/assets/img/cart.jpg"

                        return (
                          <tr key={`${product._id || index}-${item.size}`}>
                            <td>
                              <div className="media">
                                <div className="d-flex">
                                  <img
                                    src={image}
                                    alt={product.product_name || "Product"}
                                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                                    onError={(e) => {
                                      e.currentTarget.onerror = null
                                      e.currentTarget.src = "/assets/img/cart.jpg"
                                    }}
                                  />
                                </div>

                                <div className="media-body">
                                  <p>{product.product_name || "Product unavailable"}</p>
                                </div>
                              </div>
                            </td>

                            <td>
                              <h5>₹{Number(item.price || 0).toLocaleString("en-IN")}</h5>
                            </td>

                            <td>
                              <h5>{item.size || "N/A"}</h5>
                            </td>

                            <td>
                              <div className="product_count">
                                <button
                                  className="increase items-count"
                                  type="button"
                                  onClick={() => updateQuantity(item, Number(item.quantity) + 1)}
                                  disabled={Number(item.quantity) >= Number(product.product_qty ?? 999999)}
                                >
                                  <i className="lnr lnr-chevron-up" />
                                </button>

                                <input
                                  type="number"
                                  min="1"
                                  max={product.product_qty ?? 999999}
                                  value={item.quantity}
                                  title="Quantity"
                                  className="input-text qty"
                                  onChange={(e) => {
                                    const quantity = Number(e.target.value)
                                    if (Number.isInteger(quantity) && quantity >= 1) {
                                      updateQuantity(item, quantity)
                                    }
                                  }}
                                />

                                <button
                                  className="reduced items-count"
                                  type="button"
                                  onClick={() => {
                                    if (Number(item.quantity) > 1) {
                                      updateQuantity(item, Number(item.quantity) - 1)
                                    }
                                  }}
                                  disabled={Number(item.quantity) <= 1}
                                >
                                  <i className="lnr lnr-chevron-down" />
                                </button>
                              </div>
                            </td>

                            <td>
                              <h5>
                                ₹{(Number(item.price || 0) * Number(item.quantity || 0)).toLocaleString("en-IN")}
                              </h5>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="gray_btn"
                                onClick={() => removeItem(item)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        )
                      })}

                      {(cart.items || []).length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Your cart is empty.
                            <p>
                              <a className="primary-btn" href="/shops">
                                Continue Shopping
                              </a>
                            </p>
                          </td>
                        </tr>
                      )}

                      <tr className="bottom_button">
                        <td>
                          <button
                            type="button"
                            className="gray_btn"
                            onClick={fetchCart}
                          >
                            Update Cart
                          </button>
                        </td>
                        <td colSpan="4" />
                        <td>
                          <button
                            type="button"
                            className="gray_btn"
                            onClick={clearCart}
                            disabled={(cart.items || []).length === 0}
                          >
                            Clear Cart
                          </button>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="3" />
                        <td>
                          <h5>Subtotal</h5>
                        </td>
                        <td colSpan="2">
                          <h5>₹{subtotal.toLocaleString("en-IN")}</h5>
                        </td>
                      </tr>

                      <tr className="shipping_area">
                        <td colSpan="3" />
                        <td>
                          <h5>Shipping</h5>
                        </td>
                        <td colSpan="2">
                          <div className="shipping_box">
                            <ul className="list">
                              <li>
                                <span>
                                  {shipping === 0
                                    ? "Free Shipping"
                                    : `Flat Rate: ₹${shipping}`}
                                </span>
                              </li>
                            </ul>

                            <h6>
                              Calculate Shipping{" "}
                              <i className="fa fa-caret-down" aria-hidden="true" />
                            </h6>

                            <select
                              className="shipping_select"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option value="India">India</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Pakistan">Pakistan</option>
                            </select>

                            <input
                              type="text"
                              placeholder="Postcode/Zipcode"
                              value={postcode}
                              onChange={(e) => setPostcode(e.target.value)}
                            />
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="3" />
                        <td>
                          <h5>Total</h5>
                        </td>
                        <td colSpan="2">
                          <h5>₹{total.toLocaleString("en-IN")}</h5>
                        </td>
                      </tr>

                      <tr className="out_button_area">
                        <td colSpan="3" />
                        <td colSpan="3">
                          <div className="checkout_btn_inner d-flex align-items-center">
                            <a className="gray_btn" href="/shops">
                              Continue Shopping
                            </a>

                            <a
                              className="primary-btn"
                              href="/checkout"
                              onClick={(e) => {
                                if ((cart.items || []).length === 0) {
                                  e.preventDefault()
                                  setMessage("Please add a product before checkout.")
                                }
                              }}
                            >
                              Proceed to checkout
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}