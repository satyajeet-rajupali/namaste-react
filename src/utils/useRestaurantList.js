import { useEffect, useState } from "react";
import { swiggy_api_URL } from "../utils/constants";

const useRestaurantList = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {
            const response = await fetch(swiggy_api_URL);
            const json = await response.json();

            async function checkJsonData(jsonData) {
                for (let i = 0; i < jsonData?.data?.cards.length; i++) {

                    let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

                    if (checkData !== undefined) {
                        return checkData;
                    }
                }
            }

            const resData = await checkJsonData(json);

            setListOfRestaurants(resData);
            setFilteredListOfRestaurants(resData);
        } catch (error) {
            console.log(error);
        }
    };

    return { listOfRestaurants, filteredListOfRestaurants, setListOfRestaurants, setFilteredListOfRestaurants };
}

export default useRestaurantList;