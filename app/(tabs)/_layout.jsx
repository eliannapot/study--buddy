import { Tabs, useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import notificationIcon from "../../assets/images/bell.png";
import calendarIcon from "../../assets/images/calendar.png";
import buddiesIcon from "../../assets/images/friends.png";
import homeIcon from "../../assets/images/home.png";
import hourglassIcon from "../../assets/images/sand-clock.png";
import badgeIcon from "../../assets/images/star-badge.png";
import profileIcon from "../../assets/images/user.png";

import colors from "../config/colors";


export default function TabsLayout() {

  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        style: styles.tabBar,
        tabBarShowLabel: false,
        tabBarStyle: { 
          backgroundColor: colors.lightbackground,
          borderBottomWidth: 10,
          borderColor: colors.primary,
          borderTopWidth: 0,
          paddingTop: 5, 
          height: 55, 
          shadowOpacity: 0,  // Remove shadow for iOS
          elevation: 0,      // Remove shadow for Android 
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.lightbackground,
          shadowOpacity: 0,  // Remove shadow for iOS
          elevation: 0,      // Remove shadow for Android
        },
        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "InterSemiBold",
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push("/notifications")}>
            <Image 
            source={notificationIcon}  
            style={{ 
              marginRight: 10,
              width:40,
              height:40,
              }} />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Image 
            source={profileIcon}  
            style={{ 
              marginLeft: 10,
              width:40,
              height:40,
              }} />
          </TouchableOpacity>
        ),
      }}
    >      
      <Tabs.Screen 
        name="index" 
        options={{
          href: null, // Makes it inaccessible directly
        }}
      />
      <Tabs.Screen
        name="buddies"
        options={{
          title: "Buddies",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconContainer}>
            <Image
              source={buddiesIcon}
              style={{
                width: 38,
                height: 38,
                tintColor: focused ? colors.black : colors.gray,
              }}
            />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: "Focus Timer",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconContainer}>
            <Image
              source={hourglassIcon}
              style={{
                width: 38,
                height: 38,
                tintColor: focused ? colors.black : colors.gray,              
              }}
            />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconContainer}>
            <Image
              source={homeIcon}
              style={{
                width: 38,
                height: 38,
                tintColor: focused ? colors.black : colors.gray,              
              }}
            />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconContainer}>
            <Image
              source={calendarIcon}
              style={{
                width: 38,
                height: 38,
                tintColor: focused ? colors.black : colors.gray,              
              }}
            />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="badges"
        options={{
          title: "Badges",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconContainer}>
            <Image
              source={badgeIcon}
              style={{
                width: 38,
                height: 38,
                tintColor: focused ? colors.black : colors.gray,              
              }}
            />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  IconContainer: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});