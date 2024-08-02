import { useQuery } from "@tanstack/react-query";
import { getInfoById } from "./api";
import { InfoMedia } from "./aniListTypes";

export const useGetInfo = (id: string) => {
    return useQuery<InfoMedia>({
        queryKey: [`info-${id}`],
        queryFn: () => getInfoById(id),
    });
};
