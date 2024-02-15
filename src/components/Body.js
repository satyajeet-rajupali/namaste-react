import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantList from "../utils/useRestaurantList";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    const [searchText, setSearchText] = useState("");
    const { listOfRestaurants, filteredListOfRestaurants, setFilteredListOfRestaurants } = useRestaurantList();
    const onlineStatus = useOnlineStatus();


    if (onlineStatus === false)
        return (
            <h1>Seems like your internet has left you like your luck</h1>
        );

    // Conditional Rendering
    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }} />
                    <button className="search-btn" onClick={() => {
                        const filteredList = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredListOfRestaurants(filteredList);
                    }}>Search</button>
                </div>
                <button className="filter-btn" onClick={() => {
                    const filteredList = filteredListOfRestaurants.filter((res) => res.info.avgRating > 4);
                    setFilteredListOfRestaurants(filteredList);
                }}>Top Rated Restaurant</button>
            </div>

            <div className="res-container">
                {filteredListOfRestaurants.map(restaurant => (
                    <Link className="router-link" key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
                ))}
            </div>
        </div>
    );
};

export default Body;