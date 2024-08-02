import { Text, View } from "@/components/ui/Themed";
import { useGetInfo } from "@/services/gogoanime/queries.tanstack";
import { useLocalSearchParams } from "expo-router";
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
        return (
            <View>
                <Image source={{ uri: data.image }} style={{width:"100%",height:200}}/>
                <Text style={{ fontWeight: "800", fontSize: 24 }}>
                    {data.title}
                </Text>
                <Text style={{height:100}}>{data.description}</Text>
            </View>
        );
    }
}
