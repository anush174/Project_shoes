import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

/* Sends logged-out visitors to /login and brings them back afterwards */
export default function RequireAuth({ children }) {
  const { user } = useStore();
  const location = useLocation();
  return user ? children : <Navigate to="/login" replace state={{ from: location }} />;
}
