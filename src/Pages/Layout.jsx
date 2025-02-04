import { Outlet, useLocation } from "react-router-dom";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

const Layout = () => {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");

    const searchChangeHandler = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        const currentPath = location.pathname.slice(1) || "Home"; 
        setActiveLink(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
    }, [location]);


    return (
        <div className="min-h-screen w-screen flex flex-col">
            <TopHeader />
            <Header activeLink={activeLink} setActiveLink={setActiveLink} onSearchChange={searchChangeHandler} />
            <div className="flex-grow">
            <Outlet context={{ activeLink, setActiveLink, searchTerm }} />
            </div>
            <Footer />
        </div>
    );
}


export default Layout;