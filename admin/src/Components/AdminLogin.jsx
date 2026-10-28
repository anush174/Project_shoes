import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:7001/Admin/Login', {
        email,
        password
      })

      setMessage(response.data.message)

      // Store admin details after successful login
      localStorage.setItem('admin', JSON.stringify(response.data.admin))

      navigate('/')

    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Admin login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="container-fluid position-relative d-flex p-0">
        {/* Spinner Start */}
        {loading && (
          <div id="spinner" className="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {/* Spinner End */}

        {/* Sign In Start */}
        <div className="container-fluid">
          <div className="row h-100 align-items-center justify-content-center login-wrap" style={{minHeight: '100vh'}}>
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <a href="/" className="">
                    <h3 className="text-primary d-flex align-items-center"><span className="brand-mark me-2"><i className="fa fa-store" /></span>DarkPan</h3>
                  </a>
                  <h3>Admin Login</h3>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  {message && (
                    <p className="text-center mb-3">{message}</p>
                  )}

                  <button type="submit" className="btn btn-primary py-3 w-100 mb-4" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </form>

                <p className="text-center mb-0 text-muted-2">Authorised administrators only</p>
              </div>
            </div>
          </div>
        </div>
        {/* Sign In End */}
      </div>
      {/* JavaScript Libraries */}
      {/* Template Javascript */}
    </div>
  )
}