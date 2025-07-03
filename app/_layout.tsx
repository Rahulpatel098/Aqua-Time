import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { UserProvider, useUser } from "@/context/UserContext";
import { useEffect } from "react";
import "../global.css";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();
  const segments = useSegments();
  useEffect(() => {
    const inGetStatredGroup = segments[0] === "getStarted";

    if (!user && !inGetStatredGroup && !isLoadingUser) {
      router.replace("/getStarted");
    } else if (user && inGetStatredGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);
  return <>{children}</>;
}
export default function RootLayout() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <RouteGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </RouteGuard>
      </SafeAreaProvider>

    </UserProvider>

  );
};
