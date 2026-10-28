import { Link } from 'react-router-dom'

const orders = [
  ['#ORD-1008', 'AM', '#6C63FF', 'Anna Mathew', '$214.50', 'Processing', 's-info'],
  ['#ORD-1007', 'RS', '#38bdf8', 'Rahul Shetty', '$81.99', 'Shipped', 's-primary'],
  ['#ORD-1006', 'PN', '#19c37d', 'Priya Nair', '$129.00', 'Pending', 's-warning'],
  ['#ORD-1005', 'JC', '#f59e0b', 'John Carter', '$466.25', 'Delivered', 's-success'],
  ['#ORD-1004', 'MP', '#ef4444', 'Meera Pai', '$14.59', 'Cancelled', 's-danger'],
]

export default function RecentOrders() {
  return (
    <div className="bg-secondary rounded p-4">
      <div className="d-flex justify-content-between mb-3">
        <h6 className="mb-0">Recent Orders</h6>
        <Link to="/orders">View all</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover" id="recent">
          <thead>
            <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map(([id, initials, color, name, total, status, tone]) => (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span className="avatar" style={{ background: color }}>{initials}</span>
                    <span>{name}</span>
                  </div>
                </td>
                <td>{total}</td>
                <td><span className={`sbadge ${tone}`}>{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
