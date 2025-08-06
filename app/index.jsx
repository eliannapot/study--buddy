import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";

import colors from "./config/colors";

const LandingScreen = () => {
  
  const { user, loading, logout, isInitialized } = useAuth();
  const router = useRouter();
  
  // useEffect(() => {

  //   if (user) {
  //     console.log("User is logged in:", user);
  //     // logout();
  //   };
  //   console.log("index loading", loading)
  //   if (!loading) {
  //     const route = user ? "/dashboard" : "/auth";
  //     console.log("Navigating to:", route);
  //     router.replace(route);
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (!loading) {
  //     const route = user ? "/(tabs)/dashboard" : "/auth"; // Add (tabs) prefix
  //     router.replace(route);
  //   }
  // }, [user, loading]); 

  useEffect(() => {
    if (!isInitialized || loading) return; 
    console.log("UseEffect in INDEX");
    router.navigate(user ? "/dashboard" : "/auth");
  }, [user, loading, isInitialized]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View
      style={styles.container}
    >
      <Text>Welcome to the landing page!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => { 
          const route = user ? "/dashboard" : "/auth";
          console.log("Navigating via button to:", route);
          router.replace(route);
      }}>
        <Text style={styles.text}>Click me to navigate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  button: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    color: colors.white,
    fontSize: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingScreen;
