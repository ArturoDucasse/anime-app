import { Pressable, View, Image, Text } from "react-native";

import { styles } from "./styles";

const AnimeItem = ({ item }, navigation) => {
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

export default AnimeItem;

const navigationToAnimeScreenDetails = async (animeId, navigation) => {
  try {
    const raw = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const { data: anime } = await raw.json();
    navigation.navigate("AnimeDetails", { anime });
  } catch (err) {
    console.log(err);
  }
};
