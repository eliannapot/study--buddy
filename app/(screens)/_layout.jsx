import { Stack, useRouter, } from "expo-router";
//import { useRoute } from "@react-navigation/native";

import { TouchableOpacity, View } from "react-native";
import colors from "../../app/config/colors";

import Icon from "react-native-vector-icons/Ionicons";

const ScreensLayout = () => {
  
  const router = useRouter();

  return (
  
  <Stack
    screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: colors.lightbackground,
              shadowOpacity: 0,  // Remove shadow for iOS
              elevation: 0,      // Remove shadow for Android
            },
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: "InterSemiBold",
            },
            contentStyle: {
              paddingBottom: 10,
            },
            
        }}
    >
    <Stack.Screen name="notifications" options={{ title: "Notifications" }} />

    <Stack.Screen name="leaderboard" options={{ title: "Leaderboard" }} />

    <Stack.Screen name="settings" options={{ title: "Settings" }} />

    <Stack.Screen name="profile" options={{ 
      title: "My Profile",
      headerRight: () => (
        <TouchableOpacity 
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
          onPress={() => {
            router.push("/settings");
          } }
        >
          <View>
            <Icon
              name="settings"
              size={35}
              color={colors.black} 
            />
          </View>
        </TouchableOpacity>
      ),
      }} />

    <Stack.Screen name="allBuddies" options={{ title: "All Buddies" }} />
    
    <Stack.Screen name="allTasks" options={{ 
      title: "Tasks" ,
      headerLeft: () => (
        <TouchableOpacity 
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
          onPress={() => {
            router.push("/dashboard");
          } }
        >
          <View>
            <Icon
              name="arrow-back"
              size={30}
              color={colors.primary} 
            />
          </View>
        </TouchableOpacity>
      ),
    }} />
    
    <Stack.Screen name="allEvents" options={{ 
      title: "Events",  
      headerLeft: () => (
        <TouchableOpacity 
          hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }} 
          onPress={() => {
            router.push("/dashboard");
          } }
        >
          <View>
            <Icon
              name="arrow-back"
              size={30}
              color={colors.primary} 
            />
          </View>
        </TouchableOpacity>
      ),
    }} />

    <Stack.Screen name="newTask" options={{ 
      title: "New Task",
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    }} />

    <Stack.Screen name="newEvent" options={{ 
      title: "New Event",
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
    }} />

    <Stack.Screen 
      name="buddyProfile"         
      options={{
        title: "Buddy Profile"
    }}/>

  </Stack>
  
  );
};

export default ScreensLayout;