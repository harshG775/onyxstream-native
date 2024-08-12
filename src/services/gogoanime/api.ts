import { env } from "@/constants/env";
import {
    SearchResponseType,
    StreamingLinksResponseType,
    AvailableServersResponseType,
    RecentEpisodesResponseType,
    TopAiringResponseType,
    AnimeInfoResponseType,
} from "./GogoAnimeTypes";
import axios from "axios";

const { EXPO_PUBLIC_CMT_BASEURL } = env;
export const CMT = axios.create({
    baseURL: `${EXPO_PUBLIC_CMT_BASEURL}/anime/gogoanime`,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getSearchResult(query: string, number = 1) {
    const { data } = await CMT.get<SearchResponseType>(
        `/${query}?page=${number}`,
    );
    return data;
}

export async function getRecentEpisodes() {
    const { data } =
        await CMT.get<RecentEpisodesResponseType>(`/recent-episodes`);
    return data;
}
export async function getTopAiring(page: number) {
    const { data } = await CMT.get<TopAiringResponseType>(
        `/top-airing?page=${page}`,
    );
    return data;
}

export async function getInfo(id: string) {
    const { data } = await CMT.get<AnimeInfoResponseType>(`/info/${id}`);
    return data;
}

export async function getStreamingLinks(
    episodeId: string,
    serverName: "gogocdn" | "streamsb" | "vidstreaming",
) {
    const { data } = await CMT.get<StreamingLinksResponseType>(
        `/watch/${episodeId}?server=${serverName}`,
    );
    return data;
}
export async function getAvailableServers(episodeId: string) {
    const { data } = await CMT.get<AvailableServersResponseType>(
        `/servers/${episodeId}`,
    );
    return data;
}
