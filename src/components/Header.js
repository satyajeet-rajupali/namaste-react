import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {

    const [btnName, setBtnName] = useState("Login");

    return (
        <div className="header">
            <div className="logo-container">
                <img src={LOGO_URL} alt="Logo" className="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link className="router-link" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="router-link" to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link className="router-link" to="/contact">Contact Us</Link>
                    </li>
                    <li>Cart</li>
                    <button className="login"
                        onClick={
                            () => {
                                btnName === "Login" ?
                                    setBtnName("Logout") : setBtnName("Login");
                            }
                        }
                    >{btnName}</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;