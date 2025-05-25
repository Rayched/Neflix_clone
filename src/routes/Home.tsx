import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, I_getMoviesResult } from "../modules/Fetchs";
import { MakeImgPath } from "../modules/utils";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useEffect, useState } from "react";
import useWindowDimensions from "../components/Dimensions";

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

const SliderBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;

    .Slider_Title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 15px;
        margin-left: 5px;
    }
`;

const Slider = styled(motion.div)`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    position: absolute;
    top: 40px;
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
`;

const SliderVariants = {
    initial: {
        x: window.innerWidth,
        transition: {
            bounce: 0
        }
    },
    animate: {
        x: 0,
        transition: {
            bounce: 0,
            duration: 1
        }
    },
    exit: {
       x: -window.innerWidth,
       transition: {
            bounce: 0,
            duration: 0.5
       }
    },
    transition: {
        type: "linear",
        bounce: 0
    }
};

function Home(){
    const {isLoading, data} = useQuery<I_getMoviesResult>({
        queryKey: ["getMovieData"],
        queryFn: getMovies
    });

    const offset = 6;
    const Width = useWindowDimensions();

    const [Index, setIndex] = useState(0);

    const IncreaseIdx = () => {
        const TotalMovies = Number(data?.results.length) - 1;
        const MaxIdx = Math.floor(TotalMovies / offset);
        console.log(MaxIdx);

        if(Index < MaxIdx){
            setIndex((prev) => prev + 1);
        } else {
            setIndex(0);
        }
    };

    useEffect(() => console.log(data));

    return (
        <HomeWrappers>
            {
                isLoading ? <Loader>로딩 중...</Loader>
                : (
                <>
                    <Banner bgPhotoURL={MakeImgPath(data?.results[0].backdrop_path)} onClick={IncreaseIdx}>
                        <Title>{data?.results[0].title}</Title>
                    </Banner>
                    <SliderBox>
                        <div className="Slider_Title">Movies</div>
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
                                            <ContentItem key={data.id} bgPhotoURL={MakeImgPath(data.backdrop_path, "w200")}>
                                                {data.title}
                                            </ContentItem>
                                        );
                                    })
                                }
                            </Slider>
                        </AnimatePresence>
                    </SliderBox>
                </>
            )}
        </HomeWrappers>
    );
};

export default Home;