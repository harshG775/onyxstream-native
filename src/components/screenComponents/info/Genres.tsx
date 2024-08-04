import { Text, View } from "@/components/ui/Themed";

export default function Genres({ genres }: { genres: string[] }) {
    return (
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                gap: 4,
                paddingVertical: 4,
            }}
        >
            {genres.map((genre, i) => (
                <View
                    key={genre + i}
                    darkColor="#eee"
                    lightColor="#111"
                    style={{ padding: 2 }}
                >
                    <Text
                        darkColor="#111"
                        lightColor="#eee"
                        style={{ fontWeight: "700" }}
                    >
                        {genre}
                    </Text>
                </View>
            ))}
        </View>
    );
}
