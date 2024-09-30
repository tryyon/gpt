"use client";

import { ITenant } from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  user: ITenant | null;
  login: (email: string, password: string, role: string) => void;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children, value }: any) => {
  const [user, setUser] = useState<ITenant | null>(value);

  useEffect(() => {
    //check if user is already logged via session storage & set user
  }, []);

  const login = (email: string, password: string, role: string) => {
    console.log("login", email, password);
    // login logic
    setUser({
      id: "1",
      name: "John Doe",
      email: "test@email.com",
      role: "admin",
      accessToken: "access-token",
      refreshToken: "refresh-token",
      onboardingStatus: "pending",
    });
  };

  const logout = () => {
    // logout logic
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
