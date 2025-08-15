import React, { createContext, useContext, useState } from "react";

// Create the context
const AuthContext = createContext();

// Context provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
