import { useQuery } from "@tanstack/react-query";
import {
    getAvailableServers,
    getInfo,
    getRecentEpisodes,
    getSearchResult,
    getStreamingLinks,
    getTopAiring,
} from "./api";

export const useSearch = (debounce: string, query: string, page: number) => {
    return useQuery({
        queryKey: ["query", debounce, page],
        queryFn: () => getSearchResult(query, page),
    });
};
export const useGetRecentEpisodes = () => {
    return useQuery({
        queryKey: ["recentEpisodes"],
        queryFn: getRecentEpisodes,
    });
};
export const useGetTopAiring = (page: number) => {
    return useQuery({
        queryKey: ["topAiring", page],
        queryFn: () => getTopAiring(page),
    });
};

export const useGetInfo = (id: string) => {
    return useQuery({
        queryKey: [`info-${id}`],
        queryFn: () => getInfo(id),
    });
};

export const useGetAvailableServers = (episodeId: string) => {
    return useQuery({
        queryKey: [`availableServers-${episodeId}`],
        queryFn: () => getStreamingLinks(episodeId,"gogocdn"),
    });
};
export const useGetGetStreamingLinks = (episodeId: string) => {
    return useQuery({
        queryKey: [`availableServers-${episodeId}`],
        queryFn: () => getAvailableServers(episodeId),
    });
};
