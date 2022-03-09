import { View, Text, FlatList } from "react-native";

import useAnimeFetch from "../../../utils/useAnimeFetch";
import AnimeItem from "./AnimeItem";

import { styles } from "./styles";

const List = (animeIds, header, navigation) => {
  const animes = useAnimeFetch(animeIds);
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
