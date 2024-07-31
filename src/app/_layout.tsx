import TanstackQueryProvider from "@/components/providers/tanstack-query-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RootNavigation() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function AppLayout() {
    return (
        <SafeAreaProvider>
            <TanstackQueryProvider>
                <RootNavigation />
                <StatusBar style="auto" />
            </TanstackQueryProvider>
        </SafeAreaProvider>
    );
}
