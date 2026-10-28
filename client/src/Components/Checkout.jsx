
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = "http://localhost:7001/Order";

export default function Checkout() {

  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    email: "",
    country: "India",
    address1: "",
    address2: "",
    city: "",
    district: "",
    postcode: "",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [sameAddress, setSameAddress] = useState(true);

  // Fetch Cart Products
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      setCart([]);
      setMessage("Unable to load cart products.");
    }
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Cart Total
  const subtotal = cart.reduce((total, item) => {
    const price = Number(
      item.productId?.product_price ??
      item.product_price ??
      item.price ??
      0
    );

    const quantity = Number(item.quantity ?? item.qty ?? 1);

    return total + price * quantity;
  }, 0);

  const shipping = cart.length > 0 ? 50 : 0;
  const totalAmount = subtotal + shipping;

  // Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setMessage("");

    if (cart.length === 0) {
      setMessage("Your cart is empty. Please add products before checkout.");
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.address1.trim() ||
      !formData.city.trim() ||
      !formData.postcode.trim()
    ) {
      setMessage("Please fill in all required billing details.");
      return;
    }

    // Read logged-in user ID
    let userId = localStorage.getItem("userId");

    // Also support a user object stored in localStorage
    if (!userId) {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user") || "null");
        userId = savedUser?._id || savedUser?.userId || null;
      } catch (error) {
        userId = null;
      }
    }

    if (!userId) {
      setMessage("Please log in before placing your order.");
      return;
    }

    const items = cart.map((item) => {
      const productId =
        item.productId?._id ||
        item.productId ||
        item._id ||
        item.product?._id;

      return {
        productId,
        quantity: Number(item.quantity ?? item.qty ?? 1),
        price: Number(
          item.productId?.product_price ??
          item.product_price ??
          item.price ??
          0
        )
      };
    });

    if (items.some((item) => !item.productId)) {
      setMessage("A cart product is missing its product ID. Please refresh your cart.");
      return;
    }

    const shippingAddress = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      phone: formData.phone,
      email: formData.email,
      country: formData.country,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      district: formData.district,
      postcode: formData.postcode,
      notes: formData.notes,
      paymentMethod
    };

    try {
      setLoading(true);

      const response = await axios.post(`${API}/place`, {
        userId,
        items,
        totalAmount,
        shippingAddress
      });

      setMessage(
        response.data.message || "Order placed successfully!"
      );

      // Clear cart only after successful order creation
      localStorage.removeItem("cart");
      setCart([]);

    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Failed to place order. Please check your server and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {/* Start Banner Area */}
        <section className="banner-area organic-breadcrumb">
          <div className="container">
            <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
              <div className="col-first">
                <h1>Checkout</h1>
                <nav className="d-flex align-items-center">
                  <a href="/">Home<span className="lnr lnr-arrow-right" /></a>
                  <a href="/checkout">Checkout</a>
                </nav>
              </div>
            </div>
          </div>
        </section>
        {/* End Banner Area */}

        {/*================Checkout Area =================*/}
        <section className="checkout_area section_gap">
          <div className="container">

            {message && (
              <div className="alert alert-info" role="alert">
                {message}
              </div>
            )}

            <div className="returning_customer">
              <div className="check_title">
                <h2>
                  Returning Customer? <a href="/login">Click here to login</a>
                </h2>
              </div>
              <p>
                If you have shopped with us before, please log in.
                If you are a new customer, please proceed to the Billing &amp; Shipping section.
              </p>
            </div>

            <div className="cupon_area">
              <div className="check_title">
                <h2>Have a coupon? <a href="#">Click here to enter your code</a></h2>
              </div>
              <input type="text" placeholder="Enter coupon code" />
              <a className="tp_btn" href="#">Apply Coupon</a>
            </div>

            <form onSubmit={handlePlaceOrder}>
              <div className="billing_details">
                <div className="row">
                  <div className="col-lg-8">
                    <h3>Billing Details</h3>

                    <div className="row contact_form">

                      <div className="col-md-6 form-group p_star">
                        <input
                          type="text"
                          className="form-control"
                          id="first"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First name"
                          required
                        />
                      </div>

                      <div className="col-md-6 form-group p_star">
                        <input
                          type="text"
                          className="form-control"
                          id="last"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last name"
                          required
                        />
                      </div>

                      <div className="col-md-12 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Company name"
                        />
                      </div>

                      <div className="col-md-6 form-group p_star">
                        <input
                          type="tel"
                          className="form-control"
                          id="number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone number"
                          required
                        />
                      </div>

                      <div className="col-md-6 form-group p_star">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address"
                          required
                        />
                      </div>

                      <div className="col-md-12 form-group p_star">
                        <select
                          className="country_select form-control"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        >
                          <option value="India">India</option>
                          <option value="Singapore">Singapore</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>
                          <option value="United States">United States</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>

                      <div className="col-md-12 form-group p_star">
                        <input
                          type="text"
                          className="form-control"
                          id="add1"
                          name="address1"
                          value={formData.address1}
                          onChange={handleChange}
                          placeholder="Address line 01"
                          required
                        />
                      </div>

                      <div className="col-md-12 form-group p_star">
                        <input
                          type="text"
                          className="form-control"
                          id="add2"
                          name="address2"
                          value={formData.address2}
                          onChange={handleChange}
                          placeholder="Address line 02"
                        />
                      </div>

                      <div className="col-md-12 form-group p_star">
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Town/City"
                          required
                        />
                      </div>

                      <div className="col-md-12 form-group p_star">
                        <input
                          type="text"
                          className="form-control"
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder="District / State"
                        />
                      </div>

                      <div className="col-md-12 form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          placeholder="Postcode/ZIP"
                          required
                        />
                      </div>

                      <div className="col-md-12 form-group">
                        <div className="creat_account">
                          <input
                            type="checkbox"
                            id="f-option3"
                            checked={!sameAddress}
                            onChange={(e) => setSameAddress(!e.target.checked)}
                          />
                          <label htmlFor="f-option3">
                            Ship to a different address?
                          </label>
                        </div>
                      </div>

                      {!sameAddress && (
                        <div className="col-md-12 form-group">
                          <textarea
                            className="form-control"
                            rows={2}
                            placeholder="Enter different shipping address in Order Notes"
                            value={formData.notes}
                            onChange={handleChange}
                            name="notes"
                          />
                        </div>
                      )}

                      {sameAddress && (
                        <div className="col-md-12 form-group">
                          <h3>Shipping Details</h3>
                          <textarea
                            className="form-control"
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Order Notes"
                          />
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="order_box">
                      <h2>Your Order</h2>

                      <ul className="list">
                        <li>
                          <a href="#">
                            Product <span>Total</span>
                          </a>
                        </li>

                        {cart.length === 0 ? (
                          <li>
                            <span>Your cart is empty.</span>
                          </li>
                        ) : (
                          cart.map((item, index) => {
                            const product =
                              item.productId && typeof item.productId === "object"
                                ? item.productId
                                : item.product || item;

                            const productName =
                              product.product_name || product.name || "Product";

                            const price = Number(
                              product.product_price ?? item.price ?? 0
                            );

                            const quantity = Number(
                              item.quantity ?? item.qty ?? 1
                            );

                            return (
                              <li key={item._id || product._id || index}>
                                <a href="#">
                                  {productName}
                                  <span className="middle">x {quantity}</span>
                                  <span className="last">
                                    ₹{(price * quantity).toFixed(2)}
                                  </span>
                                </a>
                              </li>
                            );
                          })
                        )}
                      </ul>

                      <ul className="list list_2">
                        <li>
                          <a href="#">
                            Subtotal
                            <span>₹{subtotal.toFixed(2)}</span>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            Shipping
                            <span>
                              {cart.length > 0
                                ? `₹${shipping.toFixed(2)}`
                                : "₹0.00"}
                            </span>
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            Total
                            <span>₹{totalAmount.toFixed(2)}</span>
                          </a>
                        </li>
                      </ul>

                      <div className="payment_item">
                        <div className="radion_btn">
                          <input
                            type="radio"
                            id="f-option5"
                            name="payment"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="f-option5">Cash on Delivery</label>
                          <div className="check" />
                        </div>
                        <p>Pay when your order is delivered.</p>
                      </div>

                      <div className="payment_item active">
                        <div className="radion_btn">
                          <input
                            type="radio"
                            id="f-option6"
                            name="payment"
                            value="Online"
                            checked={paymentMethod === "Online"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="f-option6">Online Payment</label>
                          <div className="check" />
                        </div>
                        <p>
                          Online payment requires a payment gateway integration.
                          Selecting it here does not charge your card.
                        </p>
                      </div>

                      <div className="creat_account">
                        <input
                          type="checkbox"
                          id="f-option4"
                          required
                        />
                        <label htmlFor="f-option4">
                          I’ve read and accept the
                        </label>
                        <a href="#"> terms &amp; conditions*</a>
                      </div>

                      <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading || cart.length === 0}
                      >
                        {loading ? "Placing Order..." : "Place Order"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}
