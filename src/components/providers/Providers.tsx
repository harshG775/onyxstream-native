import { SafeAreaProvider } from "react-native-safe-area-context";
import TanstackQueryProvider from "./tanstack-query-provider";
import ThemeProvider from "./Theme-provider";

export default function Providers({ children }: any) {
    return (
        <SafeAreaProvider>
            <TanstackQueryProvider>
                <ThemeProvider>
                    {/*  */}
                    {children}
                    {/*  */}
                </ThemeProvider>
            </TanstackQueryProvider>
        </SafeAreaProvider>
    );
}
