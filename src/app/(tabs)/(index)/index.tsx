import { Text, View, ScrollView } from "@/components/ui/Themed";
import { useGetRecentEpisodes } from "@/services/gogoanime/queries.tanstack";
import { StyleSheet, Image, FlatList, TouchableHighlight } from "react-native";
// import { Image } from "expo-image";
export default function HomeScreen() {
    const { data, status, error, refetch } = useGetRecentEpisodes();
    if (status === "error") console.log(error);
    return (
        <ScrollView>
            {status === "pending" && <Text>Loading...</Text>}
            {status === "error" && <Text>Something went wrong</Text>}
            {status === "success" && (
                <ScrollView>
                    <FlatList
                        data={data.results}
                        renderItem={({ item, index, separators }: any) => (
                            <AnimeListItem anime={item} key={index} />
                        )}
                    />
                </ScrollView>
            )}
        </ScrollView>
    );
}
function AnimeListItem({ anime }: any) {
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={"red"}
            onPress={() => alert("Pressed!")}
        >
            <View>
                <View>
                    <Image style={styles.image} source={{ uri: anime.image }} />
                </View>
                <Text>{anime.title}</Text>
            </View>
        </TouchableHighlight>
    );
}
// Image.resolveAssetSource(unknownTrackImage).uri
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        width: "100%",
        height: 100,
        backgroundColor: "#0553",
    },
});
