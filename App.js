import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import SignInScreen from "./screens/SignInScreen";
import AccountScreen from "./screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) setSignedIn(true);
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen component={AccountScreen} name="Account" />
        <Stack.Screen component={SignInScreen} name="SignIn" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});