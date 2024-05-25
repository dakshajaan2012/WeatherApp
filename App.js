import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import WeatherForm from "./components/WeatherForm";
import AboutUs from "./components/AboutUs";
import { UserProvider, useUser } from "./components/UserContext";
import * as AppleAuthentication from "expo-apple-authentication";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const authorizedUsers = [{ userName: "sunil", password: "123" }];

const App = () => {
  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
  );
};

const MainNavigator = () => {
  const { isLoggedIn, login } = useUser();

  const handleLogin = (enteredUser) => {
    const authenticatedUser = authorizedUsers.find(
      (user) =>
        user.userName === enteredUser.userName &&
        user.password === enteredUser.password
    );

    if (authenticatedUser) {
      login(authenticatedUser);
      return true;
    } else {
      return false;
    }
  };

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
        login({ userName: credential.email });
      } else {
        console.log("User cancelled Apple authentication");
      }
    } catch (error) {
      console.log("Error during Apple authentication:", error);
    }
  };

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator initialRouteName="Header">
          <Drawer.Screen name="Header" component={Header} />
          <Drawer.Screen name="Weather" component={WeatherForm} />
          <Drawer.Screen name="AboutUs" component={AboutUs} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginForm
                {...props}
                onLogin={handleLogin}
                onAppleLogin={handleAppleAuthentication}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

/* const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Weather Info"
        component={WeatherForm}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}; */

export default App;
