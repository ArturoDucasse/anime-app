export default async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got ma! 📬",
      body: "Here is the notification body",
      data: { name: "arthur", email: "arturh2@gmail.cmo" }
    },
    trigger: { seconds: 2 }
  });
}
