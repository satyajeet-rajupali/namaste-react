import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {

    const [btnName, setBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg mb-2">
            <div className="logo-container">
                <img src={LOGO_URL} alt="Logo" className="logo w-56" />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status - {onlineStatus ? "✅" : "❌"}
                    </li>
                    <li className="px-4">
                        <Link className="router-link" to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link className="router-link" to="/about">About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link className="router-link" to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link className="router-link" to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-4">Cart</li>
                    <button 
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