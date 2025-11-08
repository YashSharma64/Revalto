import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/Services/api"; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from local storage", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false); 
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };


  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout API call failed", error);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  // update user data in context and local storage
  const updateUser = (updatedData) => {
    if (updatedData) {
      localStorage.setItem("user", JSON.stringify(updatedData));
      setUser(updatedData);
    }
  };

  // Passing state and functions to children
  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
  };

  // we can't render children until we've checked for a user
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// disableing eslint for this line to allow function usage outside components
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
