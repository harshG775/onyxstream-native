import { EllipseText } from "@/components/ui/EllipseText";
import { Text, View, ScrollView } from "@/components/ui/Themed";
import { fontSize } from "@/constants/styles.constants";
import { InfoMedia } from "@/services/aniList/aniListTypes";
import { useGetInfo } from "@/services/aniList/queries.tanstack";
import { purifyDescriptionToArray } from "@/utils/purifyDescriptionToArray";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { Image } from "react-native";

export default function AnimeScreen() {
    const { animeId }: { animeId: string } = useLocalSearchParams();
    const { data, status, error } = useGetInfo(animeId);

    if (status === "pending") {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
    if (status === "error") {
        console.log(error);
        return (
            <View>
                <Text>Something went wrong</Text>
            </View>
        );
    }
    if (status === "success") {
        return <AnimeInfoScreen data={data} />;
    }
}

function AnimeInfoScreen({ data }: { data: InfoMedia }) {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: data.title.userPreferred,
        });
    }, [navigation, data.title.userPreferred]);
    return (
        <>
            <ScrollView>
                <Image
                    source={{ uri: data.bannerImage || "" }}
                    style={{ width: "100%", height: 100 }}
                />
                <Text style={{ fontWeight: "800", ...fontSize._Xl }}>
                    {data.title.userPreferred}
                </Text>
                <EllipseText numberOfLines={4} title={"Description"}>
                    {/* {data.description} */}
                    {purifyDescriptionToArray(data.description || "").map(
                        (e) => e,
                    )}
                </EllipseText>
                <View style={{ height: 100 }}></View>
            </ScrollView>
            <Episodes />
        </>
    );
}

import BottomSheetDrawer from "@/components/ui/BottomSheetDrawer";
function Episodes() {
    const Episodes = [
        {
            episode: "1",
        },
        {
            episode: "2",
        },
        {
            episode: "3",
        },
        {
            episode: "4",
        },
    ];
    return (
        <BottomSheetDrawer>
            <View style={{ flex: 1 }} darkColor="#111" lightColor="#eee">
                <Text style={{ ...fontSize._Xl, padding: 6 }}>Episodes</Text>
                <ScrollView>
                    {Episodes.map((ep) => (
                        <View
                            key={ep.episode}
                            style={{
                                padding: 30,
                            }}
                        >
                            <Text>Episodes-{ep.episode}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </BottomSheetDrawer>
    );
}
