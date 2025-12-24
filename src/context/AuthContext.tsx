import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: any | null;
  accessToken: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
  updateAccessToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let _authContext: AuthContextType | null = null; // TEMP: store context for Axios

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem("accessToken"));

  const login = ({user, accessToken}: any, token: string) => {
    setUser(user);
    setAccessToken(accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  const updateAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);
  };

  const contextValue = { user, accessToken, login, logout, updateAccessToken };
  _authContext = contextValue; // save for Axios

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Helper to use context outside React (for Axios)
export const getAuthContext = () => {
  if (!_authContext) throw new Error("AuthContext not initialized yet");
  return _authContext;
};