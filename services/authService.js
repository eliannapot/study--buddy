import { ID } from 'react-native-appwrite';
import { account } from './appwrite';

//The functions (ex create, get etc) are from the appwrite SDK

const authService = {

    //Register a user
    async register(email, password, name) {
        try {
            const response = await account.create(ID.unique(), email, password, name);
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
            await account.deleteSession('current');
        } catch (error) {
            return {
                error: error.message || "Logout failed. Try again."
            }
        }
    }
};

export default authService;