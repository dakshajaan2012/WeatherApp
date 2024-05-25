import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./UserContext";

function AboutUs() {
  const navigation = useNavigation();
  const { logout } = useUser();

  const handleMenu = () => {
    navigation.navigate("Header");
  };

  const handleLogout = () => {
    logout();
    navigation.navigate("Login"); // navigate to login page
  };

  return (
    <View style={styles.aboutUsContainer}>
      <Text style={styles.title}>About Weather Pro</Text>
      <Text style={styles.description}>
        Discover Weather Pro - your smart solution for seamless travel. Our
        innovative app provides real-time weather updates and insights. Whether
        planning a road trip or commuting, trust Weather Pro to revolutionize
        your travel routine. Say goodbye to weather worries with ease!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleMenu}>
          <Text style={styles.buttonText}>Go to Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aboutUsContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "left",
  },
  description: {
    fontSize: 18,
    color: "#666",
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 45,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AboutUs;
