import { ReactNode, useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("ProtectedRoute must be used within an AppContextProvider");
  }

  const { userId } = context;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  return userId ? children : null;
};

export default ProtectedRoute;
