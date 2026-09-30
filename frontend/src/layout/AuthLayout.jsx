import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/auth.hook";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
