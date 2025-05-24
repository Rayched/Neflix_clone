import styled from "styled-components";

const HomeWrappers = styled.div`
    /*background-color: ${(props) => props.theme.bgColor};*/
    width: 100vw;
    height: 80vh;
`;

function Home(){
    return (
        <HomeWrappers></HomeWrappers>
    );
};

export default Home;