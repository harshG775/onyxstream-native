import { useThemeColor } from "@/components/ui/Themed";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeScreenLayout() {
    const text = useThemeColor({}, "text");
    const primaryColor = useThemeColor({}, "primary");
    return (
        <View style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerTintColor: text,
                    headerStyle: { backgroundColor: primaryColor },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        headerTitle: "Home",
                    }}
                />
            </Stack>
        </View>
    );
}
