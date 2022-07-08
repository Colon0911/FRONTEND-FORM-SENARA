import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { getFullName } from "../helpers/decoding";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (token) => {
    setToken(token);
    setUser(getFullName(token));
    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
