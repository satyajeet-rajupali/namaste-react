import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurntCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

    const { resId } = useParams();
    const { resInfo, menuInfo } = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo;

    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines?.join(", ")} - {costForTwoMessage}
            </p>
            {menuInfo.map((item) => (<RestaurntCategory key={item.title} data={item} />))}
        </div>
    );
};

export default RestaurantMenu;