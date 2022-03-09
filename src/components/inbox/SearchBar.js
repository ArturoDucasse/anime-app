import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput } from "react-native";

import { colors } from "../../../assets/colors";
import { fontFamily } from "../../../assets/font";

const SearchBar = ({ filter }) => {
  return (
    <TextInput
      style={styles.searchContainer}
      placeholder="Search animes"
      keyboardType="default"
      onChangeText={filter}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    height: 48,
    width: "96%",
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: colors.lightBlue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    justifyContent: "space-between",
    marginBottom: 5
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray,
    fontFamily: fontFamily.regular
  },
  avatar: { height: 32, width: 32 }
});
