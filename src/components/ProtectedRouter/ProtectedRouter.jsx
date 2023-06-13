import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = ({
  isAuthenticated,
  redirectTo = "/",
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />
};