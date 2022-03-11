import { useEffect, useState } from "react";
import { Image, ScrollView, View, Text, Button } from "react-native";
import ReadMore from "react-native-read-more-text";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import {
  AnimeButton,
  OpenURLButton,
  styles
} from "../src/components/animeDetails";

const AnimeDetailsScreen = ({ route }) => {
  const [user, setUser] = useState(null);
  const { getItem, removeItem } = useAsyncStorage("user");
  const { anime } = route.params;
  const animeGenres = anime.genres.map((item) => item.name).join(" - ");
  //Todo: Add anime theme, studio
  //Todo?: Add broadcast

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getItem();
      const user = JSON.parse(response);
      setUser(user);
    };
    fetchUser();
  }, []);

  //Todo: Delete anime from waitingToFinishList
  //Todo: Delete anime from waitingForReleaseList

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
              onClick={() => deleteAnime(anime.mal_id)}
            />
          ) : (
            <AnimeButton status={anime.status} animeId={anime.mal_id} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AnimeDetailsScreen;
