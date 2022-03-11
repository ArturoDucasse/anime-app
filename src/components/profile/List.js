import { View, Text, FlatList } from "react-native";

import { styles } from "./styles";
import AnimeItem from "./AnimeItem";
import useAnimeFetch from "../../../hooks/useAnimeFetch";

const List = ({ animeIds, header, navigation }) => {
  const animes = useAnimeFetch(animeIds);
  const animesIds = animes.map((anime) => anime.mal_id);
  console.log(animesIds, "animes");

  return (
    <View style={styles.flatListContainer}>
      <Text style={styles.subHeader}>{header}</Text>
      <FlatList
        horizontal
        data={animes}
        renderItem={(item) => AnimeItem(item, navigation)}
        keyExtractor={(item) => item.mal_id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default List;
