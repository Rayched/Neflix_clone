import styled from "styled-components";
import { motion, useAnimation, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBtn from "./SearchBtn";
import { useForm } from "react-hook-form";

interface I_ItemList {
    Id: string;
    Name: string;
};

interface I_SearchForm {
    Keyword?: string;
};

const NavBar = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    color: ${(props) => props.theme.textColor};
    width: 100vw;
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
    color: ${(props) => props.theme.textColor};
    &:hover {
        color: ${(props) => props.id !== props.value ? "#dbdbdb" : "#ffffff"};
    };
`;

const SearchBar = styled(motion.form)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.textColor};
    padding: 2px;
    padding-left: 3px;
    position: absolute;
    right: 155px;
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

const AlertBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: inherit;
    border: 0px;
    margin: 0px 15px;
`;
const ProfileBtn = styled.div`
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(48, 51, 107);
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 4px;
    font-size: 27px;
    margin-right: 25px;
`;

const ItemVariants = {
    Selected: {
        fontWeight: 600,
        transition: {
            delay: 1,
            duration: 1
        }
    },
    NonSelected: {
        fontWeight: "normal"
    },
    transition: {
        type: "linear",
    }
};

const SearchVariants = {
    start: {
        scaleX: 0,
        x: 10
    },
    end: {
        scaleX: 1,
        x: 0,
    },
};

const NavBarVariants = {
    Default: {
        background: "rgba(20, 20, 20, 0)"
    },
    Scrolls: {
        background: "rgba(20, 20, 20, 1)"
    }
};

function Header(){
    const [Search, setSearch] = useState(false);
    const {scrollY} = useScroll();

    const {register, handleSubmit, setValue} = useForm();

    const NavAnimation = useAnimation();

    const navigate = useNavigate();

    const [NowItem, setItem] = useState("");
    const ItemList: I_ItemList[] = [
        {Id: "", Name: "홈"},
        {Id: "series", Name: "시리즈"},
        {Id: "movies", Name: "영화"}
    ];

    const KeywordReset = () => {
        if(Search){
            setValue("Keyword", "");
            setSearch(false);
        } else {
            return;
        }
    }

    const Switched = (targets: string) => {
        setItem(targets);
        KeywordReset();
    };

    const KeywordSearch = ({Keyword}: I_SearchForm) => {
        if(Keyword !== ""){
            
            /*
                * navigate(`/search?keyword=${Keyword}`, {state: {Keyword}});
                * ↑ 강의 댓글 창에서 발견한 다른 해결법 
                * (<SearchPage />에서 Keyword 값을 가져오기 위한 방법)
                * 
                * in <SearchPage />
                * const {state: {Keyword}} = useLocation();
                * 식으로 작성해서 state 가져옴
            */
           navigate(`/search?keyword=${Keyword}`);
        } else {
            return;
        }
    }

    useMotionValueEvent(scrollY, "change", (latest) => {
        if(latest < 10){
            NavAnimation.start("Default");
        } else {
            NavAnimation.start("Scrolls")
        }
    });

    return (
        <NavBar variants={NavBarVariants} animate={NavAnimation}>
            <Container>
                    <Link to={"/"}>
                        <Logo 
                            width="1024" 
                            height="276.742" 
                            viewBox="0 0 1024 276.742"
                            onClick={KeywordReset}
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
                                    variants={ItemVariants}
                                    initial="NonSelected"
                                    animate={data.Id === NowItem ? "Selected" : "NonSelected"}
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
                        <SearchBar variants={SearchVariants} initial="start" animate="end" transition={{type: "linear"}} onSubmit={handleSubmit(KeywordSearch)}>
                            <SearchBtn setSearch={setSearch}/>
                            <SearchInput 
                                type="text" 
                                placeholder="제목, 사람, 장르"
                                autoComplete="off"
                                {...register("Keyword", {required: true})}
                            />
                        </SearchBar>
                    ) : <SearchBtn setSearch={setSearch}/>
                }
                <AlertBtn>
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="36" viewBox="0 0 448 512">
                        <path fill="#ffffff" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416l400 0c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4l0-25.4c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112l0 25.4c0 47.9 13.9 94.6 39.7 134.6L72.3 368C98.1 328 112 281.3 112 233.4l0-25.4c0-61.9 50.1-112 112-112zm64 352l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/>
                    </svg>
                </AlertBtn>
                <ProfileBtn>🙍‍♂️</ProfileBtn>
            </Container>
        </NavBar>
    );
};

export default Header;