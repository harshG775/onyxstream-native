import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Providers from "@/components/providers/Providers";
function RootNavigation() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="anime/[animeId]"
                options={{ headerShown: true, animation: "slide_from_bottom" }}
            />
        </Stack>
    );
}

export default function AppLayout() {
    return (
        <Providers>
            <RootNavigation />
            <StatusBar style="auto" />
        </Providers>
    );
}
