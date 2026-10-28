export default function StatCard({ icon, tone, label, value }) {
  return (
    <div className="col-sm-6 col-xl-3">
      <div className="stat-card">
        <div className={`stat-icon ${tone}`}><i className={`fa ${icon}`}></i></div>
        <div>
          <p>{label}</p>
          <h4>{value}</h4>
        </div>
      </div>
    </div>
  )
}
