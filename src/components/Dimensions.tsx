//슬라이드 겹침 현상 제거

import { useEffect, useState } from "react";

const getWindowDemensions = () => {
    const {innerWidth: width} = window;
    return width;
};

function useWindowDimensions(){
    const [Demensions, setDemensions] = useState(getWindowDemensions());
    useEffect(() => {
        function handleResize(){
            setDemensions(getWindowDemensions());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return Demensions;
};

export default useWindowDimensions;