export type InfoMedia = {
    id: number;
    idMal: number;
    title: {
        romaji: string;
        english: string | null;
        native: string;
        userPreferred: string;
    };
    description: string | null;
    bannerImage: string | null;
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string | null;
    };
    type: "ANIME" | "MANGA"; // or other types supported by the API
    countryOfOrigin: string;
    season: "WINTER" | "SPRING" | "SUMMER" | "FALL" | null;
    genres: string[];
    startDate: {
        year: number | null;
        month: number | null;
        day: number | null;
    };
    endDate: {
        year: number | null;
        month: number | null;
        day: number | null;
    };
    status: string;
    duration: number | null;
    averageScore: number | null;
    episodes: number | null;
    studios: {
        edges: {
            node: {
                name: string;
            };
        }[];
    };
    nextAiringEpisode: {
        id: number;
        airingAt: number;
        timeUntilAiring: number;
        episode: number;
        mediaId: number;
    } | null;
};

export type TrendingReleasingMedia = {
    id: number;
    episodes: number | null;
    coverImage: {
        large: string | null;
        color: string | null;
    };
    averageScore: number | null;
    popularity: number | null;
    title: {
        romaji: string | null;
        english: string | null;
        userPreferred: string | null;
        native: string | null;
    };
    format: string | null;
    genres: string[];
};
export type TrendingReleasingPage = {
    media: TrendingReleasingMedia[];
    pageInfo: {
        total: number;
        perPage: number;
        currentPage: number;
        lastPage: number;
        hasNextPage: boolean;
    };
};
