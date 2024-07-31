import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"

function RootNavigation() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    )
}

export default function AppLayout() {
    return (
        <SafeAreaProvider>
            <RootNavigation />
            <StatusBar style="auto" />
        </SafeAreaProvider>
    )
}
