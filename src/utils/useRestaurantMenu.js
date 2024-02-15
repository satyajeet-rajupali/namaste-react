import { useState, useEffect } from "react";
import { RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY, MENU_API_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    
    const [resInfo, setResInfo] = useState(null);
    const [menuInfo, setMenuInfo] = useState([]);

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

    }
    return { resInfo, menuInfo };
}

export default useRestaurantMenu;