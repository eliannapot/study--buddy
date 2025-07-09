import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, View } from 'react-native';

import colors from '../app/config/colors';

import { useAuth } from './AuthContext';
const CategoryContext = createContext();

import categoryService from '../services/categoryService';

export const CategoryProvider = ({ children }) => {

    const { user } = useAuth();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        if (user?.$id) {
            fetchCategories();
        }
        setLoading(false);
    }, [user]);

    const fetchCategories = async () => {
        setLoading(true);
        const response = await categoryService.getCategories(user.$id);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error", response.error);
        } else {
            const defaultNoneCategory = {
                $id: "none",
                name: "None",
            };
            setCategories([defaultNoneCategory, ...response.data]);
            setError(null);
        }
        setLoading(false);
    }

    const addCategory = async (category) => {
        if (!category) {
            Alert.alert("Error, no category provided");
            return;
        }
        const response = await categoryService.addCategory(user.$id, category);
        if (response.error) {
            Alert.alert("Error", response.error);
            return;
        } else {
            setCategories([...categories, response.data]);
        }
    };
    
    return (
        <CategoryContext.Provider value={{ categories, addCategory }}>
            { loading ? (
                <View style={{justifyContent: 'center', alignItems: 'center' }}> 
                    <ActivityIndicator size ="large" color={colors.primary}  />
                </View>
            ): (
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    {children}
                </>
            )}        
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);