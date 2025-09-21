import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

function AuthenticatedRoute({ children }) {
  const { isLoggedIn } = useAuthContext();
  return isLoggedIn ? <Outlet>{children}</Outlet> : <Navigate to="/login" />;
}

export default AuthenticatedRoute;
