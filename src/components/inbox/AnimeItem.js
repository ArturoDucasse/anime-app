import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { colors } from "../../../assets/colors";
import { fontFamily } from "../../../assets/font";

const AnimeItem = ({ item: anime, navigation }) => {
  const navigateToAnimeDetails = () => {
    navigation.navigate("AnimeDetails", { anime });
  };

  return (
    <TouchableHighlight onPress={() => navigateToAnimeDetails()}>
      <View style={styles.container}>
        <Image
          source={{ uri: anime.images.jpg.large_image_url }}
          style={styles.avatar}
        />
        <Text style={styles.subTitleHeader}>Rank: {anime.rank}</Text>
        <Text style={styles.subTitleBottom}>{anime.score}</Text>
        <View style={styles.animeTitle}>
          <Text style={styles.title}>{anime.title}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default AnimeItem;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 6,
    margin: 10
  },
  avatar: {
    height: Dimensions.get("window").height / 2,
    width: Dimensions.get("window").width,
    resizeMode: "stretch"
  },
  animeTitle: {
    justifyContent: "flex-start",
    width: Dimensions.get("window").width - 20,
    padding: 5
  },

  title: {
    fontFamily: fontFamily.bold,
    color: colors.black
  },
  subTitleHeader: {
    position: "absolute",
    top: 10,
    right: 20,
    backgroundColor: "white",
    opacity: 4,
    padding: 3,
    borderRadius: 10
  },
  subTitleBottom: {
    position: "absolute",
    bottom: 40,
    left: 20,
    backgroundColor: "white",
    opacity: 4,
    padding: 5,
    borderRadius: 10
  }
});
