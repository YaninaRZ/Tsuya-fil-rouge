import { AuthProvider, useAuth } from "@/context/AuthContext";
import { HabitsProvider } from "@/context/HabitsContext";
import { requestPermissions, scheduleHabitReminder, scheduleStreakAlert } from "@/lib/notifications";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootNavigation() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    requestPermissions().then((granted) => {
      if (granted) {
        scheduleHabitReminder(true);
        scheduleStreakAlert(true);
      }
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/login"); // pas connecté → login
    } else if (session && inAuthGroup) {
      router.replace("/"); // connecté → accueil
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <HabitsProvider>
          <RootNavigation />
        </HabitsProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
