import styled from "styled-components";
import {animate, delay, easeIn, motion, scale} from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBtn from "../modules/SearchBtn";

interface I_ItemList {
    Id: string;
    Name: string;
};

interface I_SearchBar {
    isSearch: boolean;
};

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    background-color: ${(props) => props.theme.headerColor};
    color: ${(props) => props.theme.textColor};
    width: 100%;
    top: 0%;
    height: 70px;
    font-size: 14px;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled(motion.svg)`
    margin: 0px 50px;
    width: 95px;
    height: 25px;
    fill: ${(props) => props.theme.logoColor};
    path {
        stroke: white;
        stroke-width: 6px;
    };
`;

const Items = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Item = styled(motion.li)`
    margin-left: 20px;
    font-weight: ${(props) => props.id === props.value ? "bold" : "none"};
`;

const SearchBar = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.textColor};
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    padding: 2px;
    padding-left: 3px;
    position: absolute;
    right: 100px;
    transform-origin: right center;
`;

const SearchInput = styled(motion.input)`
    display: block;
    background-color: inherit;
    border: 0px;
    color: ${(props) => props.theme.textColor};
    &:focus {
        outline: none;
    };
`;

const AlertBtn = styled.button``;
const ProfileBtn = styled.button``;

const SearchVariants = {
    start: {
        scaleX: 0,
        x: 5
    },
    end: {
        scaleX: 1,
        x: 0,
    },
};
function Header(){
    const [Search, setSearch] = useState(false);

    const [NowItem, setItem] = useState("");
    const ItemList: I_ItemList[] = [
        {Id: "", Name: "홈"},
        {Id: "series", Name: "시리즈"},
        {Id: "movies", Name: "영화"}
    ];

    const Switched = (targets: string) => {
        setItem(targets);
    };

    return (
        <NavBar>
            <Container>
                    <Link to={"/"}>
                    <Logo 
                        width="1024" 
                        height="276.742" 
                        viewBox="0 0 1024 276.742"
                    >
                        <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />   
                    </Logo>
                    </Link>
                <Items>
                    {
                        ItemList.map((data) => {
                            return (
                                <Item 
                                    id={data.Id}
                                    value={NowItem}
                                    onClick={() => Switched(data.Id)}
                                >
                                    <Link to={`${data.Id}`}>{data.Name}</Link>
                                </Item>
                            );
                        })
                    }
                </Items>
            </Container>
            <Container>
                {
                    Search ? (
                        <SearchBar variants={SearchVariants} initial="start" animate="end" transition={{type: "linear"}}>
                            <SearchBtn isSearch={Search} setSearch={setSearch}/>
                            <SearchInput type="text" placeholder="제목, 사람, 장르"/>
                        </SearchBar>
                    ) : <SearchBtn isSearch={Search} setSearch={setSearch}/>
                }
                <AlertBtn>알림</AlertBtn>
                <ProfileBtn>프로필</ProfileBtn>
            </Container>
        </NavBar>
    );
};

export default Header;