import TanstackQueryProvider from "@/components/providers/tanstack-query-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
function RootNavigation() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}

export default function AppLayout() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <TanstackQueryProvider>
                    <RootNavigation />
                    <StatusBar style="auto" />
                </TanstackQueryProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
