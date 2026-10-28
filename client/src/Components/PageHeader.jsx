import { Link } from 'react-router-dom';

export default function PageHeader({ title, parent }) {
  return (
    <div className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">{title}</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {parent && <li className="breadcrumb-item"><Link to={parent[1]}>{parent[0]}</Link></li>}
        <li className="breadcrumb-item active text-white">{title}</li>
      </ol>
    </div>
  );
}
