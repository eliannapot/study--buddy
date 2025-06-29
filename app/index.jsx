import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "../contexts/AuthContext";
import colors from "./config/colors";

const LandingScreen = () => {
  
  const { user, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
      
    if (loading) return;

    // Redirect to dashboard if user is logged in
    if (user) {
      router.replace("/dashboard");
    }
    else if (!user) {
      router.replace("/auth");
    }

    console.log("User:", user);
  }, [user, loading]);

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
          router.replace("/dashboard")
      }}>
        <Text>Click me to navigate</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default LandingScreen;
