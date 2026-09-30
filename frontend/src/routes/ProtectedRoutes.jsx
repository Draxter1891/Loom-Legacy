import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/auth.hook";

const ProtectedRoutes = () => {
  const { isAuthLoading, isAuthenticated } = useAuth();

  if (isAuthLoading) {
    return <div className="p-6 text-sm text-neutral-400">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
