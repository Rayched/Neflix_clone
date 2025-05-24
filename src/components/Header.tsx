import styled from "styled-components";

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.headerColor};
    color: ${(props) => props.theme.textColor};
`;

const Container = styled.div``;

const Logo = styled.svg`
    margin-right: 50px;
`;

const Items = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Item = styled.li`
    margin-left: 20px;
`;

const SearchBtn = styled.button``;
const AlertBtn = styled.button``;
const ProfileBtn = styled.button``;

function Header(){
    return (
        <NavBar>
            <Container>
                <Logo />
                <Items>
                    <Item>홈</Item>
                    <Item>시리즈</Item>
                    <Item>영화</Item>
                </Items>
            </Container>
            <Container>
                <SearchBtn>검색</SearchBtn>
                <AlertBtn>알림</AlertBtn>
                <ProfileBtn>프로필</ProfileBtn>
            </Container>
        </NavBar>
    );
};

export default Header;