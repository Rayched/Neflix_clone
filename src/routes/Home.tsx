import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, I_getMoviesResult } from "../modules/Fetchs";
import { MakeImgPath } from "../modules/utils";
import { motion } from "framer-motion";

interface I_Banner {
    bgPhotoURL: string;
}

const HomeWrappers = styled.div`
    height: 100vh;
    background-color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const Banner = styled.div<I_Banner>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    width: 100vw;
    height: 100vh;
    background-image: ${(props) => `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${props.bgPhotoURL})`};
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 35px;
    margin-bottom: 20px;
    position: absolute;
    top: 500px;
    left: 15px;
`;

const Slider = styled.div``;
const SlideData = styled(motion.div)``;

function Home(){
    const {isLoading, data} = useQuery<I_getMoviesResult>({
        queryKey: ["getMovieData"],
        queryFn: getMovies
    });

    const BgPhotoURL = MakeImgPath(data?.results[0].backdrop_path);

    console.log(BgPhotoURL);

    return (
        <HomeWrappers>
            {
                isLoading ? <Loader>로딩 중...</Loader>
                : (
                <>
                    <Banner bgPhotoURL={BgPhotoURL}>
                        <Title>{data?.results[0].title}</Title>
                    </Banner>
                </>
            )}
        </HomeWrappers>
    );
};

export default Home;