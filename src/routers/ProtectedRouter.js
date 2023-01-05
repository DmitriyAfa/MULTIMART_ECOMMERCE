// hooks
import { useAuth } from "../services/hooks/useAuth";

// router
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouter = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};
