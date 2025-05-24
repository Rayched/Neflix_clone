import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Series from "./Series";
import Header from "../components/Header";
import Movies from "./Movies";

function Router(){
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/series" element={<Series />}/>
                <Route path="/movies" element={<Movies />}/>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;