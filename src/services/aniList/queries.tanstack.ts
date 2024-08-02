import { useQuery } from "@tanstack/react-query";
import { getInfoById, TrendingReleasing } from "./api";
import { InfoMedia, TrendingReleasingPage } from "./aniListTypes";

export const useGetInfo = (id: string) => {
    return useQuery<InfoMedia>({
        queryKey: [`info-${id}`],
        queryFn: () => getInfoById(id),
    });
};
export const useGetTrendingReleasing = (page = 1, perPage = 20) => {
    return useQuery<TrendingReleasingPage>({
        queryKey: ["Trending-Releasing", page],
        queryFn: () => TrendingReleasing(page, perPage),
    });
};
