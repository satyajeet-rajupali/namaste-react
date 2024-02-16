import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {

    const { 
        name, 
        cuisines, 
        costForTwo, 
        avgRating, 
        cloudinaryImageId,
        sla 
    } = resData?.info;
    const deliveryTime = sla.deliveryTime;

    return (
        <div className="m-2 p-2 w-[250px] rounded-lg bg-white shadow-xl">
            <img className="rounded-md" src={
                CDN_URL + cloudinaryImageId
            } alt="res-logo" />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{costForTwo}</h4>
            <h4>{avgRating}</h4>
            <h4>{deliveryTime}  minutes</h4>
        </div>
    );
}

export default RestaurantCard;