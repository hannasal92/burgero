import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute() {
  const { user } = useAuth();

  // If user is logged in → redirect
  if (user) {
    return <Navigate to="/order" replace />;
  }

  // Otherwise allow access
  return <Outlet />;
}