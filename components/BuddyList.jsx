import { FlatList, StyleSheet, Text, View } from 'react-native';

import colors from '../app/config/colors';
import BuddyItem from './BuddyItem';

const BuddyList = ({topBuddies}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Buddy List</Text>
                {topBuddies.length === 0 ? (
                    <Text style={styles.text}>No one is Focusing right now</Text>
                ):(
                    <FlatList
                        data={topBuddies}
                        scrollEnabled={false}
                        keyExtractor={(item) => item.$id}
                        renderItem={({ item }) => (
                            <BuddyItem buddy={item}/>
                        )}
                    />
                )}
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
    text: {
        fontFamily: "InterLight",
        fontSize: 14,
        textAlign: 'center',
        padding: 10,
    }
    
});

export default BuddyList;