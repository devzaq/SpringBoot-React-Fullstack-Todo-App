import { useEffect } from "react";
import { useAuthContext } from "../security/AuthContext";

function LogoutPage() {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout();
  }, [logout]);
  return (
    <div>
      <h1>You are Logged Out!</h1>
      <p>Thank you for using our app come back soon!</p>
    </div>
  );
}

export default LogoutPage;
