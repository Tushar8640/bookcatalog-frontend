import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface IProps {
  children: ReactNode;
}
const PublicRoute = ({ children }: IProps) => {
  const isLoggedIn = useAuth();
  return !isLoggedIn ? children : <Navigate to="/" />;
};
export default PublicRoute;
