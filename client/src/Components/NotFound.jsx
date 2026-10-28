import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

export default function NotFound() {
  return (
    <>
      <PageHeader title="404 Error" />
      <div className="container-fluid py-5">
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
              <h1 className="display-1">404</h1>
              <h1 className="mb-4">Page Not Found</h1>
              <p className="mb-4">We&apos;re sorry, the page you have looked for does not exist. Maybe go to our home page or try searching for shoes!</p>
              <Link className="btn border-secondary rounded-pill py-3 px-5" to="/">Go Back To Home</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
