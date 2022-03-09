import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { colors } from "../assets/colors";
import AnimeScreen from "../screens/AnimeScreen";
import BottomTabContainer from "./BottomTabContainer";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarActiveTintColor: colors.black,
  tabBarInactiveTintColor: colors.gray,
  tabBarLabelStyle: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800"
  },
  tabBarStyle: {
    backgroundColor: colors.lightBlue,
    borderTopWidth: 0,
    elevation: 0,
    height: 58
  }
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator shifting={true} screenOptions={screenOptions}>
      <Tab.Screen
        name="Animes"
        component={AnimeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Animes",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <BottomTabContainer>
                <Entypo name="list" size={24} color="black" />
              </BottomTabContainer>
            ) : (
              <Entypo name="list" size={24} color="black" />
            )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <BottomTabContainer>
                <AntDesign name="user" size={24} color="black" />
              </BottomTabContainer>
            ) : (
              <AntDesign name="user" size={24} color="black" />
            )
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
