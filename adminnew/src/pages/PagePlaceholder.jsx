export default function PagePlaceholder({ title }) {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded p-4">
        <h4 className="mb-1">{title}</h4>
        <p className="mb-0 text-muted-2">This page is ready for your content.</p>
      </div>
    </div>
  )
}
