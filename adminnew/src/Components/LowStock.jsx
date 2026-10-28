import { Link } from 'react-router-dom'

const items = [
  ['Logitech MX Master 3', '3 left', 's-warning'],
  ['Sony WH-1000XM5', '8 left', 's-warning'],
  ['Fitbit Sense Advanced', '12 left', 's-warning'],
  ['Boat On-Ear Wireless', 'Out of stock', 's-danger'],
]

export default function LowStock() {
  return (
    <div className="bg-secondary rounded p-4">
      <h6 className="mb-2">Low Stock Alerts</h6>
      {items.map(([name, label, tone]) => (
        <div
          key={name}
          className="d-flex align-items-center justify-content-between py-3 border-bottom"
          style={{ borderColor: 'var(--line)' }}
        >
          <span>{name}</span>
          <span className={`sbadge ${tone}`}>{label}</span>
        </div>
      ))}
      <Link to="/stock" className="btn btn-outline-light btn-sm mt-3">Manage stock</Link>
    </div>
  )
}
