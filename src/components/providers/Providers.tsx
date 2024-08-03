import { SafeAreaProvider } from "react-native-safe-area-context";
import TanstackQueryProvider from "./tanstack-query-provider";
import ThemeProvider from "./Theme-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <SafeAreaProvider>
            <TanstackQueryProvider>
                <ThemeProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        {/*  */}
                        {children}
                        {/*  */}
                    </GestureHandlerRootView>
                </ThemeProvider>
            </TanstackQueryProvider>
        </SafeAreaProvider>
    );
}
