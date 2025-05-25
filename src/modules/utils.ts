
export function MakeImgPath(Id?: string, Format?: string){
    const Img_based_url = "https://image.tmdb.org/t/p";
    return `${Img_based_url}/${Format ? Format : "original"}/${Id}`;
};