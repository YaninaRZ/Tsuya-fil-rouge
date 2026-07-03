import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export async function scheduleHabitReminder(enabled: boolean) {
  await Notifications.cancelScheduledNotificationAsync("habit-reminder").catch(() => {});
  if (!enabled) return;

  await Notifications.scheduleNotificationAsync({
    identifier: "habit-reminder",
    content: {
      title: "C'est l'heure de tes habitudes ! 🐱",
      body: "Ouvre TsuyaApp et coche tes habitudes du jour.",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 0,
    },
  });
}

export async function scheduleStreakAlert(enabled: boolean) {
  await Notifications.cancelScheduledNotificationAsync("streak-alert").catch(() => {});
  if (!enabled) return;

  await Notifications.scheduleNotificationAsync({
    identifier: "streak-alert",
    content: {
      title: "Ton streak est en danger ! 🔥",
      body: "Tu n'as encore rien validé aujourd'hui. Vite avant minuit !",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 20,
      minute: 0,
    },
  });
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
