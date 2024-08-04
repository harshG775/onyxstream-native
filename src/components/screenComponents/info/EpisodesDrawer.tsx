import { Text, View } from "@/components/ui/Themed";
import BottomSheetDrawer from "@/components/ui/BottomSheetDrawer";
import { fontSize } from "@/constants/styles.constants";
import { BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { useGetInfo } from "@/services/gogoanime/queries.tanstack";
import { toUrlString } from "@/utils/toUrlString";
import { getInfo } from "@/services/gogoanime/api";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Button } from "react-native";

type EpisodesDrawerProps = {
    animeId: string;
    title: {
        romaji: string | null;
        english: string | null;
        userPreferred: string | null;
        native: string | null;
    };
};
export default function EpisodesDrawer(props: EpisodesDrawerProps) {
    const [dubSub, setDubSub] = useState("");
    const { title } = props;
    const { data, status } = useQuery({
        queryKey: [`info-${toUrlString(title.romaji + dubSub)}`],
        queryFn: () => getInfo(toUrlString(title.romaji + dubSub)),
    });
    return (
        <BottomSheetDrawer>
            <View style={{ flex: 1 }} darkColor="#111" lightColor="#eee">
                <BottomSheetView>
                    <View
                        style={{
                            height: 60,
                            display: "flex",
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
                        >
                            Episodes
                        </Text>
                        <View style={{ display: "flex", flexDirection: "row" }}>
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
                <BottomSheetScrollView>
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
                                    >
                                        <Text>Episodes...</Text>
                                    </View>
                                ))}
                        </View>
                    )}
                    {status === "error" && <Text>something went wrong</Text>}
                    {status === "success" && (
                        <View
                            style={{ display: "flex", gap: 4 }}
                            darkColor="#111"
                            lightColor="#eee"
                        >
                            {data.episodes.map((ep) => (
                                <View
                                    key={ep.id}
                                    style={{
                                        padding: 30,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text>Episodes-{ep.number}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </BottomSheetScrollView>
            </View>
        </BottomSheetDrawer>
    );
}
