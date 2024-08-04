import EpisodesDrawer from "@/components/screenComponents/info/EpisodesDrawer";
import Genres from "@/components/screenComponents/info/Genres";
import { EllipseText } from "@/components/ui/EllipseText";
import ParallaxScrollView from "@/components/ui/ParallaxScrollView";
import { ScrollView, Text, View } from "@/components/ui/Themed";
import { fontSize } from "@/constants/styles.constants";
import { InfoMedia } from "@/services/aniList/aniListTypes";
import { useGetInfo } from "@/services/aniList/queries.tanstack";
import { purifyDescriptionToArray } from "@/utils/purifyDescriptionToArray";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { PropsWithChildren, useLayoutEffect } from "react";
import { Image, StyleSheet } from "react-native";

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
            <ParallaxScrollView
                headerBackgroundColor={{ light: "#eee", dark: "#222" }}
                headerImage={
                    <Image
                        source={{
                            uri: data.bannerImage || data.coverImage.extraLarge,
                        }}
                        style={{ width: "100%", height: "100%" }}
                    />
                }
            >
                <View style={{ flex: 1, padding: 8 }}>
                    <Image
                        source={{ uri: data.coverImage.large || "" }}
                        style={{ width: 150, height: 200 }}
                    />
                    <Text
                        style={{ fontWeight: "800", ...fontSize._Xl }}
                        selectable={true}
                    >
                        {data.title.userPreferred}
                    </Text>

                    <Genres genres={data.genres} />
                    <EllipseText numberOfLines={4} title={"Description"}>
                        {/* {data.description} */}
                        {purifyDescriptionToArray(data.description || "").map(
                            (e) => e,
                        )}
                    </EllipseText>
                    <View>
                        <Text>Info</Text>
                        <InfoItem>
                            <Text style={{ fontWeight: "800" }}>Romaji</Text>
                            <Text selectable={true}>{data.title.romaji}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>English</Text>
                            <Text selectable={true}>{data.title.english}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>Native</Text>
                            <Text selectable={true}>{data.title.native}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>
                                User Preferred
                            </Text>
                            <Text selectable={true}>{data.title.userPreferred}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>Formate</Text>
                            <Text selectable={true}>{data.type}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>Episodes</Text>
                            <Text selectable={true}>{data.episodes}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>
                                Episodes Duration
                            </Text>
                            <Text selectable={true}>{data.duration}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>
                                Start Date
                            </Text>
                            <Text>
                                {data.startDate.day} {data.startDate.month}{" "}
                                {data.startDate.year}
                            </Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>End Date</Text>
                            <Text>
                                {data?.startDate?.day} {data?.startDate.month}{" "}
                                {data?.startDate?.year}
                            </Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>season</Text>
                            <Text selectable={true}>{data.season}</Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>Studio</Text>
                            <Text>
                                {data.studios.edges.map(
                                    (studio) => studio.node.name,
                                )}
                            </Text>
                        </InfoItem>
                        <InfoItem>
                            <Text style={{ fontWeight: "600" }}>Producers</Text>
                            <Text>Not implemented</Text>
                        </InfoItem>
                    </View>
                </View>

                {/* Divider */}
                <View style={{ height: 100 }}></View>
            </ParallaxScrollView>
            <EpisodesDrawer animeId="" title={data.title} />
        </>
    );
}

const InfoItem = ({ children }: PropsWithChildren) => (
    <View style={styles.row}>{children}</View>
);
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 4,
        marginBottom: 4,
    },
});
