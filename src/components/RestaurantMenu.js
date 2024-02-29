import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurntCategory from "./RestaurantCategory";
import { CDN_URL } from "../utils/constants";
import { useState } from "react";

const RestaurantMenu = () => {

    const [showIndex, setShowIndex] = useState(0);
    const { resId } = useParams();
    const { resInfo, menuInfo } = useRestaurantMenu(resId);

    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage, cloudinaryImageId } = resInfo;

    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <div className="flex justify-center items-center">
                <img src={CDN_URL + cloudinaryImageId} alt="" className="mb-6 w-64" />
            </div>
            <p className="font-bold text-lg">
                {cuisines?.join(", ")} - {costForTwoMessage}
            </p>
            {menuInfo.map((item, index) => (
                <RestaurntCategory
                    key={item.title}
                    data={item}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={() => setShowIndex(index)}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;