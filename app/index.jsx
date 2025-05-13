import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const LandingScreen = () => {
  
  const router = useRouter();
  
  return (
    <View
      style={styles.container}
    >
      <Text>Welcome to the landing page!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => { 
          router.replace("/auth")
      }}>
        <Text>Click me to navigate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
