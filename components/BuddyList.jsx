import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import BuddyItem from './BuddyItem';
import colors from '../app/config/colors';

const BuddyList = ({topBuddies}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buddy List</Text>
                <FlatList
                    data={topBuddies}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <BuddyItem buddy={item}/>
                    )}
                />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
        borderRadius: 5,
        //marginBottom: 10,
        borderWidth: 1,
    },
    title: { 
        fontSize: 18, 
        fontFamily: "InterSemiBold", 
        padding: 5,
        paddingLeft: 10,
    },
    
});

export default BuddyList;