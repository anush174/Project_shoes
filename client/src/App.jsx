import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Components/Home'
import Checkout from './Components/Checkout'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Shops from './Components/Shops'
import ProductCard from './Components/ProductCard'
import Cart from './Components/Cart'
import Conformation from './Components/Conformation'
import Blog from './Components/Blog'
import BlogDetalis from './Components/BlogDetails'
import Login from './Components/Login'
import Tracking from './Components/Tracking'
import Contact from './Contact'
import Register from './Components/Register'



export default function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Checkout' element={<Checkout/>}/>
        
        <Route path='/Shop' element={<Shops/>}/>
        <Route path='/productdetail' element={<ProductCard/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/conformation' element={<Conformation    />}/>
        <Route path='/blog' element={<Blog  />}/>
        <Route path='/blogdetails' element={<BlogDetalis  />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/tracking' element={<Tracking />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/Register' element={<Register />}/>
        
      
      
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )
}
