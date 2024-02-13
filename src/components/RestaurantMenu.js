import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY, MENU_API_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [menuInfo, setMenuInfo] = useState([]);

    const { resId } = useParams();

    useEffect(() => {
        fetchMenu();
    }, [])

    const fetchMenu = async () => {

        const data = await fetch(MENU_API_URL + resId);

        const json = await data.json();

        const restaurantData = json?.data?.cards?.map(x => x.card)?.
            find(x => x && x.card['@type'] === RESTAURANT_TYPE_KEY)?.card?.info || null;

        const menuItemsData = json?.data?.cards.find(x => x.groupedCard)?.
            groupedCard?.cardGroupMap?.REGULAR?.
            cards?.map(x => x.card?.card)?.
            filter(x => x['@type'] == MENU_ITEM_TYPE_KEY)?.
            map(x => x.itemCards).flat().map(x => x.card?.info) || [];

        const uniqueMenuItems = [];
        menuItemsData.forEach((item) => {
            if (!uniqueMenuItems.find(x => x.id === item.id)) {
                uniqueMenuItems.push(item);
            }
        })

        setResInfo(restaurantData);
        setMenuInfo(uniqueMenuItems);
        // console.log(restaurantData);
        // console.log(json);

        console.log(uniqueMenuItems);
    }

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo;
    // const

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines?.join(", ")} - {costForTwoMessage}</p>
            <h2>Menu</h2>
            <ul>
                {menuInfo.map((item) => <li key={item?.id}>{item?.name} - 	&#8377;{item?.price / 100 || item?.defaultPrice / 100}</li>)}
            </ul>
        </div>
    );
};

export default RestaurantMenu;