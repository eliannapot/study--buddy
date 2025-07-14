import { createContext, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import colors from '../app/config/colors';
import badgeService from '../services/badgeService';
import { useAuth } from './AuthContext';

const BadgeContext = createContext();

export const BadgeProvider = ({ children }) => {
    const { user } = useAuth();
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchBadges = async () => {
        setLoading(true);
        const res = await badgeService.getBadges();
        if (!res.error) 
            setBadges(res.data || []);
        setLoading(false);
    };

    useEffect(() => {
        if (user?.$id) {
            fetchBadges()
        };
    }, [user]);

    return (
        <BadgeContext.Provider value={{ badges, loading }}>
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
        </BadgeContext.Provider>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
});

export const useBadges = () => useContext(BadgeContext);
