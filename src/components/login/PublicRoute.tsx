import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "@store/store";

interface PublicRouteProps {
  children: React.ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return !isLoggedIn ? <>{children}</> : <Navigate to="/" />;
}

export default PublicRoute;
