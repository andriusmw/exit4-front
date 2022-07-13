
import { Auth } from "./Auth";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
    

    return (
        <header>
            <h1 > <Link to="/"  className="titleclass" >EXIT2</Link> </h1>
            <h3>Your app to make your city more accessible</h3>
            <nav>
                <Auth />
            </nav>
        </header>
    );
};


