import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMovies, I_getMoviesResult } from "../modules/Fetchs";
import { MakeImgPath } from "../modules/utils";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useState } from "react";

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
    align-items: center;
`;

const Slider = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    width: 100%;
    position: absolute;
    top: 50px;
`;

const ContentItem = styled(motion.div)`
    color: black;
    background-color: white;
    border: 1px solid black;
    width: 15em;
    height: 10em;
`;

const SliderVariants = {
    initial: {
        x: 1000,
        transition: {
            bounce: 0
        }
    },
    animate: {
        x: -750,
        transition: {
            bounce: 0,
            delay: 1,
            duration: 1
        }
    },
    exit: {
       x: -2000,
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

    const [Index, setIndex] = useState(0);

    const IncreaseIdx = () => setIndex((prev) => prev + 1);

    const BgPhotoURL = MakeImgPath(data?.results[0].backdrop_path);

    return (
        <HomeWrappers>
            {
                isLoading ? <Loader>로딩 중...</Loader>
                : (
                <>
                    <Banner bgPhotoURL={BgPhotoURL} onClick={IncreaseIdx}>
                        <Title>{data?.results[0].title}</Title>
                    </Banner>
                    <SliderBox>
                        <AnimatePresence initial={false}>
                            <Slider 
                                variants={SliderVariants} 
                                key={Index} 
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {
                                    [1, 2, 3, 4, 5, 6].map((num) => {
                                        return <ContentItem key={num}>{num}</ContentItem>
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