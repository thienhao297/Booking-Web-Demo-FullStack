import "./propertyList.css";
import typeL from "../../data/type.json";

const PropertyList = () => {
  const typeP = typeL;
  return (
    <div className="pList">
      {typeP.map((type, index) => (
        <div className="pListItem" key={index}>
          <img src={type.image} alt="" className="pListImg" />
          <div className="pListTitles">
            <h1>{type.name}</h1>
            <h2>{type.count} hotels</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
