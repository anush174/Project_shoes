
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { host } from '../Context/Host';

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(
        `${host}/User/Login`,
        {
          email: login.email.trim(),
          password: login.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.status === 200) {
        if (res.data.token) {
          localStorage.setItem('UserToken', res.data.token);
        }

        setMessage(res.data.message || 'Login successful');

        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);

      setMessage(
        error.response?.data?.message ||
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login_box_area section_gap">
      <div className="container">
        <div className="row">

          <div className="col-lg-6">
            <div className="login_box_img">
              <img
                className="img-fluid"
                src="/assets/img/login.jpg"
                alt="Login"
              />

              <div className="hover">
                <h4>New to our website?</h4>
                <p>Create an account to get started.</p>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => navigate('/register')}
                >
                  Create an Account
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="login_form_inner">
              <h3>Log in to enter</h3>

              {message && (
                <p role="status">{message}</p>
              )}

              <form
                className="row login_form"
                onSubmit={HandleLogin}
              >
                <div className="col-md-12 form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={login.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="col-md-12 form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={login.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </div>

                <div className="col-md-12 form-group">
                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Log In'}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
