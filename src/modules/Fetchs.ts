//Fetch Function's

const API_Key = "70a869d6d1e60688f9bc0481ad7a9971";
const Based_Url = "https://api.themoviedb.org/3";

interface I_MovieData {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface I_getMoviesResult {
    dates?: {
        maximum?: string;
        manimum?: string;
    },
    page?: number;
    results: I_MovieData[];
    total_pages?: number;
    total_results?: number;
};

export async function getMovies(){
    const MoviesData = await(await(
        await fetch(`${Based_Url}/movie/now_playing?api_key=${API_Key}&language=ko&page=1&region=kr`)
    ).json());

    return MoviesData;
};