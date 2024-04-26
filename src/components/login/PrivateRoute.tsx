import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "@store/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
