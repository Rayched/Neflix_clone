import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSearchData, I_MovieData } from "../modules/Fetchs";
import styled from "styled-components";

const SearchWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${(props) => props.theme.bgColor};
    overflow-x: hidden;
`;

function SearchPage(){
    //const {state: {Keyword}} = useLocation();
    //다른 해결법 (Keyword 가져오는 거)
    const locations = useLocation();
    const keywords = new URLSearchParams(locations.search).get("keyword");
    const Regions = "ko";

    const {isLoading, data} = useQuery<I_MovieData[]>({
        queryKey: ["SearchOutputs"],
        queryFn: () => getSearchData({keyword: String(keywords), region: Regions})
    });

    useEffect(() => console.log(data), [isLoading]);

    return (
        <SearchWrapper>
            {
                isLoading ? "검색 결과 가져오는 중..." : (
                    <ul>
                        {
                            data?.map((outputs) => {
                                return <li key={outputs.id}>{outputs.title}</li>
                            })
                        }
                    </ul>
                )
            }
        </SearchWrapper>
    );
};

export default SearchPage;