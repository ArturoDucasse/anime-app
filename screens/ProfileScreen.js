import { useContext } from "react";
import { View, Text } from "react-native";

import { UserContext } from "../App";
import { styles } from "../src/components/profile/styles";
import List from "../src/components/profile/List";

const ProfileScreen = ({ navigation }) => {
  const { name, waitingToFinish, waitingToBeReleased } =
    useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>{name}</Text>
      </View>
      {List(waitingToFinish, "Waiting to finish", navigation)}
      {List(waitingToBeReleased, "Waiting to be released", navigation)}
    </View>
  );
};

export default ProfileScreen;
