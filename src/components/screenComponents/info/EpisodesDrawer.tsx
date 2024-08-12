import { Text, View } from "@/components/ui/Themed";
import BottomSheetDrawer from "@/components/ui/BottomSheetDrawer";
import { fontSize } from "@/constants/styles.constants";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useGetInfo } from "@/services/gogoanime/queries.tanstack";
import { toUrlString } from "@/utils/toUrlString";
import { getInfo, getSearchResult } from "@/services/gogoanime/api";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";
import { Button, Pressable } from "react-native";
import VideoPlayer from "./VideoPlayer";
import { AnimeInfoResponseType } from "@/services/gogoanime/GogoAnimeTypes";

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
    const [currentEpisode, setCurrentEpisode] = useState("");
    const [dubSub, setDubSub] = useState("");
    //
    useEffect(() => {
        const fetchMe = async () => {
            try {
                setStatus("pending");
                setError(null);

                let result;
                try {
                    result = await getInfo(toUrlString(title.romaji + ""));
                } catch (error) {
                    const resp = await getSearchResult(
                        toUrlString(title.english + ""),
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
    }, [title.romaji]);

    return (
        <BottomSheetDrawer>
            <BottomSheetView style={{ height: 200, width: "100%" }}>
                {currentEpisode ? (
                    <VideoPlayer epId={currentEpisode} />
                ) : (
                    <View
                        style={{ backgroundColor: "#333", height: 200 }}
                    ></View>
                )}
            </BottomSheetView>
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
                        Episodes:{currentEpisode}
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
                                        ep.id === currentEpisode
                                            ? "#444"
                                            : "#222",
                                    padding: 30,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                onPress={() => setCurrentEpisode(ep.id)}
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
