import styled from "styled-components";

const MovieWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
`;

function Movies(){
    return (
        <MovieWrapper>Movies</MovieWrapper>
    );
};

export default Movies;