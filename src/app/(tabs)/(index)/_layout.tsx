import { StackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/tokens";
import { defaultStyles } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function HomeScreenLayout() {
    return (
        <View style={defaultStyles.container}>
            <Stack
                screenOptions={{
                    headerTintColor: colors.text,
                    headerStyle: { backgroundColor: colors.primary },
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        ...StackScreenWithSearchBar,
                        headerTitle: "Home",
                    }}
                />
            </Stack>
        </View>
    );
}
