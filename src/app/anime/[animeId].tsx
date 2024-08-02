import { Text, View } from "@/components/ui/Themed";
import { InfoMedia } from "@/services/aniList/aniListTypes";
import { useGetInfo } from "@/services/aniList/queries.tanstack";
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
        <View>
            <Image
                source={{ uri: data.bannerImage || "" }}
                style={{ width: "100%", height: 100 }}
            />
            <Text style={{ fontWeight: "800", fontSize: 24 }}>
                {data.title.userPreferred}
            </Text>
            <Text>{data.description}</Text>
        </View>
    );
}
