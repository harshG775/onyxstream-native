import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider as DefaultThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

export default function ThemeProvider({ children }: any) {
    const colorScheme = useColorScheme();

    return (
        <DefaultThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            {children}
        </DefaultThemeProvider>
    );
}
