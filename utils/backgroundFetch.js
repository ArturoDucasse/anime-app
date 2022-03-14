import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import pushNotification from "./pushNotification";

const BACKGROUND_FETCH_TASK = "background-fetch";

const { getItem: getUser, setItem: setUser } = useAsyncStorage("user");

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  await checkUser();

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true // android only
  });
}

export default registerBackgroundFetchAsync;

//Todo: Notify user
const checkUser = async () => {
  try {
    const user = await getUser();
    if (!user) return;
    const parsedUser = JSON.parse(user);
    if (!Object.values(user).length) return;

    for (let [key, value] of Object.entries(parsedUser)) {
      for (let id of value) {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const {
          data: { status, title }
        } = await response.json();

        if (key === "waitingToFinishList" && status === "Finished Airing") {
          const user = await getUser();
          const updatedUser = JSON.parse(user);
          const filterArray = updatedUser.waitingToFinishList.filter(
            (animeId) => animeId !== id
          );
          const newUser = {
            ...updatedUser,
            [key]: filterArray,
            finishedAiring: !updatedUser.finishedAiring
              ? [id]
              : [...updatedUser.finishedAiring, id]
          };
          setUser(JSON.stringify(newUser));
          await pushNotification("Anime finished!", title, id);
        }
        if (key === "waitingForReleaseList" && status === "Currently Airing") {
          const user = await getUser();
          const updatedUser = JSON.parse(user);
          const filterArray = updatedUser.waitingForReleaseList.filter(
            (animeId) => animeId !== id
          );
          const newUser = {
            ...updatedUser,
            [key]: filterArray,
            waitingToFinishList: !updatedUser.waitingToFinishList
              ? [id]
              : [...updatedUser.waitingToFinishList, id]
          };
          setUser(JSON.stringify(newUser));
          await pushNotification("Anime Released!", title, id);
        }
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
};
