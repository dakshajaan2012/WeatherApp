

// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const login = (credentials) => {
    // Implement your authentication logic here
    // Check user credentials against your authentication backend
    // If authenticated, set the user in the state
    setAuthenticatedUser({
      userName: credentials.userName,
      email: credentials.email,
      password: credentials.password,

      // Add other user information if needed
    });
  };

  const logout = () => {
    // Implement logout logic
    setAuthenticatedUser(null);
  };

  return (
    <UserContext.Provider value={{ authenticatedUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
