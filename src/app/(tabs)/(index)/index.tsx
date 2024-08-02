import { Text, View } from "@/components/ui/Themed";
import { colors, fontSize } from "@/constants/styles.constants";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TrendingReleasingMedia } from "@/services/aniList/aniListTypes";
import { useGetTrendingReleasing } from "@/services/aniList/queries.tanstack";
// import { useGetRecentEpisodes } from "@/services/gogoanime/queries.tanstack";
import { Link } from "expo-router";
import { StyleSheet, Image, FlatList, TouchableHighlight } from "react-native";
// import { Image } from "expo-image";
export default function HomeScreen() {
    const { data, status, error } = useGetTrendingReleasing();
    if (status === "error") console.log(error);
    return (
        <View>
            {status === "pending" && <Text>Loading...</Text>}
            {status === "error" && <Text>Something went wrong</Text>}
            {status === "success" && (
                <FlatList
                    horizontal={false}
                    data={data.media}
                    // numColumns={2}
                    renderItem={({ item, index }) => (
                        <>
                            <AnimeListItem anime={item} key={index} />
                        </>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ padding: 4 }}></View>
                    )}
                />
            )}
        </View>
    );
}
function AnimeListItem({ anime }: { anime: TrendingReleasingMedia }) {
    const primary = useThemeColor({}, "primary");
    return (
        <Link asChild href={`/anime/${anime.id}`}>
            <TouchableHighlight
                activeOpacity={0.6}
                underlayColor={primary}
                // onPress={() => alert("Pressed!")}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    padding: 2,
                }}
            >
                <>
                    <Image
                        style={{
                            flexShrink: 0,
                            flexGrow: 0,
                            width: 100,
                            height: 100,
                        }}
                        source={{ uri: anime.coverImage.large || "" }}
                    />

                    <View style={{ flex: 1, paddingHorizontal: 4, gap: 4 }}>
                        <Text>{anime.title.userPreferred}</Text>
                        <Text
                            style={{
                                fontStyle: "italic",
                            }}
                        >
                            {anime.averageScore
                                ? `${(anime.averageScore * 0.1).toFixed(2)}/10`
                                : "not rated"}
                        </Text>
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontStyle: "italic",
                            }}
                        >
                            {anime.format}
                        </Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            {anime.genres.map((g) => (
                                <Text key={g}>{`${g}, `}</Text>
                            ))}
                        </View>
                    </View>
                </>
            </TouchableHighlight>
        </Link>
    );
}
