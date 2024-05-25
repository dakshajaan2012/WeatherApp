import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as AppleAuthentication from "expo-apple-authentication";
import { useUser } from "./UserContext";

const LoginForm = ({ onLogin, onAppleLogin, ...props }) => {
  console.log("Props received by LoginForm:", props);

  const { login } = useUser();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // Function to handle Apple authentication
  const handleAppleAuthentication = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        console.log("Apple authentication credential:", credential);

        const user = {
          userName: credential.email || credential.user,
          fullName: credential.fullName,
          userId: credential.user,
        };

        // Log the user in via the context
        login(user);

        // Set the logged-in state in the parent App component
        //setLoggedIn(true);

        // Navigate to the main screen
        navigation.navigate("Header");
      } else {
        console.log("User cancelled Apple authentication");
      }
    } catch (error) {
      console.log("Error during Apple authentication:", error);
    }
  };

  const handleSubmit = () => {
    const user = { userName, password };
    console.log("Entered Username:", userName); // Debugging log
    console.log("Entered Password:", password); // Debugging log
    const isAuthenticated = onLogin(user);

    if (isAuthenticated) {
      login(user); // Call login from context
      navigation.navigate("Header");
    } else {
      Alert.alert(
        "Invalid credentials",
        "Please check your username and password."
      );
      setUserName("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
        placeholder="Enter username"
        placeholderTextColor="#888"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.appleButton}
        onPress={handleAppleAuthentication}
      >
        <Text style={styles.buttonText}>Sign in with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 80,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  appleButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 20,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 80,
    marginTop: 10,
  },
});

export default LoginForm;
