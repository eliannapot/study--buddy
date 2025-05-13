import {View, Text, FlatList, StyleSheet, Image} from 'react-native';

import colors from '../app/config/colors';

import crown from '../assets/images/crownshade.png';
import stars from '../assets/images/starshade.png';
import LeaderboardItem from './LeaderboardItem';

const LeaderboardList = ({leaderboard}) => {
    return (
        <View style={styles.leaderboardContainer}>
            <View style={styles.containerTitle}>
                <Image source={stars} style={styles.starIcon}/>
                <Text style={styles.textTitle}>
                    Weekly Leaderboard
                </Text>
                <Image source={crown} style={styles.crownIcon}/>
            </View>
            
                <FlatList
                    data={leaderboard}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <LeaderboardItem item={item} index={index} />
                    )}
                />
             
        </View>
    );
};


const styles = StyleSheet.create({
    leaderboardContainer: { 
        marginTop: 10, 
        backgroundColor: colors.lightbackground, 
        borderRadius: 5, 
        marginBottom: 10,
    },
    containerTitle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: colors.hexToRGBA(colors.tertiary, 0.05),
        borderWidth: 1,
        borderRadius: 3,
    },
    textTitle: { 
        fontSize: 18, 
        fontFamily: "LailaSemiBold",
        textAlign: "center",
    },
    starIcon: {
        width: 56,
        height: 55,
        marginLeft: 5,
        position: "absolute",
        top: -15,
        left: -10,
    },
    crownIcon: {
        width: 48,
        height: 46,
        marginRight: 5,
        position: "absolute",
        right: 10,
    },
    
});

export default LeaderboardList;