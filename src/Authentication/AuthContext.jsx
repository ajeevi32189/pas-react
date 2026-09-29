import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

// Create a Context for Auth
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if there is a token in cookies
    const token = Cookies.get('token'); // Use js-cookie to get the token
    if (token) { 
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    // Store the token in cookies
    Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Remove the token from cookies
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
