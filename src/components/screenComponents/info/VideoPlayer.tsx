import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View, Dimensions, Linking } from "react-native";
import { Video, ResizeMode } from "expo-av";
// import * as ScreenOrientation from "expo-screen-orientation";
import {
    getOrientationAsync,
    Orientation,
    lockAsync,
    OrientationLock,
} from "expo-screen-orientation";
import { useGetAvailableServers } from "@/services/gogoanime/queries.tanstack";
import { Text } from "@/components/ui/Themed";

const episodeUri =
    "https://www040.vipanicdn.net/streamhls/1128ea2a088a912349d9d572bbf45d0e/ep.1.1720203485.720.m3u8";
export default function VideoPlayer({ epId }: { epId: string }) {
    const { data, status } = useGetAvailableServers(epId);
    const video = useRef(null);
    console.log(data?.sources[2].url);
    return (
        <View style={styles.container}>
            {status === "pending" && <Text>Loading Video...</Text>}
            {status === "error" && <Text>error Video</Text>}
            {status === "success" && (
                <Video
                    ref={video}
                    style={styles.video}
                    source={{ uri: data?.sources[2].url }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isMuted={false}
                    shouldPlay
                    volume={1.0}
                    rate={1.0}
                    onError={(error) => console.log('Video Error:', error)}
                    onFullscreenUpdate={() => {
                        async function toggleOrientation() {
                            const currentOrientation =
                                await getOrientationAsync();
                            if (
                                currentOrientation ===
                                Orientation.LANDSCAPE_RIGHT
                            ) {
                                await lockAsync(OrientationLock.PORTRAIT_UP);
                            } else {
                                await lockAsync(
                                    OrientationLock.LANDSCAPE_RIGHT,
                                );
                            }
                        }
                        toggleOrientation();
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    video: {
        width: "100%",
        height: 200, // Adjust height as needed
    },
});

function Url() {
    const openVideoInExternalPlayer = async () => {
        const url = `vlc://${episodeUri}`; // VLC scheme for example
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error("Failed to open video in external player", error);
        }
    };

    return (
        <View>
            <Button title="VLC" onPress={openVideoInExternalPlayer} />
        </View>
    );
}
