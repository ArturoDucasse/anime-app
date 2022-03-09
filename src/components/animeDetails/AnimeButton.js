import { Button } from "react-native";

const AnimeButton = ({ status }) => {
  if (status === "Currently Airing")
    return (
      <Button
        onPress={notifyMeWhenFinished}
        title="Notify me when finished"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />
    );

  if (status === "Not yet aired")
    return (
      <Button
        onPress={notifyMeWhenReleased}
        title="Notify me when released"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />
    );
  return null;
};

export default AnimeButton;

const notifyMeWhenReleased = () => alert("Notify when released!!");

const notifyMeWhenFinished = () => alert("Notify when finished!");
