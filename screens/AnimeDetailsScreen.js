import { Image, ScrollView, View, Text } from "react-native";
import ReadMore from "react-native-read-more-text";

import {
  AnimeButton,
  OpenURLButton,
  styles
} from "../src/components/animeDetails";

const AnimeDetailsScreen = ({ route }) => {
  const { anime } = route.params;
  const animeGenres = anime.genres.map((item) => item.name).join(" - ");
  //Todo: Add anime theme, studio
  //Todo?: Add broadcast

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
          <AnimeButton status={anime.status} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AnimeDetailsScreen;
