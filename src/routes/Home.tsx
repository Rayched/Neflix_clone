import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, I_getMoviesResult } from "../modules/Fetchs";
import { MakeImgPath } from "../modules/utils";
import { motion, AnimatePresence, delay, hover } from "framer-motion";
import { useEffect, useState } from "react";
import useWindowDimensions from "../components/Dimensions";
import { useMatch, useNavigate } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import { useSetRecoilState } from "recoil";
import { MovieId_Atoms } from "../atoms";

interface I_Banner {
    bgPhotoURL: string;
};

const HomeWrappers = styled.div`
    width: 100vw;
    background: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
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
    position: absolute;
    left: 5%;
    top: 70%;
`;

const Slider_Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
    margin-top: 20px;
`;

const SliderBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 50px;
`;

const Slider = styled(motion.div)`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(6, 1fr);
    width: 90%;
    position: absolute;
    top: 20px;
    align-items: center;
`;

const ContentItem = styled(motion.div)<I_Banner>`
    color: ${(props) => props.theme.textColor};
    background-image: ${(props) => `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${props.bgPhotoURL})`};
    background-size: cover;
    border: 1px solid black;
    width: 240px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: right;
    position: relative;
    &:first-child {
        transform-origin: center left;
    };
    &:last-child {
        transform-origin: center right;
    };
`;

const ContentInfo = styled(motion.div)`
    position: absolute;
    bottom: 0;
    width: 200px;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.contentsColor};
    opacity: 0;
    align-items: center;
    text-align: center;

    .h4 {
        font-size: 13px;
    }
`;

const DetailWrapper = styled(motion.div)`
    position: fixed;
    width: 100vw;
    height: 80em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(20, 20, 20, 0.8);
`;

const Var_ContentsItem = {
    initial: {
        scale: 1,
        transition: {
            type: "tween",
            bounce: 0
        }
    },
    hover: {
        scale: 1.2,
        y: -40,
        zIndex: 99,
        transition: {
            delay: 0.2,
            duration: 0.2,
            type: "tween",
            bounce: 0
        }
    }
};

const Var_ContentInfo = {
    hover: {
        opacity: 1
    }
}

function Home(){
    const {isLoading, data} = useQuery<I_getMoviesResult>({
        queryKey: ["getMovieData"],
        queryFn: getMovies
    });

    const offset = 6;
    const Width = useWindowDimensions();

    const navigate = useNavigate();
    const MovieMatch = useMatch("/movies/:movieId");

    const [Index, setIndex] = useState(0);

    const setMovieIds = useSetRecoilState(MovieId_Atoms);

    //Slider 전환 (Page 변환)
    const IncreaseIdx = () => {
        const TotalMovies = Number(data?.results.length) - 1;
        const MaxIdx = Math.floor(TotalMovies / offset);

        if(Index < MaxIdx){
            setIndex((prev) => prev + 1);
        } else {
            setIndex(0);
        }
    };

    //ContentItem 클릭 시, 해당 콘텐츠의 id를 전송하는 func
    const onContentItemClicked = async (targetId?: number) => {
        if(targetId !== undefined){
            await setMovieIds(targetId);
        } else {
            return;
        }
        navigate(`/movies/${targetId}`);
    };

    const OverlayClicked = () => {
        navigate(`/`);
    };

    return (
        <HomeWrappers>
            {
                isLoading ? <Loader>로딩 중...</Loader>
                : (
                <>
                    <Banner bgPhotoURL={MakeImgPath(data?.results[0].backdrop_path)} onClick={IncreaseIdx}>
                        <Title>{data?.results[0].title}</Title>
                    </Banner>
                    <Slider_Title>Movies</Slider_Title>
                    <SliderBox>
                        <AnimatePresence initial={false}>
                            <Slider 
                                key={Index} 
                                initial={{x: Width + 10}}
                                animate={{x: 0}}
                                exit={{x: -Width - 10}}
                                transition={{type: "linear", bounce: 0, duration: 0.5}}
                            >
                                {
                                    data?.results.slice(1).slice(Index * offset, offset * Index + offset).map((data, idx) => {
                                        return (
                                            <ContentItem 
                                                key={data.id} 
                                                layoutId={String(data.id)}
                                                bgPhotoURL={MakeImgPath(data.backdrop_path, "w200")}
                                                variants={Var_ContentsItem}
                                                initial="initial"
                                                whileHover="hover"
                                                onClick={() => onContentItemClicked(data.id)}
                                            >
                                                <ContentInfo variants={Var_ContentInfo}>
                                                    <h4>{data.title}</h4>
                                                </ContentInfo>
                                                {data.title}
                                            </ContentItem>
                                        );
                                    })
                                }
                            </Slider>
                        </AnimatePresence>
                    </SliderBox>
                    <AnimatePresence>
                        {
                            MovieMatch === null ? null 
                            : (
                            <DetailWrapper onClick={OverlayClicked} exit={{opacity: 0}}>
                                <MovieDetails layoutId={MovieMatch.params.movieId} />
                            </DetailWrapper>
                            )
                        }
                    </AnimatePresence>
                </>
            )}
        </HomeWrappers>
    );
};

export default Home;