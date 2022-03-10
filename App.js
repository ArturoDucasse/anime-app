import React, { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black
} from "@expo-google-fonts/roboto";

import RootNavigator from "./navigation/RootNavigator";

export const UserContext = createContext({});

export default function App() {
  const [user, setUser] = useState({
    name: "Mario Sunshine",
    waitingToFinish: [1],
    waitingToBeReleased: [1, 5]
  });

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <UserContext.Provider value={user}>
        <RootNavigator />
      </UserContext.Provider>
    </NavigationContainer>
  );
}
