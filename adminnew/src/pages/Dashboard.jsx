import { Link } from 'react-router-dom'
import StatCard from '../Components/StatCard.jsx'
import SalesChart from '../Components/SalesChart.jsx'
import LowStock from '../Components/LowStock.jsx'
import RecentOrders from '../Components/RecentOrders.jsx'

const stats = [
  { icon: 'fa-dollar-sign', tone: 'ic-primary', label: 'Today Sales', value: '$1,234' },
  { icon: 'fa-shopping-cart', tone: 'ic-info', label: 'Orders Today', value: '38' },
  { icon: 'fa-users', tone: 'ic-success', label: 'Customers', value: '1,284' },
  { icon: 'fa-exclamation-triangle', tone: 'ic-warning', label: 'Low Stock Items', value: '4' },
]

const flow = [
  ['/categories', 'fa-tags', 'Categories'],
  ['/products', 'fa-box-open', 'Products'],
  ['/stock', 'fa-warehouse', 'Stock'],
  ['/orders', 'fa-shopping-cart', 'Orders'],
  ['/payments', 'fa-credit-card', 'Payments'],
  ['/customers', 'fa-users', 'Customers'],
  ['/reports', 'fa-chart-line', 'Sales / Reports'],
]

export default function Dashboard() {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h4 className="mb-1">Welcome back, Admin</h4>
          <p className="mb-0 text-muted-2">Here is what is happening in your store today.</p>
        </div>
        <div className="d-flex gap-2 no-print">
          <Link to="/reports" className="btn btn-primary">
            <i className="fa fa-chart-line me-2"></i>View Reports
          </Link>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      <h6 className="mb-3 text-muted-2">ADMIN WORKFLOW</h6>
      <div className="row g-3 mb-4">
        {flow.map(([to, icon, label], i) => (
          <div key={to} className="col-6 col-md-3 col-xl">
            <Link to={to} className="flow-tile">
              <i className={`fa ${icon}`}></i>
              <small>Step {i + 1}</small>
              {label}
            </Link>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="bg-secondary rounded p-4">
            <h6 className="mb-4">Sales Overview</h6>
            <SalesChart />
          </div>
        </div>
        <div className="col-lg-4">
          <LowStock />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <RecentOrders />
        </div>
      </div>
    </div>
  )
}
