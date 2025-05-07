import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function PrivateRoute({ children }) {
  const { loggedInUser, isInitialized } = useUserContext();

  if (!isInitialized) {
    return null;
  }

  return loggedInUser ? children : <Navigate to="/login" />;
}