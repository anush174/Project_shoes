
import React, { useState } from 'react'
import axios from 'axios'
import { host } from '../Context/Host'
import { useNavigate } from 'react-router-dom'

export default function Register() {
    const navigate=useNavigate()

  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  })

  const [message, setMessage] = useState("")

  const handlechange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    })
  }



const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${host}/User/Register`,
      register
    );

    setMessage(response.data.message || "Registration successful");
    alert(response.data.message || "Registration successful");

    setRegister({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: ""
    });

    // Navigate to Login page after successful registration
    navigate('/Login');

  } catch (error) {
    console.log("Backend error:", error.response?.data);

    setMessage(
      error.response?.data?.message || "Registration failed"
    );
  }
};



  return (
    <div>

      {/* Start Banner Area */}
      <section className="banner-area organic-breadcrumb">
        <div className="container">
          <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
            <div className="col-first">
              <h1>Register</h1>
              <nav className="d-flex align-items-center">
                <a href="/">Home <span className="lnr lnr-arrow-right" /></a>
                <a href="/Register">Register</a>
              </nav>
            </div>
          </div>
        </div>
      </section>
      {/* End Banner Area */}

      {/* Registration Box Area */}
      <section className="login_box_area section_gap">
        <div className="container">
          <div className="row">

            <div className="col-lg-6">
              <div className="login_box_img">
                <img
                  className="img-fluid"
                  src="/assets/img/login.jpg"
                  alt="Register"
                />
                <div className="hover">
                  <h4>New to our website?</h4>
                  <p>
                    Create an account to start shopping with us.
                  </p>
                  <a className="primary-btn" href="/Login">
                    Login
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="login_form_inner">
                <h3>Register to create an account</h3>

                {message && <p>{message}</p>}

                <form
                  className="row login_form"
                  onSubmit={handleSubmit}
                >

                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Username"
                      value={register.name}
                      onChange={handlechange}
                      required
                    />
                  </div>

                  <div className="col-md-12 form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={register.email}
                      onChange={handlechange}
                      required
                    />
                  </div>

                  <div className="col-md-12 form-group">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Phone Number"
                      value={register.phone}
                      onChange={handlechange}
                      required
                    />
                  </div>

                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                      value={register.address}
                      onChange={handlechange}
                    />
                  </div>

                  <div className="col-md-12 form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={register.password}
                      onChange={handlechange}
                      required
                    />
                  </div>

                  <div className="col-md-12 form-group">
                    <button
                      type="submit"
                      className="primary-btn"
                    >
                      Register
                    </button>
                  </div>

                  <div className="col-md-12 form-group">
                    <p>
                      Already have an account?{" "}
                      <a href="/Login">Login</a>
                    </p>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
