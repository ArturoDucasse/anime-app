import ReadMore from "react-native-read-more-text";
import { Image, ScrollView, View, Text, Button } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import {
  AnimeButton,
  OpenURLButton,
  styles
} from "../src/components/animeDetails";
import useUserFetch from "../hooks/useUserFetch";

const { getItem, setItem } = useAsyncStorage("user");

const AnimeDetailsScreen = ({ route }) => {
  const [user, setUser] = useUserFetch();
  const { anime } = route.params;
  const animeGenres = anime.genres.map((item) => item.name).join(" - ");
  //Todo: Add anime theme, studio
  //Todo?: Add broadcast

  const updateUser = (value) => setUser(value);

  const isAnimeSaved = (animeId) => {
    if (!user) return false;
    if (user.waitingToFinishList && user.waitingToFinishList.includes(animeId))
      return true;
    if (
      user.waitingForReleaseList &&
      user.waitingForReleaseList.includes(animeId)
    )
      return true;
    return false;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={{
            uri: anime.images.jpg.large_image_url
          }}
        />
        {anime.demographics[0] && (
          <Text style={styles.imageHeader}>{anime.demographics[0].name}</Text>
        )}
        <View style={styles.subContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{anime.title}</Text>
          </View>
          <View>
            <Text style={styles.subHeader}>Genres</Text>
            <Text style={{ fontSize: 18, marginLeft: 5 }}>{animeGenres}</Text>
          </View>
          <View style={styles.synopsisContainer}>
            <Text style={styles.subHeader}>Description</Text>
            <ReadMore numberOfLines={5}>
              <Text style={styles.cardText}>{anime.synopsis}</Text>
            </ReadMore>
          </View>
          <OpenURLButton url={anime.trailer.url}>Trailer</OpenURLButton>
          <View style={{ margin: 15 }} />
          {isAnimeSaved(anime.mal_id) ? (
            <Button
              title="Delete from list"
              onPress={async () => await deleteAnime(anime.mal_id, updateUser)}
              color="red"
              accessibilityLabel="Delete anime from list"
            />
          ) : (
            <AnimeButton
              status={anime.status}
              animeId={anime.mal_id}
              updateUser={updateUser}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AnimeDetailsScreen;

const deleteAnime = async (animeId, updateUser) => {
  const response = await getItem();
  const user = JSON.parse(response);
  if (user.waitingToFinishList && user.waitingToFinishList.includes(animeId)) {
    const newArray = user.waitingToFinishList.filter((id) => id !== animeId);
    const userDetails = { ...user, waitingToFinishList: newArray };
    const newUser = JSON.stringify(userDetails);
    await setItem(newUser);
    return updateUser(userDetails);
  }
  if (
    user.waitingForReleaseList &&
    user.waitingForReleaseList.includes(animeId)
  ) {
    const newArray = user.waitingForReleaseList.filter((id) => id !== animeId);
    const userDetails = {
      ...user,
      waitingForReleaseList: newArray
    };
    const newUser = JSON.stringify(userDetails);
    await setItem(newUser);
    return updateUser(newUser);
  }
  throw new Error("Anime not found");
};
