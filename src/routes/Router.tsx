import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Series from "./Series";
import Header from "../components/Header";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/series" element={<Series />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;