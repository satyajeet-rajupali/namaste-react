import { useState, useEffect } from "react";
import { RESTAURANT_TYPE_KEY, MENU_ITEM_TYPE_KEY, MENU_NESTED_ITEM_TYPE_KEY, MENU_API_URL } from "../utils/constants";

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

        const categories = json?.data?.cards.find(x => x.groupedCard)?.
            groupedCard?.cardGroupMap?.REGULAR?.
            cards?.map(x => x.card?.card)?.
            filter((x) => (x['@type'] === MENU_ITEM_TYPE_KEY || x['@type'] === MENU_NESTED_ITEM_TYPE_KEY));

        const finalCategories = categories.map((item) => {
            if (item['@type'] === MENU_ITEM_TYPE_KEY) {
                return item;
            }
            else {
                return item?.categories?.flat();
            }
        }).flat();

        setResInfo(restaurantData);
        setMenuInfo(finalCategories);
    }
    return { resInfo, menuInfo };
}

export default useRestaurantMenu;