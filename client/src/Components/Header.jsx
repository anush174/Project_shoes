import React from 'react'

export default function Header() {
  return (
    <div>
   <header className="header_area sticky-header">
    <div className="main_menu">
      <nav className="navbar navbar-expand-lg navbar-light main_box">
        <div className="container">
          {/* Brand and toggle get grouped for better mobile display */}
          <a className="navbar-brand logo_h" href="index.html"><img src="../assets/img/logo.png" alt='logo' /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          {/* Collect the nav links, forms, and other content for toggling */}
          <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul className="nav navbar-nav menu_nav ml-auto">
              <li className="nav-item active"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item submenu dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Shop</a>
                <ul className="dropdown-menu">
                  <li className="nav-item"><a className="nav-link" href="/Shop">Shop Category</a></li>
                  <li className="nav-item"><a className="nav-link" href="/productdetail">Product Details</a></li>
                  <li className="nav-item"><a className="nav-link" href="/Checkout">Product Checkout</a></li>
                  <li className="nav-item"><a className="nav-link" href="/cart">Shopping Cart</a></li>
                  <li className="nav-item"><a className="nav-link" href="/conformation">Confirmation</a></li>
                </ul>
              </li>
              <li className="nav-item submenu dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Blog</a>
                <ul className="dropdown-menu">
                  <li className="nav-item"><a className="nav-link" href="/blog">Blog</a></li>
                  <li className="nav-item"><a className="nav-link" href="/blogdetails">Blog Details</a></li>
                </ul>
              </li>
              <li className="nav-item submenu dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
                <ul className="dropdown-menu">
                  <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                  <li className="nav-item"><a className="nav-link" href="/tracking">Tracking</a></li>
                  <li className="nav-item"><a className="nav-link" href="/Register">Register</a></li>
                </ul>
              </li>
              <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item"><a href="/cart" className="cart"><span className="ti-bag" /></a></li>
              <li className="nav-item">
                <button className="search"><span className="lnr lnr-magnifier" id="search" /></button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    {/* <div className="search_input" id="search_input_box">
      <div className="container">
        <form className="d-flex justify-content-between">
          <input type="text" className="form-control" id="search_input" placeholder="Search Here" />
          <button type="submit" className="btn" />
          <span className="lnr lnr-cross" id="close_search" title="Close Search" />
        </form>
      </div>
    </div> */}
  </header>
  </div>
  )
}
