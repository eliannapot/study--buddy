import { ID } from 'react-native-appwrite';
import { account } from './appwrite';

//The functions (ex create, get etc) are from the appwrite SDK

const authService = {

    //Register a user
    async register(email, password) {
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error) {
            return {
                error: error.message || "Registration failed. Try Again"
            }
        }
    },

    //User login
    async login(email, password) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            return {
                error: error.message || "Login failed. Check your credentials."
            }
        }
    },

    //Get logged in user
    async getUser() {
        try {
            return await account.get();
        } catch (error) {
            return null;
        }
    },
    
    //Logout user
    async logout() {
        try {
            console.log("Trying the logging out...");
            await account.deleteSession('current');
            console.log("Logged out successfully");
        } catch (error) {
            return {
                error: error.message || "Logout failed. Try again."
            }
        }
    }
};

export default authService;