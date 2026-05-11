import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // 🔥 IMPORTANT: handle loading properly
  if (loading) {
    return <p>Loading...</p>;
  }

  // If logged in → redirect
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;