// import { Routes, Route } from 'react-router-dom'
// import Layout from './Components/Layout.jsx'
// import Dashboard from './pages/Dashboard.jsx'
// import PagePlaceholder from './pages/PagePlaceholder.jsx'

// const pages = [
//   ['categories', 'Categories'],
//   ['products', 'Products'],
//   ['stock', 'Stock'],
//   ['orders', 'Orders'],
//   ['payments', 'Payments'],
//   ['customers', 'Customers'],
//   ['reports', 'Sales / Reports'],
// ]

// export default function App() {
//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         <Route path="/" element={<Dashboard />} />
//         {pages.map(([path, title]) => (
//           <Route key={path} path={`/${path}`} element={<PagePlaceholder title={title} />} />
//         ))}
//       </Route>
//     </Routes>
//   )
// }
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminHome from './Components/AdminHome'
import Categories from './Components/Categories'
import Orders from './Components/Orders'
import Payments from './Components/Payments'
import Stock from './Components/Stock'
import Products from './Components/Products'
import AdminLogin from './Components/AdminLogin'
import Customers from './Components/Customers'
import Report from './Components/Report'

import Layout from './Components/Layout'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/AdminLogin' element={<AdminLogin />} />

          <Route element={<Layout />}>
            <Route path='/' element={<AdminHome />} />
            <Route path='/Categories' element={<Categories />} />
            <Route path='/Products' element={<Products />} />
            <Route path='/Orders' element={<Orders />} />
            <Route path='/Payments' element={<Payments />} />
            <Route path='/Stock' element={<Stock />} />
            <Route path='/Customers' element={<Customers />} />
            <Route path='/Report' element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}