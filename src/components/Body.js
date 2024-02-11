import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { swiggy_api_URL } from "../utils/constants";
import Shimmer from "./Shimmer";


const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {
            const response = await fetch(swiggy_api_URL);
            const json = await response.json();

            // initialize checkJsonData() function to check Swiggy Restaurant data
            async function checkJsonData(jsonData) {
                for (let i = 0; i < jsonData?.data?.cards.length; i++) {

                    // initialize checkData for Swiggy Restaurant data
                    let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

                    // if checkData is not undefined then return it
                    if (checkData !== undefined) {
                        return checkData;
                    }
                }
            }

            // call the checkJsonData() function which return Swiggy Restaurant data
            const resData = await checkJsonData(json);

            console.log(resData);

            // update the state variable restaurants with Swiggy API data
            setListOfRestaurants(resData);
            setFilteredListOfRestaurants(resData);
        } catch (error) {
            console.log(error);
        }
    };

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
                    <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Body;