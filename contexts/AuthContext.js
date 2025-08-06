import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

let initialized = false;

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    // const [user, setUser] = useState(() => {
    //     const savedUser = AsyncStorage.getItem('user');
    //     return savedUser ? JSON.parse(savedUser) : null;
    // });

    const [loading, setLoading] = useState(true);
    
    const [isInitialized, setIsInitialized] = useState(false);

    // Add this useEffect
    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         // Persist user to AsyncStorage when tab closes
    //         if (user) {
    //         AsyncStorage.setItem('user', JSON.stringify(user));
    //         }
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    // }, [user]);

    useEffect(() => {

        if (initialized) return; 
        initialized = true;
        
        console.log("Auth Context useEffect - User:", user, "Loading:", loading);
        
        const initializeAuth = async () => {
            await checkUser();
        };
        
        initializeAuth();
        return() => {
            console.log("Auth Context cleanup - User:", user, "Loading:", loading);
        }
    }, []); 

    const checkUser = async () => {
        try {
            setLoading(true);
            const response = await authService.getUser();
            console.log("User check response:", response);
            // if (response?.error) {
            //     console.error("Error fetching user:", response.error);
            //     setUser(null);
            // } else {
            //     setUser(response);
            // }
            if (response?.$id) {
                setUser(response);
                console.log("User set in Auth context:", response);
            } else {
                console.log("No user found, setting user to null");
                setUser(null);
            }
        } catch (error) {
            console.error("Error in checkUser:", error);
            setUser(null);
        } finally {
            setLoading(false);
            setIsInitialized(true);
            console.log("CheckUser() complete");
        }
    };

    const login = async (email, password) => {
        console.log("Attempting login...");
        const response = await authService.login(email, password);
        console.log("Login response:", response);

        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (response?.error) {
            console.log("Login failed:", response.error);
            return response;
        }
            
        console.log("Login successful, checking user...");
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
        try {
            const response = await authService.verifyPassword(user.email, password);
            if (response.success === false || response?.error) {
                if (response.success===false || response.error === "Invalid credentials" || response.code === 401) {
                    return false; // Password is incorrect
                } else if (response.status === 429) {
                    return { success: false, error: "Too many attempts. Please wait a moment and try again." };
                } else {
                    return "error"; // Unexpected error
                }
            }

            return true; // Password is correct
        } catch (err) {
            console.error("Unexpected error during password verification:", err);
            return "error";
        }
    };


    const updateUser = async (updates) => {
        const response = await authService.updateUser(updates); // { email, name, password }
        if (response?.error) return { success: false, error: response.error };
        await checkUser(); // refresh state
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isInitialized ,verifyPassword, updateUser  }}>
            {children}
        </AuthContext.Provider>
        
    )   
};

export const useAuth = () => useContext(AuthContext);
