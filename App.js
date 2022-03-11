import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black
} from "@expo-google-fonts/roboto";

import RootNavigator from "./navigation/RootNavigator";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export default function App() {
  useEffect(() => {
    Notifications.addNotificationReceivedListener((notification) => {
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
