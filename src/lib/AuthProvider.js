import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Context
const AuthUserContext = createContext(null);

// Provider Component
export const AuthUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false); // for manual refetch

  // Separate function to fetch user from AsyncStorage
  const fetchUserFromStorage = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("user");
      if (userInfo) {
        const parsedUser = JSON.parse(userInfo);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Error fetching user from AsyncStorage:", error);
    }
  };

  // Trigger refetch manually
  const triggerUserRefetch = () => {
    setRefetchTrigger((prev) => !prev);
  };

  // Fetch user on mount and when triggered
  useEffect(() => {
    fetchUserFromStorage();
  }, [refetchTrigger]);

  return (
    <AuthUserContext.Provider
      value={{ user, setUser, triggerUserRefetch }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

// Custom hook
export const useAuthUser = () => useContext(AuthUserContext);

export default AuthUserContext;
