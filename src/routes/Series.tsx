import styled from "styled-components";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.bgColor};
`;

function Series(){
    return (
        <Wrapper>시리즈</Wrapper>
    );
};

export default Series;