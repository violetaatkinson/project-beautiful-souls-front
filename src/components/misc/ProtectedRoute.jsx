import { Navigate } from "react-router-dom";
import { useAuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticationFetched } = useAuthContext()

  if (isAuthenticationFetched && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute