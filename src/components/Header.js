import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {

    const [btnName, setBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);

    // Subscribing to the store using a Selector
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    return (
        <div className="flex justify-between shadow-lg mb-2">
            <div className="logo-container flex items-center justify-center px-2">
                <img src={LOGO_URL} alt="Logo" className="logo w-56" />
            </div>
            <div className="flex shrink items-center">
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
                    <li className="px-4 font-bold">
                        <Link to="/cart">Cart-({cartItems.length} items)</Link>
                        </li>
                    <button
                        onClick={
                            () => {
                                btnName === "Login" ?
                                    setBtnName("Logout") : setBtnName("Login");
                            }
                        }
                    >{btnName}</button>
                    <li className="px-4">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;