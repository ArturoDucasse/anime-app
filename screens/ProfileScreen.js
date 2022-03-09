import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  Pressable,
  Button
} from "react-native";

import { UserContext } from "../App";

import useAnimeFetch from "../utils/useAnimeFetch";

const ProfileScreen = ({ navigation }) => {
  const user = useContext(UserContext);

  return user ? userProfileScreen(user, navigation) : LoginButton;
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  animeItemImage: {
    width: 200,
    height: 200
  },
  userName: {
    fontSize: 24
  },
  userNameContainer: {
    alignItems: "center",
    marginVertical: 20
  },
  animeItemContainer: {
    marginHorizontal: 10
  },
  animeItemName: {
    position: "absolute",
    bottom: 3,
    left: 5,
    backgroundColor: "black",
    color: "white",
    padding: 5,
    fontSize: 12,
    width: 120
  },
  subHeader: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5
  },
  wishListContainer: { marginTop: 15 },
  wishListFlatList: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70
  },
  wishListButton: {
    marginRight: 20,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "red",
    fontWeight: "bold",
    width: 35,
    height: 40,
    textAlign: "center"
  },
  wishListItem: { padding: 3, marginLeft: 5, fontSize: 16, width: 330 },
  wishListHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8
  }
});

const animeItem = ({ item }, navigation) => {
  return (
    <Pressable
      onPress={() => navigationToAnimeScreenDetails(item.mal_id, navigation)}
    >
      <View style={styles.animeItemContainer}>
        <Image
          source={{
            uri: item.images.jpg.large_image_url
          }}
          style={styles.animeItemImage}
        />
        <Text numberOfLines={1} style={styles.animeItemName}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

function userProfileScreen(
  { name, waitingToFinish, waitingToBeReleased },
  navigation
) {
  return (
    <View style={styles.container}>
      <View style={styles.userNameContainer}>
        <Text style={styles.userName}>{name}</Text>
      </View>
      {List(waitingToFinish, "Waiting to finish", navigation)}
      {List(waitingToBeReleased, "Waiting to be released", navigation)}
    </View>
  );
}

function List(animeIds, header, navigation) {
  const animes = useAnimeFetch(animeIds);
  return (
    <View style={styles.flatListContainer}>
      <Text style={styles.subHeader}>{header}</Text>
      <FlatList
        horizontal
        data={animes}
        renderItem={(item) => animeItem(item, navigation)}
        keyExtractor={(item) => item.mal_id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const navigationToAnimeScreenDetails = async (animeId, navigation) => {
  try {
    const raw = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const { data: anime } = await raw.json();
    navigation.navigate("AnimeDetails", { anime });
  } catch (err) {
    console.log(err);
  }
};
