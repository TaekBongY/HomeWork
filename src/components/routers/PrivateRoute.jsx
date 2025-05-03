// src/components/routers/PrivateRoute.jsx 수정
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useUserContext();

  return isLoggedIn ? children : <Navigate to="/login" replace />; // 리다이렉트 경로 /login으로 수정
};

export default PrivateRoute;