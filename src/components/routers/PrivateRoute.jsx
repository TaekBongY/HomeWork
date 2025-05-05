import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;