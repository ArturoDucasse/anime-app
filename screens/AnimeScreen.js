import React, { useState, useEffect, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, FlatList } from "react-native";

import { colors } from "../assets/colors";
import AnimeItem from "../src/components/inbox/AnimeItem";
import SearchBar from "../src/components/inbox/SearchBar";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState({});
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const rawData = await fetch(
        "https://api.jikan.moe/v4/anime?status=airing&sfw&type=tv"
      );
      const { data } = await rawData.json();
      setData(data);
      setFilterData(data);
    };
    fetchData();
  }, []);

  //Todo: refactor
  const filter = async (input) => {
    if (input.length === 0) {
      return setFilterData(data);
    }

    const animeRaw = await fetch(
      `https://api.jikan.moe/v4/anime?q=${input}&sfw`
    );
    const { data: response } = await animeRaw.json();
    setFilterData(response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor={colors.blue} />

      <SearchBar filter={filter} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filterData}
        renderItem={({ item }) => (
          <AnimeItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.mal_id}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: colors.white
  },
  headerTitle: { marginTop: 10, marginLeft: 10 },
  rowBack: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.green,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  }
});
