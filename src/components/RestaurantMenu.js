import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {

    const { resId } = useParams();
    const { resInfo, menuInfo } = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo;

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