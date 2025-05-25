import { useQuery } from "@tanstack/react-query";
import { motion, scale } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetails, I_MovieData } from "../modules/Fetchs";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { MovieId_Atoms } from "../atoms";

interface I_MovieDetails {
    movieId?: number;
}

const DetailWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 80em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(20, 20, 20, 0.8);
`;

const Container = styled(motion.div)`
    width: 40em;
    height: 50em;
    border-radius: 15px;
    background-color: ${(props) => props.theme.contentsColor};
    position: fixed;
    top: 15px;
    left: 50;
`;

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
`;

const Box_Headers = styled.div`
    width: 95%;
    display: flex;
    position: relative;
    justify-content: right;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    
    padding: 10px 0px;
    margin-top: 5px;
`;

const Close_btn = styled.button`
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.theme.contentsColor};
    border-radius: 25px;
    //background-color: ${(props) => props.theme.contentsColor};
    background-color: rgb(53, 59, 72);
`;

const Var_Container = {
    initial: {
        scale: 0.9,
        opacity: 0
    },
    start: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "tween",
            bounce: 0,
        }
    },
};

function MovieDetails(){
    const Navigate = useNavigate();
    const {movieId} = useParams();
    
    const {isLoading, data} = useQuery({
        queryKey: ["MovieDetails"],
        queryFn: () => getMovieDetails(movieId)
    });

    const Returnhome = () => {
        Navigate("/");
    };

    useEffect(() => console.log(data), []);

    return (
        <DetailWrapper>
            {
                false ? "데이터를 가져오고 있습니다."
                : (
                    <Container variants={Var_Container} initial="initial" animate="start">
                        <Box>
                            <Box_Headers>
                                <Close_btn onClick={Returnhome}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="7 -14 355 505">
                                        <path fill="#FFFFFF" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                                    </svg>
                                </Close_btn>
                            </Box_Headers>
                        </Box>
                    </Container>
                )
            }
        </DetailWrapper>
    );
};

export default MovieDetails;