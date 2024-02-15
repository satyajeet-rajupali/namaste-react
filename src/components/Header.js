import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {

    const [btnName, setBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();

    return (
        <div className="header">
            <div className="logo-container">
                <img src={LOGO_URL} alt="Logo" className="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        Online Status - {onlineStatus ? "✅" : "❌"}
                    </li>
                    <li>
                        <Link className="router-link" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="router-link" to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link className="router-link" to="/contact">Contact Us</Link>
                    </li>
                    <li>
                        <Link className="router-link" to="/grocery">Grocery</Link>
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