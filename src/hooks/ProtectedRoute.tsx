import { ReactNode, useEffect } from "react";
import useAppState from "./AppContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { userId } = useAppState();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  return userId ? children : null;
};

export default ProtectedRoute;
