import * as Notifications from "expo-notifications";

export default async function schedulePushNotification(title, body, animeId) {
  console.log("Notification!");
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${title} 📬`,
      body: `${body}`,
      data: { screen: "Todo", animeId }
    },
    trigger: { seconds: 3 }
  });
}
