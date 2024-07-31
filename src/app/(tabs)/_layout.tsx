import { colors, fontSize } from "@/constants/tokens"
import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"
export default function TabsNavigationLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarLabelStyle: {
                    fontSize: fontSize.xs,
                    fontWeight: "500",
                },
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderTopWidth: 0,
                    paddingTop: 8,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={20} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
