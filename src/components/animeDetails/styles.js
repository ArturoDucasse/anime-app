import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  scrollView: { backgroundColor: "white" },
  image: {
    height: Dimensions.get("window").height / 2.5,

    resizeMode: "stretch",
    width: Dimensions.get("window").width
  },
  imageHeader: {
    position: "absolute",
    top: 10,
    right: 20,
    backgroundColor: "gray",
    color: "white",
    fontSize: 15,
    padding: 10,
    borderRadius: 30
  },
  subContainer: {
    padding: 5
  },
  header: {
    alignItems: "center"
  },
  headerText: {
    fontSize: 40
  },
  detailsContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  detailsSubContainer: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10
  },
  detailHeader: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center"
  },
  detailInfo: {
    fontSize: 12,
    color: "gray",
    textAlign: "center"
  },
  synopsisContainer: {
    padding: 5
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  }
});

export default styles;
