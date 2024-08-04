import EpisodesDrawer from "@/components/screenComponents/info/EpisodesDrawer";
import Genres from "@/components/screenComponents/info/Genres";
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
                    style={{ width: "100%", height: 120 }}
                />
                <View style={{ padding: 8 }}>
                    <Image
                        source={{ uri: data.coverImage.large || "" }}
                        style={{ width: 150, height: 200 }}
                    />
                    <Text style={{ fontWeight: "800", ...fontSize._Xl }}>
                        {data.title.userPreferred}
                    </Text>
                    <Genres genres={data.genres} />
                    <EllipseText numberOfLines={4} title={"Description"}>
                        {/* {data.description} */}
                        {purifyDescriptionToArray(data.description || "").map(
                            (e) => e,
                        )}
                    </EllipseText>
                </View>

                {/* Divider */}
                <View style={{ height: 100 }}></View>
            </ScrollView>
            <EpisodesDrawer animeId="" title={data.title} />
        </>
    );
}
