import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login(username, password) {
    if (
      (username.toLowerCase() === "jack" ||
        username.toLowerCase() === "devzaq") &&
      password === "dummy"
    ) {
      setUsername(username);
      setIsLoggedIn(true);
      return true;
    } else {
      setIsLoggedIn(false);
      return false;
    }
  }

  const logout = useCallback(() => {
    setUsername("");
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider!"
    );
  return context;
};
