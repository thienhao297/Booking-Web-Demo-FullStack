import "./featuredProperties.css";
import hotelList from "../../data/hotel_list.json";

const FeaturedProperties = () => {
  const listHotel = hotelList;

  return (
    <div className="fp">
      {listHotel.map((hotel, index) => (
        <div className="fpItem" key={index}>
          <img src={hotel.image_url} alt="" className="fpImg" />
          <span className="fpName">{hotel.name}</span>
          <span className="fpCity">{hotel.city}</span>
          <span className="fpPrice">Starting from ${hotel.price}</span>
          <div className="fpRating">
            <button>{hotel.rate}</button>
            <span>{hotel.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
