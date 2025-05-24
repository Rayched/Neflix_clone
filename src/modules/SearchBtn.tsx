import styled from "styled-components"

interface I_SearchBtn {
    isSearch: boolean;
    setSearch: Function;
};

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
`;

function SearchBtn({isSearch, setSearch}: I_SearchBtn){
    const BtnClicked = () => setSearch((prev: boolean) => !prev);

    return (
        <Box onClick={BtnClicked}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="31" viewBox="0 -100 700 700">
                <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
        </Box>
    );
};

export default SearchBtn;