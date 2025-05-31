import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetails, I_MovieDetails } from "../modules/Fetchs";
import { useEffect } from "react";
import { MakeImgPath } from "../modules/utils";

interface I_MovieDetailsProps {
    layoutId?: string
}

interface I_BoxHeaders {
    backgroundImgs?: string;
}

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

const Box_Headers = styled.div<I_BoxHeaders>`
    width: 40em;
    height: 18em;
    display: flex;
    position: relative;
    justify-content: right;
    align-items: center;
    background-image: ${
        (props) => `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${props.backgroundImgs})`
    };
    background-position: center center;
    background-size: cover;
    padding: 10px 0px;
    margin-top: 5px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
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
    position: absolute;
    top: 10px;
    right: 10px;
`;

const Box_Bodys = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 15px;
`;

const Movie_Title = styled.div``;

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
    end: {
        
    }
};

function MovieDetails({layoutId}: I_MovieDetailsProps){
    const Navigate = useNavigate();

    const {isLoading, data: DetailData} = useQuery<I_MovieDetails>({
        queryKey: ["MovieDetailDatas"],
        queryFn: () => getMovieDetails(layoutId)
    });

    const Returnhome = () => {
        Navigate("/");
    };

    useEffect(() => {
        console.log(DetailData);
    });

    return (
        <Container variants={Var_Container} initial="initial" animate="start" layoutId={layoutId}>
            {
                isLoading ? "Loading..." : (
                    <Box>
                        <Box_Headers backgroundImgs={MakeImgPath(DetailData?.backdrop_path)}>
                            <Close_btn onClick={Returnhome}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="7 -14 355 505">
                                <path fill="#FFFFFF" d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                            </svg>
                            </Close_btn>
                        </Box_Headers>
                        <Box_Bodys>
                            <div>{DetailData?.title}</div>
                            <div>
                                장르: {DetailData?.genres?.map((data) => <span key={data.id}>{data.name}, </span>)}
                            </div>
                        </Box_Bodys>
                    </Box>
                )
            }
        </Container>
    );
};

export default MovieDetails;