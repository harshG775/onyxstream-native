import { Text, View } from "@/components/ui/Themed";
import BottomSheetDrawer from "@/components/ui/BottomSheetDrawer";
import { fontSize } from "@/constants/styles.constants";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { toUrlString } from "@/utils/toUrlString";
import { getInfo, getSearchResult } from "@/services/gogoanime/api";
import { useEffect, useState } from "react";
import { Button, Pressable } from "react-native";
import VideoPlayer from "./VideoPlayer";
import {
    AnimeInfoResponseType,
    EpisodesInfoType,
} from "@/services/gogoanime/GogoAnimeTypes";

type EpisodesDrawerProps = {
    animeId: string;
    title: {
        romaji: string | null;
        english: string | null;
        userPreferred: string | null;
        native: string | null;
    };
};

type Status = "idle" | "pending" | "error" | "success";
export default function EpisodesDrawer({ title }: EpisodesDrawerProps) {
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<unknown>();
    const [data, setAnime] = useState<AnimeInfoResponseType>();
    //
    const [currentEpisode, setCurrentEpisode] =
        useState<EpisodesInfoType | null>(null);
    const [dubSub, setDubSub] = useState("");
    //
    useEffect(() => {
        const fetchMe = async () => {
            try {
                setStatus("pending");
                setError(null);

                let result;
                try {
                    result = await getInfo(toUrlString(title.romaji + dubSub));
                } catch (error) {
                    const resp = await getSearchResult(
                        toUrlString(title.english + dubSub),
                    );
                    result = await getInfo(
                        toUrlString(resp.results[0].id + ""),
                    );
                }

                setAnime(result);
                setStatus("success");
            } catch (error) {
                setStatus("error");
                setError(error);
            }
        };
        fetchMe();
    }, [title.romaji, dubSub]);

    return (
        <BottomSheetDrawer>
            {currentEpisode && (
                <BottomSheetView style={{ height: 200, width: "100%" }}>
                    <VideoPlayer epId={currentEpisode.id} />
                </BottomSheetView>
            )}
            <BottomSheetView style={{ height: 50, width: "100%" }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    darkColor="#111"
                    lightColor="#eee"
                >
                    <Text
                        style={{
                            ...fontSize._Xl,
                        }}
                        numberOfLines={1}
                    >
                        Episodes:{currentEpisode?.number}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <Button
                            title="sub"
                            onPress={() => setDubSub("")}
                            color={dubSub === "" ? "" : "#111"}
                        />
                        <Button
                            title="dub"
                            onPress={() => setDubSub("-dub")}
                            color={dubSub === "-dub" ? "" : "#111"}
                        />
                    </View>
                </View>
            </BottomSheetView>
            <BottomSheetScrollView style={{ flex: 1 }}>
                {status === "pending" && (
                    <View
                        style={{ display: "flex", gap: 4 }}
                        darkColor="#111"
                        lightColor="#eee"
                    >
                        {Array(6)
                            .fill("")
                            .map((_, i) => (
                                <View
                                    key={i}
                                    style={{
                                        padding: 30,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                ></View>
                            ))}
                    </View>
                )}
                {status === "error" && <Text>something went wrong</Text>}
                {status === "success" && data && (
                    <View
                        style={{ display: "flex", gap: 4 }}
                        darkColor="#111"
                        lightColor="#eee"
                    >
                        {data.episodes.map((ep) => (
                            <Pressable
                                key={ep.id}
                                style={{
                                    backgroundColor:
                                        ep.id === `${currentEpisode?.id}`
                                            ? "#444"
                                            : "#222",
                                    padding: 30,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onPress={() => setCurrentEpisode(ep)}
                            >
                                <Text>Episodes-{ep.number}</Text>
                            </Pressable>
                        ))}
                    </View>
                )}
            </BottomSheetScrollView>
        </BottomSheetDrawer>
    );
}
