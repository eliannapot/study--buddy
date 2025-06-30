import { createContext, useContext, useEffect, useState } from "react";

import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        checkUser();
    },[] )

    const checkUser = async () => {
        setLoading(true);
        const response = await authService.getUser();
        if (response?.error) {
            setUser(null);
        } else {
            setUser(response);
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        if (response?.error) {
            return response;
        }
        await checkUser();
        return {success: true};
    };

    const register = async (email, password, name) => {
        const response = await authService.register(email, password, name);
        if (response?.error) {
            return response;
        }
        return login(email, password); //Auto login after register
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setLoading(false);
        await checkUser(); 
    };

    const verifyPassword = async (password) => {
        console.log("(Context) Verifying password for user:", user.email);
        const response = await authService.verifyPassword(user.email, password);
        console.log("(Context) Password verification response:", response);
        return !response?.error;
    };

    const updateUser = async (updates) => {
        const response = await authService.updateUser(updates); // { email, name, password }
        if (response?.error) return { success: false, error: response.error };
        await checkUser(); // refresh state
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, verifyPassword, updateUser  }}>
            {children}
        </AuthContext.Provider>
        
    )   
};

export const useAuth = () => useContext(AuthContext);
