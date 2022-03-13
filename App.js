import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black
} from "@expo-google-fonts/roboto";

import RootNavigator from "./navigation/RootNavigator";
import registerBackgroundFetchAsync from "./utils/backgroundFetch";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

//If there's no user return
//If there's no anime ids return

//If the anime completed is from "Waiting to finish list"
// Add it to finish list
// Delete it from waiting to finish list
// Update user in db
// Notify the user

//If the anime completed is from "Waiting for release list"
// Add it to waiting for waiting to finish list
// Delete it from waiting for release list
// Update user in db
// Notify the user

export default function App() {
  useEffect(() => {
    const shit = async () => {
      await registerBackgroundFetchAsync();
    };
    shit();
    Notifications.addNotificationReceivedListener(async (notification) => {
      //notification.request.content.title : returns the title
      //notification.request.content.body : returns the body
      //notification.request.content.data : returns the data
    });
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
