import "./searchItem.css";
import Search from "../../data/search.json";

const SearchItem = () => {
  const SearchI = Search;

  return (
    <div>
      {SearchI.map((si, index) => (
        <div className="searchItem" key={index}>
          <img src={si.image_url} alt="" className="siImg" />
          <div className="siDesc">
            <h1 className="siTitle">{si.name}</h1>
            <span className="siDistance">{si.distance} from center</span>
            <span className="siTag">{si.tag}</span>
            <span className="siSubtitle">{si.description}</span>
            <span className="siFeatures">{si.type}</span>
            {si.free_cancel && (
              <span className="siCancelOp">Free cancellation</span>
            )}
            {si.free_cancel && (
              <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this great price today!
              </span>
            )}
          </div>
          <div className="siDetails">
            <div className="siRating">
              <span>{si.rate_text}</span>
              <button>{si.rate}</button>
            </div>
            <div className="siDetailTexts">
              <span className="siPrice">${si.price}</span>
              <span className="siTaxOp">Includes taxes and fees</span>
              <button className="siCheckButton">See availability</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchItem;
