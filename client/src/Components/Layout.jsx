import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const PAGES = [
  ['/cart', 'Cart'], ['/checkout', 'Checkout'], ['/payment', 'Payment'],
  ['/order-tracking', 'Order Tracking'], ['/testimonial', 'Testimonial'], ['/404', '404 Page'],
];
const linkClass = ({ isActive }) => 'nav-item nav-link' + (isActive ? ' active' : '');

export default function Layout() {
  const { user, logout, cartCount, toasts, toast } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);       // mobile navbar
  const [drop, setDrop] = useState(false);       // "Pages" dropdown
  const [search, setSearch] = useState(false);   // search modal
  const [sticky, setSticky] = useState(false);
  const [top, setTop] = useState(false);
  const [q, setQ] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => { setMenu(false); setDrop(false); setSearch(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const onScroll = () => { setSticky(window.scrollY > 45); setTop(window.scrollY > 300); };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const doSearch = (e) => {
    e?.preventDefault();
    navigate('/shop' + (q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''));
    setSearch(false);
  };
  const subscribe = (e) => {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) { toast('Subscribed! Use code SOLE10 for 10% off.', 'ok'); setEmail(''); }
    else toast('Enter a valid email address.', 'err');
  };

  return (
    <>
      {/* Navbar start */}
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2">
              <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary"></i> <span className="text-white">12 Sneaker Lane, New York</span></small>
              <small className="me-3"><i className="fas fa-envelope me-2 text-secondary"></i> <span className="text-white">support@solestreet.com</span></small>
            </div>
            <div className="top-link pe-2">
              {user ? (
                <>
                  <small className="text-white mx-2">Hi, {user.name.split(' ')[0]}</small>/
                  <a href="#" className="text-white" onClick={(e) => { e.preventDefault(); logout(); navigate('/'); }}><small className="text-white mx-2">Logout</small></a>/
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white"><small className="text-white mx-2">Login</small>/</Link>
                  <Link to="/register" className="text-white"><small className="text-white mx-2">Register</small></Link>/
                </>
              )}
              <Link to="/order-tracking" className="text-white"><small className="text-white ms-2">Track Order</small></Link>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className={'navbar navbar-light bg-white navbar-expand-xl' + (sticky ? ' sticky-top shadow-sm' : '')}>
            <Link to="/" className="navbar-brand"><h1 className="text-primary display-6">SoleStreet</h1></Link>
            <button className="navbar-toggler py-2 px-3" type="button" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div className={'collapse navbar-collapse bg-white' + (menu ? ' show' : '')}>
              <div className="navbar-nav mx-auto">
                <NavLink to="/" end className={linkClass}>Home</NavLink>
                <NavLink to="/shop" className={linkClass}>Shop</NavLink>
                <NavLink to="/product/1" className={linkClass}>Shop Detail</NavLink>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" onClick={(e) => { e.preventDefault(); setDrop(!drop); }}>Pages</a>
                  <div className={'dropdown-menu m-0 bg-secondary rounded-0' + (drop ? ' show' : '')}>
                    {PAGES.map(([to, label]) => <Link key={to} to={to} className="dropdown-item">{label}</Link>)}
                    {user
                      ? <><Link to="/order-tracking" className="dropdown-item">My Orders</Link><a href="#" className="dropdown-item" onClick={(e) => { e.preventDefault(); logout(); navigate('/'); }}>Logout</a></>
                      : <><Link to="/login" className="dropdown-item">Login</Link><Link to="/register" className="dropdown-item">Register</Link></>}
                  </div>
                </div>
                <NavLink to="/contact" className={linkClass}>Contact</NavLink>
              </div>
              <div className="d-flex m-3 me-0">
                <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" onClick={() => setSearch(true)}>
                  <i className="fas fa-search text-primary"></i>
                </button>
                <Link to="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1" style={{ top: -5, left: 15, height: 20, minWidth: 20 }}>{cartCount}</span>
                </Link>
                <Link to={user ? '/order-tracking' : '/login'} className="my-auto"><i className="fas fa-user fa-2x"></i></Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}

      {/* Modal Search Start */}
      <div className={'modal fade' + (search ? ' show' : '')} style={{ display: search ? 'block' : 'none' }} tabIndex="-1" onClick={() => setSearch(false)}>
        <div className="modal-dialog modal-fullscreen" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title">Search by keyword</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setSearch(false)}></button>
            </div>
            <div className="modal-body d-flex align-items-center">
              <form className="input-group w-75 mx-auto d-flex" onSubmit={doSearch}>
                <input type="search" className="form-control p-3" placeholder="Search shoes, brands..." value={q} onChange={(e) => setQ(e.target.value)} />
                <span className="input-group-text p-3" style={{ cursor: 'pointer' }} onClick={doSearch}><i className="fa fa-search"></i></span>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}

      <Outlet />

      {/* Footer Start */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
            <div className="row g-4">
              <div className="col-lg-3"><a href="#"><h1 className="text-primary mb-0">SoleStreet</h1><p className="text-secondary mb-0">Step in style</p></a></div>
              <div className="col-lg-6">
                <form className="position-relative mx-auto" onSubmit={subscribe}>
                  <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button type="submit" className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white" style={{ top: 0, right: 0 }}>Subscribe Now</button>
                </form>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  {['twitter', 'facebook-f', 'youtube', 'linkedin-in'].map((i) => (
                    <a key={i} className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#" onClick={(e) => e.preventDefault()}><i className={`fab fa-${i}`}></i></a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">Comfortable, durable and stylish footwear for every step. Genuine products, easy 30-day returns and fast delivery.</p>
                <Link to="/testimonial" className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Shop Info</h4>
                <Link className="btn-link" to="/">About Us</Link>
                <Link className="btn-link" to="/contact">Contact Us</Link>
                <Link className="btn-link" to="/contact">Return Policy</Link>
                <Link className="btn-link" to="/contact">FAQs &amp; Help</Link>
                <Link className="btn-link" to="/order-tracking">Track Your Order</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Account</h4>
                <Link className="btn-link" to="/order-tracking">My Account</Link>
                <Link className="btn-link" to="/shop">Shop details</Link>
                <Link className="btn-link" to="/cart">Shopping Cart</Link>
                <Link className="btn-link" to="/shop">Wishlist</Link>
                <Link className="btn-link" to="/order-tracking">Order History</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>Address: 12 Sneaker Lane, NY 10001</p>
                <p>Email: support@solestreet.com</p>
                <p>Phone: +0123 4567 8910</p>
                <p>Payment Accepted</p>
                <img src="/img/payment.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}

      {/* Copyright Start */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2"></i>SoleStreet</a>, All right reserved.</span>
            </div>
            <div className="col-md-6 my-auto text-center text-md-end text-white">
              Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}

      {top && (
        <a href="#" className="btn btn-primary border-3 border-primary rounded-circle back-to-top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <i className="fa fa-arrow-up"></i>
        </a>
      )}
      {search && <div className="modal-backdrop fade show"></div>}

      <div className="toast-box">{toasts.map((t) => <div key={t.id} className={t.type}>{t.msg}</div>)}</div>
    </>
  );
}
