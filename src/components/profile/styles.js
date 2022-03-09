import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
