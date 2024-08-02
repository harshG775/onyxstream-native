import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { Text, View } from "./Themed";
import { colors } from "@/constants/styles.constants";

export function Collapsible({
    children,
    title,
}: PropsWithChildren & { title: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useColorScheme() ?? "light";

    return (
        <View>
            <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                onPress={() => setIsOpen((value) => !value)}
                activeOpacity={0.8}
            >
                <Ionicons
                    name={isOpen ? "chevron-down" : "chevron-forward-outline"}
                    size={18}
                    color={
                        theme === "light" ? colors.light.icon : colors.dark.icon
                    }
                />
                <Text>{title}</Text>
            </TouchableOpacity>
            {isOpen && <View>{children}</View>}
        </View>
    );
}
// className="mt-2 ml-6"
