// AuthUserContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Context
const AuthUserContext = createContext(null);

// Provider Component
export const AuthUserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userInfo = await AsyncStorage.getItem('user');
                if (userInfo) {
                    const parsedUser = JSON.parse(userInfo);
                    setUser(parsedUser);
                }
            } catch (error) {
                console.log("Error fetching user from storage", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthUserContext.Provider value={{ user, setUser }}>
            {children}
        </AuthUserContext.Provider>
    );
};

// Custom Hook (optional)
export const useAuthUser = () => useContext(AuthUserContext);

export default AuthUserContext;
