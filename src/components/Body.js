import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useRestaurantList from "../utils/useRestaurantList";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    const [searchText, setSearchText] = useState("");
    const { listOfRestaurants, filteredListOfRestaurants, setFilteredListOfRestaurants } = useRestaurantList();
    const onlineStatus = useOnlineStatus();

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    console.log("Body Rendered", listOfRestaurants);

    if (onlineStatus === false)
        return (
            <h1>Seems like your internet has left you like your luck</h1>
        );

    // Conditional Rendering
    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="flex flex-wrap justify-center bg-gray-50 mb-8">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    <div className="flex col-span-3 md:col-span-3 lg:col-span-4">
                        <div className="my-2 ml-4 mr-1">
                            <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => {
                                setSearchText(e.target.value);
                            }} />
                            <button className="px-4 py-2 m-4 bg-green-100 rounded-lg" onClick={() => {
                                const filteredList = listOfRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                                setFilteredListOfRestaurants(filteredList);
                            }}>Search</button>
                        </div>
                        <div className="my-2 mx-1">
                            <button className="px-4 py-2 m-4 bg-red-100 rounded-lg" onClick={() => {
                                const filteredList = filteredListOfRestaurants.filter((res) => res.info.avgRating > 4);
                                setFilteredListOfRestaurants(filteredList);
                            }}>Top Rated Restaurant</button>
                        </div>
                    </div>
                    {filteredListOfRestaurants.map(restaurant => (
                        <Link className="router-link" key={restaurant?.info?.id} to={"/restaurants/" + restaurant?.info?.id}>
                            {restaurant?.info?.id % 2 === 0 ? <RestaurantCardPromoted resData={restaurant} /> : <RestaurantCard resData={restaurant} />}

                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Body;