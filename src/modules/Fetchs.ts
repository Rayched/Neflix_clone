//Fetch Function's

import { error } from "console";
import { API_Keys } from "./api_keys";

const api_key = API_Keys;
export const Based_Url = "https://api.themoviedb.org/3";

export interface I_MovieData {
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

interface I_DetailData {
    targetId?: string;
};

interface I_genres {
    id?: number;
    name?: string;
};

export interface I_MovieDetails {
    id?: number;
    title?: string;
    genres?: I_genres[];
    backdrop_path?: string;
    release_date?: string;
    overview?: string;
};

export async function getMovies(){
    const MoviesData = await(await(
        await fetch(`${Based_Url}/movie/now_playing?api_key=${api_key}&language=ko&page=1&region=kr`)
    ).json());

    return MoviesData;
};

export async function getMovieDetails(targetId?: string){
    const getMovieDetailData = fetch(
        `${Based_Url}/movie/${targetId}?api_key=${api_key}&language=ko`
    ).then((resp) => resp.json());

    const getAPIDatas = await getMovieDetailData.then((value) => {
        const Outputs: I_MovieDetails = {
            id: value.id,
            title: value.title,
            genres: [...value.genres],
            backdrop_path: value.backdrop_path,
            release_date: value.release_date,
            overview: value.overview, 
        };
        return Outputs;
    }).catch((error) => error);

    if(getAPIDatas.error){
        return "Error";
    } else {
        return getAPIDatas;
    }
};