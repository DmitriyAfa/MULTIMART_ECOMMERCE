// hooks
import { useAuth } from "../services/hooks/useAuth";

// router
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
