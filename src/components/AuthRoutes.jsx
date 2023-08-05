import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthRoutes = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    // user is not authenticated
    return <Navigate to="/dashboard/home" />;
  }
  return children;
};
