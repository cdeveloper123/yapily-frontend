"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    authorisationUrl: null,
    transactions: [],
  });

  const updateAuthData = (newData) => {
    setAuthData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <AuthContext.Provider value={{ authData, updateAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
