import { Button } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const { getItem, setItem } = useAsyncStorage("user");

const AnimeButton = ({ status, animeId }) => {
  if (status === "Currently Airing")
    return (
      <Button
        onPress={async () => await addToList("waitingToFinishList", animeId)}
        title="Notify me when finished"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />
    );

  if (status === "Not yet aired")
    return (
      <Button
        onPress={async () => await addToList("waitingForReleaseList", animeId)}
        title="Notify me when released"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />
    );
  return null;
};

export default AnimeButton;

const addToList = async (listName, animeId) => {
  const response = await getItem();
  const user = JSON.parse(response);
  if (!response) {
    const user = {
      [listName]: [animeId]
    };
    const jsonUser = JSON.stringify(user);
    setItem(jsonUser);
    console.log(await getItem(), "inside conditional");
    return;
  }

  if (user[listName] && user[listName].includes(animeId))
    return alert("Anime already saved!");

  const newUser = {
    ...user,
    [listName]: user[listName] ? [...user[listName], animeId] : [animeId]
  };
  setItem(JSON.stringify(newUser));
  console.log(await getItem(), "outside conditional");
};
