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
            <div className="flex bg-white">
                <div className="m-4 p-4">
                    <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }} />
                    <button className="px-4 py-2 m-4 bg-green-100 rounded-lg" onClick={() => {
                        const filteredList = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setFilteredListOfRestaurants(filteredList);
                    }}>Search</button>
                </div>
                <div className="m-4 p-4 flex items-center">
                    <button className="px-4 py-2 m-4 bg-gray-100 rounded-lg" onClick={() => {
                        const filteredList = filteredListOfRestaurants.filter((res) => res.info.avgRating > 4);
                        setFilteredListOfRestaurants(filteredList);
                    }}>Top Rated Restaurant</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center bg-red-300">
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-white">
                    {filteredListOfRestaurants.map(restaurant => (
                        <Link className="router-link" key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Body;