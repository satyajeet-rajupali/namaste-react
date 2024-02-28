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
            <img className="rounded-md object-fill" src={
                CDN_URL + cloudinaryImageId
            } alt="res-logo" />
            <h3 className="font-bold my-4 text-lg line-clamp-1">{name}</h3>
            <h4 className="line-clamp-1">{cuisines.join(", ")}</h4>
            <div className="grid grid-cols-5 my-4 c">
                <h4 className="col-span-2 text-center">{costForTwo}</h4>
                <h4 className="col-span-1 text-center pl-3">{avgRating}⭐</h4>
                <h4 className="col-span-2 text-center">{deliveryTime} mins</h4>
            </div>
        </div>
    );
};

export const withPromotedLabel = (RestaurantCard) => {

    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white p-2 m-2 rounded-lg">
                    Promoted
                </label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};

export default RestaurantCard;