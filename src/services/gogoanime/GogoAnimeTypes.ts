/* Search Response Type */
export type SearchType = {
    id: string;
    title: string;
    url: string;
    image: string;
    releaseDate: string;
    subOrDub: string;
};

export type SearchResponseType = {
    currentPage: number;
    hasNextPage: boolean;
    results: RecentEpisodesType[];
};

/* recent Episodes Response Type */
export type RecentEpisodesType = {
    id: string;
    episodeId: string;
    episodeNumber: number;
    title: string;
    image: string;
    url: string;
};

export type RecentEpisodesResponseType = {
    currentPage: number;
    hasNextPage: boolean;
    results: RecentEpisodesType[];
};

/* top Airing Response Type*/
export type TopAiringType = {
    id: string;
    title: string;
    image: string;
    url: string;
    genres: string[];
    episodeId: string;
    episodeNumber: number;
};

export type TopAiringResponseType = {
    currentPage: number;
    hasNextPage: boolean;
    results: TopAiringType[];
};

/* anime Details Response Type*/
export type EpisodesInfoType = {
    id: string;
    number: number;
    url: string;
};

export type AnimeInfoResponseType = {
    id: string;
    title: string;
    url: string;
    genres: string[];
    totalEpisodes: number;
    image: string;
    releaseDate: string;
    description: string;
    subOrDub: string;
    type: string;
    status: string;
    otherName: string;
    episodes: EpisodesInfoType[];
};

/* Streaming Links Response Type*/
export type StreamingLinksResponseType = {
    header: {
        Referer: string;
    };
    sources: {
        url: string;
        isM3U8: boolean;
        quality: string;
    }[];
    download: string;
};

/* Available Servers Response Type*/
export type serverType = {
    name: string;
    url: string;
};
export type AvailableServersResponseType = serverType[];
