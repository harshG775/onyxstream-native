import { fontSize } from "@/constants/styles.constants";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
export default function TabsNavigationLayout() {
    const background = useThemeColor({}, "background");
    const primaryColor = useThemeColor({}, "primary");
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: primaryColor,
                tabBarLabelStyle: {
                    ...fontSize._Sm,
                    fontWeight: "500",
                },
                headerShown: false,
                tabBarStyle: {
                    // position: "absolute",
                    // borderTopLeftRadius: 20,
                    // borderTopRightRadius: 20,
                    borderTopWidth: 0,
                    // borderTopColor: colors.primary,
                    paddingTop: 8,
                    backgroundColor: background,
                },
            }}
        >
            <Tabs.Screen
                name="(index)"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="home" size={20} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
