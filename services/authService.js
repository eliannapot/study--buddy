import { ID } from 'react-native-appwrite';
import { account } from './appwrite';

import { verifyPasswordWithoutAffectingSession } from './appwriteTempClient'; // Adjust path as needed
import userService from './userService';

//The functions (ex create, get etc) are from the appwrite SDK

const authService = {

    //Register a user
    async register(email, password, name) {
        try {
            userId = ID.unique(); // Generate a unique user ID
            console.log("Generated userId:", userId);
            const response = await account.create(userId, email, password, name);

            const userDocResult = await userService.addUser(userId, name);
            if (userDocResult.error) {
                console.warn("User was registered but not added to Users collection:", userDocResult.error);
            }
            
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
    },

    //Verify user password
    async verifyPassword(email, password) {
        return await verifyPasswordWithoutAffectingSession(email, password);
    },


    //Update user information
    async updateUser({ email, name, password, oldPassword }) {
        try {
            const current = await account.get(); // get current user data
            // Update email only if it's different
            if (email && email !== current.email) {
                await account.updateEmail(email, oldPassword); // use current password to update email
            }
            // Update name only if it's different
            if (name && name !== current.name) {
                await account.updateName(name);
            }
            // Update password only if it's not empty
            if (password && password.length >= 8) {
                await account.updatePassword(password, oldPassword);
            }
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Failed to update profile."
            };
        }
    },

};

export default authService;