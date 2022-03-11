import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { styles } from "../src/components/profile/styles";
import List from "../src/components/profile/List";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const { getItem, setItem } = useAsyncStorage("user");

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getItem();
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    };
    fetchUser();
  }, []);

  const { name, waitingToFinish, waitingToBeReleased } = user;

  return Object.keys(user).length ? (
    <View style={styles.container}>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>{name}</Text>
      </View>
      <List
        animeIds={waitingToFinish}
        header="Waiting to finish"
        navigation={navigation}
      />
      <List
        animeIds={waitingToBeReleased}
        header="Waiting to be released"
        navigation={navigation}
      />
    </View>
  ) : (
    <Text style={{ paddingTop: 50 }}>Loading</Text>
  );
};

export default ProfileScreen;
