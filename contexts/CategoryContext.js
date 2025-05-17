import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

const CategoryContext = createContext();

import categoryService from '../services/categoryService';

export const CategoryProvider = ({ children }) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        const response = await categoryService.getCategories();
        console.log("Categories fetched:", response);
        if (response.error) {
            setError(response.error);
            Alert.alert("Error", response.error);
        } else {
            setCategories(response.data);
            setError(null);
        }
        setLoading(false);
    }
    
    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);