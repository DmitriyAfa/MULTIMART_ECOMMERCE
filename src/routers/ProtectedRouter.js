// hooks
import { useAuth } from "../services/hooks/useAuth";

// router
import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ children }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return currentUser ? children : <Navigate to="/login" />;
};
