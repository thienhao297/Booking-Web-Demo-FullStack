import "./featured.css";
import city from "../../data/city.json";
const Featured = () => {
  const cityItem = city;
  return (
    <div className="featured">
      {cityItem.map((city, index) => (
        <div className="featuredItem" key={index}>
          <img src={city.image} alt="" className="featuredImg" />
          <div className="featuredTitles">
            <h1>{city.name}</h1>
            <h2>{city.subText}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
