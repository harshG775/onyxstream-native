import { env } from "@/constants/env";
import axios from "axios";
import { InfoMedia } from "./aniListTypes";

const { EXPO_PUBLIC_AL_BASEURL_QL } = env;
export const axiosAL = axios.create({
    baseURL: EXPO_PUBLIC_AL_BASEURL_QL,
    headers: {
        "Content-Type": "application/json",
    },
});
export const ALClient = (query: string) => {
    return axiosAL.post("", {
        query: query,
    });
};

export async function getInfoById(id: string): Promise<InfoMedia> {
    const data = await ALClient(`
        query Media {
            Media(id: ${id}, type: ANIME) {
                id
                idMal
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                description
                bannerImage
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                type
                countryOfOrigin
                season
                genres
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                status
                duration
                averageScore
                episodes
                studios(isMain: true) {
                    edges {
                        node {
                            name
                        }
                    }
                }
                nextAiringEpisode {
                    id
                    airingAt
                    timeUntilAiring
                    episode
                    mediaId
                }
            }
        }
    `);
    return data.data.data.Media;
}
